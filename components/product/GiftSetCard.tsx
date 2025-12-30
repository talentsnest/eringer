'use client'

import { useRef, useState, useEffect, memo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { handleTrackedClick } from '@/lib/analytics'
import { useTranslation } from '@/lib/i18n/useTranslation'

const baseUrl = 'https://shop.eringerswitzerland.ch/fr'

interface ProductInfo {
  name: string
  description: string
  tags: readonly string[] | string[]
}

interface GiftSetCardProps {
  id: string
  name: string
  description: string
  price: number
  hoverVideo?: string // Vidéo 1
  videoAfterHover?: string // Vidéo 2
  badge?: string
  tags?: readonly string[] | string[]
  productUrl?: string
  productImages?: string[] // Images des produits contenus dans le coffret
  productInfos?: ProductInfo[] // Infos des produits (nom, description, tags) dans le même ordre que productImages
}

const GiftSetCard = memo(function GiftSetCard({
  id,
  name,
  description,
  price,
  hoverVideo,
  videoAfterHover,
  badge,
  tags = [],
  productUrl,
  productImages = [],
  productInfos = [],
}: GiftSetCardProps) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null)
  const [isVideo1Ready, setIsVideo1Ready] = useState(false)
  const [isVideo2Ready, setIsVideo2Ready] = useState(false)
  const [video1Ended, setVideo1Ended] = useState(false)
  const [video2Ended, setVideo2Ended] = useState(false)
  const [isPlayingVideo1, setIsPlayingVideo1] = useState(false)
  const [isPlayingVideo2, setIsPlayingVideo2] = useState(false)
  const [video1Visible, setVideo1Visible] = useState(true) // Par défaut vidéo 1 visible
  const [video2Visible, setVideo2Visible] = useState(false) // Par défaut vidéo 2 invisible
  const [video2ReadyToShow, setVideo2ReadyToShow] = useState(false) // Vidéo 2 prête à être affichée
  const [video1ReadyToShow, setVideo1ReadyToShow] = useState(true) // Vidéo 1 prête à être affichée
  const [isVisibleOnMobile, setIsVisibleOnMobile] = useState(false) // Carte visible sur mobile (300px après entrée)
  const [showCartButton, setShowCartButton] = useState(false) // Bouton cart visible (300px après entrée)
  const [productImagesMousePos, setProductImagesMousePos] = useState({ x: 0, y: 0 }) // Position souris relative aux images produits
  const video1Ref = useRef<HTMLVideoElement | null>(null)
  const video2Ref = useRef<HTMLVideoElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const productImagesContainerRef = useRef<HTMLDivElement | null>(null)
  const hasLaunchedVideo1Ref = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    
    // Utiliser requestAnimationFrame pour un rendu plus fluide
    requestAnimationFrame(() => {
      setMousePosition({ x, y })
    })
  }, [])

  // Gérer le mouvement de la souris sur le conteneur des images produits pour l'effet magnétique
  const handleProductImagesMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!productImagesContainerRef.current) return
    
    const rect = productImagesContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    requestAnimationFrame(() => {
      setProductImagesMousePos({ x, y })
    })
  }, [])

  // Calculer la position magnétique pour une image donnée
  const getMagneticPosition = useCallback((index: number) => {
    if (!productImagesContainerRef.current || productImagesMousePos.x === 0 && productImagesMousePos.y === 0) {
      return { x: 0, y: 0 }
    }
    
    const container = productImagesContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height
    
    // Calculer la largeur de chaque image (première 50% plus grande, dernière 30% plus grande)
    const baseWidth = 0.1875
    const imageWidths = [
      containerWidth * baseWidth * 1.5, // Première : 50% plus grande
      containerWidth * baseWidth,        // Milieu : taille normale
      containerWidth * baseWidth * 1.3, // Dernière : 30% plus grande
    ]
    const gap = 10 // gap-[10px]
    
    // Position du centre du conteneur
    const containerCenterX = containerWidth / 2
    const containerCenterY = containerHeight / 2
    
    // Calculer le centre de chaque image en tenant compte des différentes tailles
    // On calcule la position cumulative depuis le centre
    let cumulativeX = 0
    for (let i = 0; i < index; i++) {
      cumulativeX += imageWidths[i] + gap
    }
    // Le centre de l'image actuelle est à cumulativeX + largeur/2 depuis le début
    // On ajuste pour centrer par rapport au conteneur
    const imageCenterX = containerCenterX - (imageWidths[0] + gap + imageWidths[1] + gap + imageWidths[2]) / 2 + cumulativeX + imageWidths[index] / 2
    const imageCenterY = containerCenterY
    
    // Distance entre la souris et le centre de l'image
    const dx = productImagesMousePos.x - imageCenterX
    const dy = productImagesMousePos.y - imageCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Zone d'influence magnétique (en pixels)
    const magneticRadius = 120
    const maxDisplacement = 10 // Déplacement maximum en pixels (réduit de moitié)
    
    if (distance < magneticRadius && distance > 0) {
      // Force magnétique inversement proportionnelle à la distance (avec easing)
      const normalizedDistance = distance / magneticRadius
      const force = Math.pow(1 - normalizedDistance, 2) // Easing quadratique pour un effet plus doux
      const displacement = force * maxDisplacement
      
      return {
        x: (dx / distance) * displacement,
        y: (dy / distance) * displacement,
      }
    }
    
    return { x: 0, y: 0 }
  }, [productImagesMousePos])

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // S'assurer que la vidéo 1 ne loop pas, surtout sur mobile
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.loop = false
      // Écouter les événements de fin pour forcer la pause
      const handleEnd = () => {
        if (video1Ref.current) {
          video1Ref.current.pause()
          video1Ref.current.loop = false
        }
      }
      video1Ref.current.addEventListener('ended', handleEnd)
      return () => {
        if (video1Ref.current) {
          video1Ref.current.removeEventListener('ended', handleEnd)
        }
      }
    }
  }, [video1Ref.current])

  // Intersection Observer pour mobile : lancer vidéo 1 quand le haut atteint le milieu de l'écran, vidéo 2 à 300px avant la sortie
  useEffect(() => {
    if (!isMobile || !cardRef.current || !hoverVideo) return

    let video1Timeout: NodeJS.Timeout | null = null
    let video2Timeout: NodeJS.Timeout | null = null

    // Observer pour vidéo 1 : même logique que ProductCard (threshold: 0.5)
    const observerVideo1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLaunchedVideo1Ref.current) {
            // 50% de la carte est visible dans le viewport (comme ProductCard)
            hasLaunchedVideo1Ref.current = true
            setIsVisibleOnMobile(true)
            setShowCartButton(true)
            setIsHovered(true)
            
            if (video1Ref.current && !isPlayingVideo1 && !video1Ended) {
              if (!isVideo1Ready) {
                video1Ref.current.load()
              }
              video1Ref.current.currentTime = 0
              video1Ref.current.play().catch(() => {})
              setIsPlayingVideo1(true)
              setVideo1Visible(true)
              setVideo1Ended(false)
            }
          }
        })
      },
      {
        threshold: 0.5, // Même que ProductCard : lance quand 50% est visible
        rootMargin: '0px'
      }
    )

    // Observer pour vidéo 2 : DÉSACTIVÉ sur mobile - on garde seulement la vidéo 1 en pause à la fin
    // Pas de lancement de vidéo 2 sur mobile

    const currentCard = cardRef.current
    observerVideo1.observe(currentCard)
    // observerVideo2 n'est plus utilisé sur mobile

    return () => {
      if (currentCard) {
        observerVideo1.unobserve(currentCard)
        // observerVideo2 n'est plus utilisé sur mobile
      }
      if (video1Timeout) clearTimeout(video1Timeout)
      if (video2Timeout) clearTimeout(video2Timeout)
    }
  }, [isMobile, hoverVideo, videoAfterHover, isVideo1Ready, isVideo2Ready, isPlayingVideo1, isPlayingVideo2, video1Ended])

  // Précharger les vidéos complètement pour éviter les glitches
  useEffect(() => {
    if (hoverVideo && video1Ref.current) {
      video1Ref.current.load()
      // Précharger complètement la vidéo
      video1Ref.current.preload = 'auto'
    }
    if (videoAfterHover && video2Ref.current) {
      video2Ref.current.load()
      // Précharger complètement la vidéo
      video2Ref.current.preload = 'auto'
    }
  }, [hoverVideo, videoAfterHover])

  // Par défaut : vidéo 1 à zéro, pause (mais pas si video1Ended car elle est encore visible)
  useEffect(() => {
    if (video1Ref.current && isVideo1Ready && !isPlayingVideo1 && !isHovered && !video1Ended) {
      // Ne remettre à zéro que si la vidéo 1 n'est pas terminée
      // (si elle est terminée, on attend mouseLeave pour la remettre à zéro)
      video1Ref.current.currentTime = 0
      video1Ref.current.pause()
    }
  }, [isVideo1Ready, isPlayingVideo1, isHovered, video1Ended])

  // Précharger vidéo 2 en arrière-plan pendant que vidéo 1 joue
  useEffect(() => {
    if (isPlayingVideo1 && video2Ref.current && isVideo2Ready && !video2Visible) {
      // Préparer vidéo 2 en arrière-plan : la charger et la mettre à la première frame
      // On la garde invisible mais prête pour le switch instantané
      video2Ref.current.currentTime = 0
      video2Ref.current.pause()
      video2Ref.current.load()
      // Forcer le rendu de la première frame même si invisible
      requestAnimationFrame(() => {
        if (video2Ref.current) {
          video2Ref.current.offsetHeight // Force repaint
        }
      })
    }
  }, [isPlayingVideo1, isVideo2Ready, video2Visible])

  // Précharger vidéo 1 en arrière-plan pendant que vidéo 2 joue
  useEffect(() => {
    if (isPlayingVideo2 && video1Ref.current && isVideo1Ready && !video1Visible) {
      // Préparer vidéo 1 en arrière-plan : la charger et la mettre à la première frame
      video1Ref.current.currentTime = 0
      video1Ref.current.pause()
      video1Ref.current.load()
      // Forcer le rendu de la première frame même si invisible
      requestAnimationFrame(() => {
        if (video1Ref.current) {
          video1Ref.current.offsetHeight // Force repaint
        }
      })
    }
  }, [isPlayingVideo2, isVideo1Ready, video1Visible])

  // Gérer la fin de la vidéo 1 - pause (vidéo 2 est déjà préchargée en arrière-plan)
  const handleVideo1Ended = useCallback(() => {
    if (video1Ref.current) {
      // Forcer la pause et empêcher la boucle
      video1Ref.current.pause()
      video1Ref.current.loop = false
      setVideo1Ended(true)
      setIsPlayingVideo1(false)
      // La vidéo 2 est déjà préchargée par le useEffect pendant que vidéo 1 jouait
      // Ne PAS remettre vidéo 1 à zéro ici - on le fera dans handleMouseLeave après avoir caché
    }
  }, [])

  // Gérer la fin de la vidéo 2 - pause (on attendra le hover pour revenir à vidéo 1)
  const handleVideo2Ended = useCallback(() => {
    if (video2Ref.current) {
      video2Ref.current.pause()
      setVideo2Ended(true)
      setIsPlayingVideo2(false)
      // La vidéo 1 est déjà préchargée en arrière-plan, on attendra le hover pour switcher
    }
  }, [])

  // Réinitialiser quand on quitte le hover
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false)
      
      // Si vidéo 2 est déjà en train de jouer (même si pas terminée), ne rien faire (la laisser continuer jusqu'à la fin)
      if (isPlayingVideo2 && video2Ref.current) {
        // La vidéo 2 continue de jouer jusqu'à la fin, on ne fait rien
        return
      }
      
      // Si vidéo 2 est visible mais pas encore en train de jouer, la laisser aussi
      if (video2Visible && video2Ref.current) {
        // La vidéo 2 est visible, on la laisse continuer
        return
      }
      
      if (video1Ended && videoAfterHover && video2Ref.current && isVideo2Ready) {
        // Vidéo 1 terminée : remplacer par vidéo 2 qui commence
        // La vidéo 2 est déjà préchargée en arrière-plan
        
        // Étape 1 : S'assurer que vidéo 2 est à la première frame et prête
        if (video2Ref.current) {
          video2Ref.current.currentTime = 0
          video2Ref.current.pause()
        }
        
        // Étape 2 : CACHER vidéo 1 EN PREMIER pour éviter la superposition
        setVideo1Visible(false)
        setIsPlayingVideo1(false)
        
        // Étape 3 : Dans le frame suivant, rendre vidéo 2 visible (séparation claire)
        requestAnimationFrame(() => {
          setVideo2Visible(true)
          setIsPlayingVideo2(true)
          
          // Étape 4 : Lancer vidéo 2 dans le même frame
          requestAnimationFrame(() => {
            if (video2Ref.current) {
              video2Ref.current.play().catch(() => {})
            }
            // Remettre vidéo 1 à zéro maintenant qu'elle est cachée
            if (video1Ref.current) {
              video1Ref.current.currentTime = 0
            }
          })
        })
      } else if (isPlayingVideo1 && video1Ref.current) {
        // Hover arrêté avant la fin de vidéo 1 : remettre vidéo 1 à zéro
        video1Ref.current.pause()
        video1Ref.current.currentTime = 0
        setIsPlayingVideo1(false)
        setVideo1Ended(false)
      }
    }
  }, [isMobile, video1Ended, videoAfterHover, isVideo2Ready, isPlayingVideo1, isPlayingVideo2])

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-hover"
      onMouseEnter={() => {
        if (!isMobile && hoverVideo) {
          // Si vidéo 2 est en train de jouer (même si pas terminée), ne rien faire (la laisser continuer)
          if (isPlayingVideo2 || (video2Visible && !video2Ended)) {
            // La vidéo 2 continue de jouer jusqu'à la fin, on ne fait rien
            return
          }
          
          // Si vidéo 2 est terminée, revenir à vidéo 1 pour permettre de relancer le processus
          if (video2Ended && video1Ref.current && isVideo1Ready) {
            // CACHER vidéo 2 EN PREMIER pour éviter la superposition
            setVideo2Visible(false)
            setIsPlayingVideo2(false)
            setVideo2Ended(false)
            
            // Dans le frame suivant, rendre vidéo 1 visible et la lancer
            requestAnimationFrame(() => {
              setVideo1Visible(true)
              setIsPlayingVideo1(true)
              setVideo1Ended(false)
              setIsHovered(true)
              
              if (video1Ref.current) {
                video1Ref.current.currentTime = 0
                video1Ref.current.play().catch(() => {})
              }
            })
          }
          // Sinon, lancer vidéo 1 normalement si elle n'est pas déjà en cours
          else if (!isPlayingVideo1 && !video1Ended) {
            setIsHovered(true)
            setIsPlayingVideo1(true)
            setVideo1Ended(false)
            if (video1Ref.current) {
              if (!isVideo1Ready) {
                video1Ref.current.load()
              }
              video1Ref.current.currentTime = 0
              video1Ref.current.play().catch(() => {})
            }
          }
        }
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
    >
      {isMobile ? (
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-gray-50" style={{ aspectRatio: '1696/2307' }}>
          {/* Badge */}
          {badge && (
            <motion.div
              className="absolute top-4 left-4 z-10 px-4 py-2 bg-gold-500 text-white text-xs font-medium rounded-full"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              {badge}
            </motion.div>
          )}

          {/* Product Media with Parallax Effect */}
          <motion.div
            className="w-full h-full relative"
            animate={{
              scale: !isMobile && isHovered ? 1.05 : 1,
              x: !isMobile && isHovered ? -mousePosition.x * 2.093 : 0,
              y: !isMobile && isHovered ? -mousePosition.y * 2.093 : 0,
            }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
          >
            {/* Vidéo 1 - visible par défaut ou quand elle joue */}
            {hoverVideo && (
              <video
                ref={video1Ref}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  opacity: video1Visible ? 1 : 0,
                  display: video1Visible ? 'block' : 'none',
                  zIndex: video1Visible ? 10 : 0,
                  pointerEvents: video1Visible ? 'auto' : 'none',
                  transition: 'none',
                  willChange: 'opacity'
                }}
                muted
                playsInline
                preload="auto"
                loop={false}
                aria-label={`${name} video 1`}
                onLoadedData={() => {
                  setIsVideo1Ready(true)
                  if (video1Ref.current && !isPlayingVideo1) {
                    video1Ref.current.currentTime = 0
                    video1Ref.current.pause()
                  }
                }}
                onLoadedMetadata={() => {
                  if (video1Ref.current && !isPlayingVideo1) {
                    video1Ref.current.currentTime = 0
                  }
                }}
                onSeeked={() => {
                  // Quand la vidéo 1 est vraiment à la première frame
                  if (video1Ref.current && video1Ref.current.currentTime === 0) {
                    // Forcer un repaint pour s'assurer que la frame est rendue
                    video1Ref.current.offsetHeight
                    setVideo1ReadyToShow(true)
                  }
                }}
                onEnded={handleVideo1Ended}
                onError={() => {
                  setVideo1Ended(true)
                  setIsPlayingVideo1(false)
                }}
              >
                <source src={hoverVideo} type="video/mp4" />
              </video>
            )}

            {/* Vidéo 2 - invisible par défaut, visible seulement quand elle joue */}
            {videoAfterHover && (
              <video
                ref={video2Ref}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  opacity: video2Visible ? 1 : 0,
                  display: video2Visible ? 'block' : 'none',
                  zIndex: video2Visible ? 10 : 0,
                  pointerEvents: video2Visible ? 'auto' : 'none',
                  transition: 'none',
                  willChange: 'opacity'
                }}
                muted
                playsInline
                preload="auto"
                loop={false}
                aria-label={`${name} video 2`}
                onLoadedData={() => {
                  setIsVideo2Ready(true)
                  if (video2Ref.current && !isPlayingVideo2) {
                    video2Ref.current.currentTime = 0
                    video2Ref.current.pause()
                  }
                }}
                onLoadedMetadata={() => {
                  if (video2Ref.current && !isPlayingVideo2) {
                    video2Ref.current.currentTime = 0
                  }
                }}
                onSeeked={() => {
                  // Quand la vidéo 2 est vraiment à la première frame
                  if (video2Ref.current && video2Ref.current.currentTime === 0) {
                    // Forcer un repaint pour s'assurer que la frame est rendue
                    video2Ref.current.offsetHeight
                    setVideo2ReadyToShow(true)
                  }
                }}
                onEnded={handleVideo2Ended}
                onError={() => {
                  setVideo2Ended(true)
                  setIsPlayingVideo2(false)
                }}
              >
                <source src={videoAfterHover} type="video/mp4" />
              </video>
            )}
          </motion.div>

          </div>

          {/* Product Info sur mobile - Tout centré */}
          <div className="mt-4 flex flex-col items-center">
            {/* Images des produits contenus dans le coffret */}
            {productImages.length > 0 && (
              <div 
                ref={productImagesContainerRef}
                className="flex items-end justify-center gap-[10px] mb-4 -mt-[100px] md:-mt-[80px] w-full relative z-20"
                onMouseMove={handleProductImagesMouseMove}
                onMouseLeave={() => setProductImagesMousePos({ x: 0, y: 0 })}
              >
                {productImages.map((image, index) => {
                  const magneticPos = getMagneticPosition(index)
                  // Calculer la largeur : première (80% plus grande), dernière (30% plus grande)
                  const baseWidth = 18.75
                  const width = index === 0 ? baseWidth * 1.8 : index === 2 ? baseWidth * 1.3 : baseWidth
                  
                  return (
                    <motion.div
                      key={index}
                      className={`aspect-square flex items-center justify-center overflow-hidden relative z-20 cursor-pointer`}
                      style={{ width: `${width}%` }}
                      onMouseEnter={() => setHoveredProductIndex(index)}
                      onMouseLeave={() => setHoveredProductIndex(null)}
                      onTouchStart={() => setHoveredProductIndex(index)}
                      onTouchEnd={() => setHoveredProductIndex(null)}
                      animate={{
                        scale: hoveredProductIndex === index ? 1.15 : 1,
                        opacity: hoveredProductIndex === index ? 1 : 0.8,
                        x: !isMobile ? magneticPos.x : 0,
                        y: !isMobile ? magneticPos.y : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={image}
                        alt={productInfos[index]?.name || `Product ${index + 1}`}
                        fill
                        className="w-full h-full object-contain rounded-none relative z-20"
                        sizes="(max-width: 768px) 25vw, 18.75%"
                      />
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Fixed height container to prevent layout shift */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait">
                {hoveredProductIndex !== null && hoveredProductIndex < productInfos.length && productInfos[hoveredProductIndex] ? (
                  <motion.div
                    key={`product-${hoveredProductIndex}`}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 min-h-[28px]">
                      {productInfos[hoveredProductIndex]?.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[40px]">
                      {productInfos[hoveredProductIndex]?.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[28px]">
                      {productInfos[hoveredProductIndex]?.tags && productInfos[hoveredProductIndex].tags.length > 0 && (
                        productInfos[hoveredProductIndex].tags.slice(0, 3).map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gold-700 text-white"
                          >
                            {tag}
                          </span>
                        ))
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="gift-set"
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 min-h-[28px]">
                      {name} <span className="text-beige-600">{price}.-</span>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[40px]">{description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[28px]">
                      {tags.length > 0 && (
                        tags.slice(0, 6).map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gold-700 text-white"
                          >
                            {tag}
                          </span>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <a
          href={productUrl || `${baseUrl}/collections/all`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleTrackedClick(e, productUrl || `${baseUrl}/collections/all`, name, 'product')}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gray-50" style={{ aspectRatio: '1696/2307' }}>
            {/* Badge */}
            {badge && (
              <motion.div
                className="absolute top-4 left-4 z-10 px-4 py-2 bg-gold-500 text-white text-xs font-medium rounded-full"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {badge}
              </motion.div>
            )}

            {/* Product Media with Parallax Effect */}
            <motion.div
              className="w-full h-full relative"
              animate={{
                scale: !isMobile && isHovered ? 1.05 : 1,
                x: !isMobile && isHovered ? -mousePosition.x * 2.093 : 0,
                y: !isMobile && isHovered ? -mousePosition.y * 2.093 : 0,
              }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            >
              {/* Vidéo 1 - visible par défaut ou quand elle joue */}
              {hoverVideo && (
                <video
                  ref={video1Ref}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    opacity: video1Visible ? 1 : 0,
                    display: video1Visible ? 'block' : 'none',
                    zIndex: video1Visible ? 10 : 0,
                    pointerEvents: video1Visible ? 'auto' : 'none',
                    transition: 'none',
                    willChange: 'opacity'
                  }}
                  muted
                  playsInline
                  preload="auto"
                  aria-label={`${name} video 1`}
                  onLoadedData={() => {
                    setIsVideo1Ready(true)
                    if (video1Ref.current && !isPlayingVideo1) {
                      video1Ref.current.currentTime = 0
                      video1Ref.current.pause()
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (video1Ref.current && !isPlayingVideo1) {
                      video1Ref.current.currentTime = 0
                    }
                  }}
                  onSeeked={() => {
                    // Quand la vidéo 1 est vraiment à la première frame
                    if (video1Ref.current && video1Ref.current.currentTime === 0) {
                      // Forcer un repaint pour s'assurer que la frame est rendue
                      video1Ref.current.offsetHeight
                      setVideo1ReadyToShow(true)
                    }
                  }}
                  onEnded={handleVideo1Ended}
                  onError={() => {
                    setVideo1Ended(true)
                    setIsPlayingVideo1(false)
                  }}
                >
                  <source src={hoverVideo} type="video/mp4" />
                </video>
              )}

              {/* Vidéo 2 - invisible par défaut, visible seulement quand elle joue */}
              {videoAfterHover && (
                <video
                  ref={video2Ref}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    opacity: video2Visible ? 1 : 0,
                    display: video2Visible ? 'block' : 'none',
                    zIndex: video2Visible ? 10 : 0,
                    pointerEvents: video2Visible ? 'auto' : 'none',
                    transition: 'none',
                    willChange: 'opacity'
                  }}
                  muted
                  playsInline
                  preload="auto"
                  aria-label={`${name} video 2`}
                  onLoadedData={() => {
                    setIsVideo2Ready(true)
                    if (video2Ref.current && !isPlayingVideo2) {
                      video2Ref.current.currentTime = 0
                      video2Ref.current.pause()
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (video2Ref.current && !isPlayingVideo2) {
                      video2Ref.current.currentTime = 0
                    }
                  }}
                  onSeeked={() => {
                    // Quand la vidéo 2 est vraiment à la première frame
                    if (video2Ref.current && video2Ref.current.currentTime === 0) {
                      // Forcer un repaint pour s'assurer que la frame est rendue
                      video2Ref.current.offsetHeight
                      setVideo2ReadyToShow(true)
                    }
                  }}
                  onEnded={handleVideo2Ended}
                  onError={() => {
                    setVideo2Ended(true)
                    setIsPlayingVideo2(false)
                  }}
                >
                  <source src={videoAfterHover} type="video/mp4" />
                </video>
              )}
            </motion.div>
          </div>

          {/* Product Info (comme ProductCard) - Tout centré */}
          <div className="mt-4 flex flex-col items-center">
            {/* Images des produits contenus dans le coffret */}
            {productImages.length > 0 && (
              <div 
                ref={productImagesContainerRef}
                className="flex items-end justify-center gap-[10px] mb-4 -mt-[100px] md:-mt-[80px] w-full relative z-20"
                onMouseMove={handleProductImagesMouseMove}
                onMouseLeave={() => setProductImagesMousePos({ x: 0, y: 0 })}
              >
                {productImages.map((image, index) => {
                  const magneticPos = getMagneticPosition(index)
                  // Calculer la largeur : première (80% plus grande), dernière (30% plus grande)
                  const baseWidth = 18.75
                  const width = index === 0 ? baseWidth * 1.8 : index === 2 ? baseWidth * 1.3 : baseWidth
                  
                  return (
                    <motion.div
                      key={index}
                      className={`aspect-square flex items-center justify-center overflow-hidden relative z-20 cursor-pointer`}
                      style={{ width: `${width}%` }}
                      onMouseEnter={() => setHoveredProductIndex(index)}
                      onMouseLeave={() => setHoveredProductIndex(null)}
                      animate={{
                        scale: hoveredProductIndex === index ? 1.15 : 1,
                        opacity: hoveredProductIndex === index ? 1 : 0.8,
                        x: !isMobile ? magneticPos.x : 0,
                        y: !isMobile ? magneticPos.y : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={image}
                        alt={productInfos[index]?.name || `Product ${index + 1}`}
                        fill
                        className="w-full h-full object-contain rounded-none relative z-20"
                        sizes="(max-width: 768px) 25vw, 18.75%"
                      />
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Fixed height container to prevent layout shift */}
            <div className="min-h-[180px]">
              {/* Titre + Prix */}
              <div className="text-center mb-1 min-h-[28px]">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gold-600 transition-colors inline">
                  {hoveredProductIndex !== null && productInfos[hoveredProductIndex]
                    ? productInfos[hoveredProductIndex].name
                    : name}
                </h3>
                {hoveredProductIndex === null && (
                  <span className="text-lg font-semibold text-gold-600 ml-1">
                    {' '}{price}.-
                  </span>
                )}
              </div>

              {/* Description avec fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredProductIndex !== null ? `desc-${hoveredProductIndex}` : 'desc-default'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-600 line-clamp-2 mb-3 text-center min-h-[2.5rem]"
                >
                  {hoveredProductIndex !== null && productInfos[hoveredProductIndex]
                    ? productInfos[hoveredProductIndex].description
                    : description}
                </motion.div>
              </AnimatePresence>

              {/* Tags avec fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredProductIndex !== null ? `tags-${hoveredProductIndex}` : 'tags-default'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2 justify-center min-h-[1.5rem]"
                >
                  {(hoveredProductIndex !== null && productInfos[hoveredProductIndex]
                    ? productInfos[hoveredProductIndex].tags
                    : tags).slice(0, 6).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gold-700 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </a>
      )}
    </motion.div>
  )
})

export default GiftSetCard

