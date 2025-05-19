"use client"
import axios from "axios"
import { api } from "../hooks/api"
import React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import "./hallDesFins.css"
import ChatBotTheEnd from "../finalBot/finalBoth"
import {
  BookOpen,
  PenLine,
  Sparkles,
  Heart,
  MessageCircle,
  Award,
  Bookmark,
  Search,
  ChevronDown,
  Star,
  Moon,
  Sun,
  Eye,
  BrainCircuit,
} from "lucide-react"

const Ecrire = React.lazy(() => import("../ecrireMaFin/ecrireMaFin"))
const ApresFin = React.lazy(() => import("../apresFin/apresFin"))
const DernierFin = React.lazy(() => import("../DernierFin/DernierFin"))

const HallDesFins = () => {
  // États
  const [language, setLanguage] = useState("fr")
  const [darkMode, setDarkMode] = useState(false)
  const [pages, setPages] = useState([])
  const [filteredPages, setFilteredPages] = useState([])
  const [emotionFilter, setEmotionFilter] = useState("tous")
  const [typeFilter, setTypeFilter] = useState("tous")
  const [sortBy, setSortBy] = useState("recent")
  const [hoveredCard, setHoveredCard] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reactions, setReactions] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [testMenuVisible, setTestMenuVisible] = useState(false)

  console.log(testMenuVisible)
  const [engravingEffects, setEngravingEffects] = useState([])
  const [testOptions, setTestOptions] = useState({
    emotion: "humour",
    type: "démission",
    style: "standard",
    font: "serif",
  })
  const [activeSection, setActiveSection] = useState("hall")
  const [quizResult, setQuizResult] = useState(null)
  const [publications, setPublications] = useState([])

  // Références
  const cardsRef = useRef([])
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const containerRef = useRef(null)
  const starsRef = useRef(null)
  const portalRef = useRef(null)
  const engravingRef = useRef(null)

  // Chargement des données
  useEffect(() => {
    axios.get(`${api}/endpage/`)
      .then(response => {
        setFilteredPages(response.data)
        setPages(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des publications:', error)
      })

    axios.get(`${api}/top-total-reactions/`)
      .then(response => {
        setPublications(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des publications:', error)
      })
  }, [])

  // Animation initiale
  useEffect(() => {
    setTimeout(() => {
      setPortalOpen(true)
      setTimeout(() => {
        setAnimationComplete(true)
      }, 2000)
    }, 500)
  }, [])

  // Effet de curseur personnalisé
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const container = containerRef.current

    if (!cursor || !cursorDot || !container) return

    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`

      setTimeout(() => {
        cursorDot.style.left = `${clientX}px`
        cursorDot.style.top = `${clientY}px`
      }, 50)
    }

    const onMouseEnter = () => {
      cursor.style.opacity = "1"
      cursorDot.style.opacity = "1"
    }

    const onMouseLeave = () => {
      cursor.style.opacity = "0"
      cursorDot.style.opacity = "0"
    }

    const handleLinkHover = () => {
      cursor.classList.add("cursor-hover")
    }

    const handleLinkLeave = () => {
      cursor.classList.remove("cursor-hover")
    }

    container.addEventListener("mousemove", onMouseMove)
    container.addEventListener("mouseenter", onMouseEnter)
    container.addEventListener("mouseleave", onMouseLeave)

    const interactiveElements = container.querySelectorAll("a, button, .page-card, .card-reaction, select")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      container.removeEventListener("mousemove", onMouseMove)
      container.removeEventListener("mouseenter", onMouseEnter)
      container.removeEventListener("mouseleave", onMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [filteredPages, activeSection])

  // Effet de parallaxe pour les étoiles
  useEffect(() => {
    const stars = starsRef.current
    if (!stars) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      stars.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation des cartes au défilement
  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible) {
          card.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [filteredPages])

  // Effet du mode sombre
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode"
  }, [darkMode])

  // Effet de gravure au mouvement de la souris
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      if (Math.random() > 0.95 && engravingEffects.length < 5) {
        const newEffect = {
          id: Date.now(),
          x: clientX,
          y: clientY,
          size: Math.random() * 50 + 50,
        }
        setEngravingEffects((prev) => [...prev, newEffect])
        setTimeout(() => {
          setEngravingEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
        }, 2000)
      }
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [engravingEffects])

  // Écouter les changements d'URL pour la navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSection(hash)
      }
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  // Gérer les réactions
  const handleReaction = (pageId, reactionType, e) => {
    e.stopPropagation()
    setReactions((prev) => {
      const pageReactions = prev[pageId] || {}
      return {
        ...prev,
        [pageId]: {
          ...pageReactions,
          [reactionType]: !pageReactions[reactionType],
        },
      }
    })
  }

  const getReactionCount = (pageId, reactionType) => {
    const baseCounts = {
      feel: 12,
      applaud: 24,
      laugh: 18,
      support: 15,
    }
    const userReacted = reactions[pageId]?.[reactionType] ? 1 : 0
    return baseCounts[reactionType] + userReacted
  }

  // Basculer la barre de recherche
  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 100)
    }
  }

  // Ouvrir le détail de la page dans le portail
  const openPageDetail = (page) => {
    setSelectedPage(page)
    setPortalOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Fermer le portail
  const closePortal = () => {
    setPortalOpen(false)

    // Réactiver le défilement
    document.body.style.overflow = "auto"
  }
  // Traductions
  const translations = {
    fr: {
      pageOfDay: "Page du jour",
      filters: "Filtres",
      emotions: "Émotions",
      types: "Types",
      all: "Tous",
      colère: "anger",
      triste: "sad",
      joie: "happy",
      surpris: "Surpris",
      humor: "Humour",
      sad: "Triste",
      rage: "Colère",
      nostalgia: "Nostalgie",
      resignation: "Démission",
      breakup: "Rupture",
      departure: "Départ",
      sortBy: "Trier par",
      recent: "Récent",
      popular: "Populaire",
      viewPage: "Voir la page",
      menus: {
        hall: "Hall",
        write: "Écrire",
        drama: "Dr Drama",
        myEnds: "Profil",
      },
      footer: "Tous droits réservés",
      galleryTitle: "Le Hall des Fins",
      gallerySubtitle: "Explorer les pages créées",
      galleryDescription: "Galerie immersive de toutes les fins partagées",
      search: "Rechercher...",
      reactions: {
        feel: "Je ressens",
        applaud: "J'applaudis",
        laugh: "J'ai ri",
        support: "Je t'envoie de la force",
      },
      readMore: "Lire",
      writeYourEnd: "Écrire ma fin",
      afterTheEnd: "Après la fin",
      closePortal: "Fermer",
      testTitle: "Êtes-vous prêt à écrire ma fin ?",
      testSubtitle: "Découvrez votre aptitude à la fin",
      testDescription: "Répondez à quelques questions pour évaluer votre capacité à clore un chapitre",
    },
    mg: {
      pageOfDay: "Pejy androany",
      filters: "Sivana",
      emotions: "Fihetseham-po",
      types: "Karazana",
      all: "Rehetra",
      surpris: "taitra",
      sad: "malahelo",
      rage: "Hatezerana",
      nostalgia: "Hanina",
      resignation: "Fialana",
      breakup: "Fisarahana",
      departure: "Fialantsasatra",
      sortBy: "Alamino",
      recent: "Vaovao",
      popular: "Malaza",
      viewPage: "Hijery",
      menus: {
        hall: "Trano",
        write: "Soratra",
        drama: "Dr Drama",
        myEnds: "Profil",
      },
      footer: "Zo rehetra voatokana",
      galleryTitle: "Ny Tranon'ny Fiafarana",
      gallerySubtitle: "Jereo ny pejy noforonina",
      galleryDescription: "Galeria mampiseho ny fiafaran'ny tantara rehetra",
      search: "Hikaroka...",
      reactions: {
        feel: "Tsapako",
        applaud: "Mitsiky aho",
        laugh: "Nihomehy aho",
        support: "Manome hery anao aho",
      },
      readMore: "Vakio",
      writeYourEnd: "Sorato ny fiafaran'ny tantara",
      afterTheEnd: "Aorian'ny fiafaran'ny tantara",
      closePortal: "Hidio",
      testTitle: "Vonona ny hanoratra ny fiafaranao ve ianao?",
      testSubtitle: "Fantaro ny fahaizanao mamarana",
      testDescription: "Valio ireo fanontaniana vitsivitsy mba hanombantombanana ny fahaizanao mamarana toko iray",
    },
  }

  const t = translations[language]

  // Filtrage et tri des pages
  useEffect(() => {
    let result = [...pages]

    // Appliquer le filtre d'émotion
    if (emotionFilter !== "tous") {
      result = result.filter((page) => page.emotion?.toLowerCase() === emotionFilter.toLowerCase())
    }

    // Appliquer le filtre de type
    if (typeFilter !== "tous") {
      result = result.filter((page) => page.type?.toLowerCase() === typeFilter.toLowerCase())
    }

    // Appliquer la recherche
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (page) =>
          page.title?.toLowerCase().includes(query) || 
          page.author?.toLowerCase().includes(query)
      )
    }

    // Appliquer le tri
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === "popular") {
      result = publications
    }

    setFilteredPages(result)
  }, [emotionFilter, typeFilter, sortBy, pages, searchQuery, publications])

  // Obtenir le libellé d'émotion
  const getEmotionLabel = (emotion) => {
    switch (emotion) {
      case "colère":
        return t.anger
      case "triste":
        return t.sad
      case "joie":
        return t.happy
      case "surpris":
        return t.surpris
      default:
        return emotion
    }
  }

  const getTypeLabel = (type) => {
    const normalizedType = type?.toLowerCase() || ''
    const typeMap = {
      démission: t.resignation,
      rupture: t.breakup,
      départ: t.departure,
    }
    return typeMap[normalizedType] || (type ? type.charAt(0).toUpperCase() + type.slice(1) : '')
  }

  // Rendu conditionnel en fonction de la section active
  const renderContent = () => {
    switch (activeSection) {
      case "hall":
        return (
          <>
            <div className="hero-section">
              <div className="hero-decoration">
                <div className="hero-line"></div>
                <Star className="hero-icon" />
                <div className="hero-line"></div>
              </div>
              <h1 className="gallery-title">{t.galleryTitle}</h1>
              <p className="gallery-subtitle">{t.gallerySubtitle}</p>
            </div>

            <section className="filters-section">
              <div className="filters-container">
                <div className="filter-group">
                  <label>{t.emotions}</label>
                  <div className="select-wrapper">
                    <select
                      value={emotionFilter}
                      onChange={(e) => setEmotionFilter(e.target.value)}
                      aria-label="Filter by emotion"
                    >
                      <option value="tous">{t.all}</option>
                      <option value="rage">{t.rage}</option>
                      <option value="tristesse">{t.sadness}</option>
                      <option value="humour">{t.humor}</option>
                      <option value="nostalgie">{t.nostalgia}</option>
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="filter-group">
                  <label>{t.types}</label>
                  <div className="select-wrapper">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      aria-label="Filter by type"
                    >
                      <option value="tous">{t.all}</option>
                      <option value="démission">{t.resignation}</option>
                      <option value="rupture">{t.breakup}</option>
                      <option value="départ">{t.departure}</option>
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="filter-group">
                  <label>{t.sortBy}</label>
                  <div className="select-wrapper">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort by"
                    >
                      <option value="recent">{t.recent}</option>
                      <option value="popular">{t.popular}</option>
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                </div>
              </div>
            </section>

            <section className="gallery-section">
              <div className="pages-grid">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page, index) => (
                    <div
                      key={page.id}
                      className="page-card"
                      ref={(el) => (cardsRef.current[index] = el)}
                      onMouseEnter={() => setHoveredCard(page.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => openPageDetail(page)}
                    >
                      <div className="card-image">
                        <img
                          src={page.images[0].image_url}
                          alt={page.title}
                          className={hoveredCard === page.id ? "zoom-effect" : ""}
                          crossOrigin="anonymous"
                        />
                        <div className="overlay"></div>
                        <div className="card-date">
                          {page.create_at}
                        </div>
                        <div className="card-bookmark">
                          <Bookmark className="bookmark-icon" />
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="card-meta">
                          <span className={`badge small emotion ${page.expression}`}>
                            {getEmotionLabel(page.expression)}
                          </span>
                          <span className="badge small type">{getTypeLabel(page.type)}</span>
                        </div>
                        <h3>{page.title}</h3>
                        <p className="author">Par {page.user.name}</p>

                        <div className="card-reactions">
                          <div
                            className={`card-reaction ${reactions[page.id]?.feel ? "active" : ""}`}
                            onClick={(e) => handleReaction(page.id, "feel", e)}
                            title="Sourires"
                          >
                            <MessageCircle className="reaction-icon" />
                            <span className="reaction-count">{page.reactions?.sourires || 0}</span>
                          </div>
                          <div
                            className={`card-reaction ${reactions[page.id]?.applaud ? "active" : ""}`}
                            onClick={(e) => handleReaction(page.id, "applaud", e)}
                            title="Applaudissements"
                          >
                            <Award className="reaction-icon" />
                            <span className="reaction-count">{page.reactions?.applaudissements || 0}</span>
                          </div>
                          <div
                            className={`card-reaction ${reactions[page.id]?.laugh ? "active" : ""}`}
                            onClick={(e) => handleReaction(page.id, "laugh", e)}
                            title="Feux"
                          >
                            <Sparkles className="reaction-icon" />
                            <span className="reaction-count">{page.reactions?.feux || 0}</span>
                          </div>
                          <div
                            className={`card-reaction ${reactions[page.id]?.support ? "active" : ""}`}
                            onClick={(e) => handleReaction(page.id, "support", e)}
                            title="Larmes"
                          >
                            <Heart className="reaction-icon" />
                            <span className="reaction-count">{page.reactions?.larmes || 0}</span>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="likes"></div>
                          <button
                            className="read-more-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              openPageDetail(page)
                            }}
                          >
                            {t.readMore}
                          </button>
                        </div>
                      </div>
                      <div className="card-shine"></div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>Aucun résultat trouvé</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )
      case "drama":
        return (
          <Suspense fallback={<div className="loading">Chargement...</div>}>
            <ApresFin />
          </Suspense>
        )
      case "write":
        return (
          <Suspense fallback={<div className="loading">Chargement...</div>}>
            <Ecrire />
          </Suspense>
        )
      default:
        return null
    }
  }

  return (
    <div className={`hall-container ${darkMode ? "dark-mode" : "light-mode"}`} ref={containerRef}>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* Fond animé */}
      <div className="stars-container">
        <div className="stars" ref={starsRef}></div>
      </div>

      {/* Portail de détail de page */}
      {selectedPage && (
        <div className={`page-portal ${portalOpen ? "open" : ""}`} ref={portalRef}>
          <div className="portal-content">
            <button className="close-portal" onClick={closePortal}>
              ×
            </button>
            <div className="portal-body">
              <Suspense fallback={<div className="loading">Chargement...</div>}>
                <button className="close-portal" onClick={closePortal}>
                  ×
                </button>
                <DernierFin />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Menu de test de fin */}
     {
      testMenuVisible ? 
      <>
      {
          <div className={`test-menu visible`}>
            <div className="test-menu-header">
              <h3 className="test-menu-title">{t.testTitle}</h3>
              <button className="test-menu-close" onClick={() => setTestMenuVisible(!testMenuVisible)}>
                ×
              </button>
            </div>
            <div className="test-menu-content">
              <p className="test-menu-subtitle">{t.testSubtitle}</p>
              <p className="test-menu-description">{t.testDescription}</p>
              <div className="test-options">
                <DernierFin/>
                <button className="start-test-btn">
                  Commencer le test
                </button>
              </div>
            </div>
          </div>
      }
      </> : 
      <>
      {
        <div></div>
      }
      </>
     }

      <header className="header -z-10">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">TheEnd</span>
            <span className="logo-dot">.</span>
            <span className="logo-page">page</span>
          </div>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <ul>
              <li className={activeSection === "hall" ? "active" : ""}>
                <a href="#hall" className="nav-link">
                  <BookOpen className="nav-icon" />
                  <span>{t.menus.hall}</span>
                </a>
              </li>
              <li className={activeSection === "write" ? "active" : ""}>
                <a href="#write" className="nav-link">
                  <PenLine className="nav-icon" />
                  <span>{t.writeYourEnd}</span>
                </a>
              </li>
              <li className={activeSection === "drama" ? "active" : ""}>
                <a href="#drama" className="nav-link">
                  <BrainCircuit className="nav-icon" />
                  <span>{t.afterTheEnd}</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </div>

          <div className="controls">
            <button className="search-toggle" onClick={toggleSearch} aria-label="Toggle search">
              <Search className="control-icon" />
            </button>
            <button
              className="language-toggle"
              onClick={() => setLanguage(language === "fr" ? "mg" : "fr")}
              aria-label="Toggle language"
            >
              {language === "fr" ? "MG" : "FR"}
            </button>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
              {darkMode ? <Sun className="control-icon" /> : <Moon className="control-icon" />}
            </button>
          </div>
        </div>
      </header>

      <main>{renderContent()}</main>

      <footer>
        <div className="footer-content">
          <div className="footer-top">
            <div className="logo">
              <span className="logo-text">TheEnd</span>
              <span className="logo-dot">.</span>
              <span className="logo-page">page</span>
            </div>
          </div>
          <div className="footer-divider"></div>
          <p>&copy; 2025 TheEnd.page - {t.footer}</p>
        </div>
      </footer>

      {/* Bouton flottant */}
      {activeSection === "hall" && (
        <button className="test-preview-btn floating-btn" onClick={() =>setTestMenuVisible(!testMenuVisible)} >
          <Eye size={16} />
          <span>Tester ma fin</span>
        </button>
        
      )}
      <ChatBotTheEnd/>
    </div>
  )
}

export default HallDesFins