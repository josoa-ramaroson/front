import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {  Moon, Sun, Globe,Sparkles,ArrowUpRight, DoorOpen } from "lucide-react"
import { Link } from 'react-router-dom'; 
import "./landingpage.css"
import Dashboard from './dashboard';
import Partenariat from './partenariat';
import Footer from './footer';

import TestimonialsSection from './temoignage';
function Landingpage() {
    const [darkMode, setDarkMode] = useState(true)
    const [language, setLanguage] = useState("fr")
    const [scrolled, setScrolled] = useState(false)
    const [langMenuOpen, setLangMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [animateText, setAnimateText] = useState(false)
    useEffect(() => {
      setAnimateText(true)
    }, [])

    const Traduction = (francais, anglais, malagasy) => {
    switch (language) {
      case "fr":
        return francais
      case "en":
        return anglais
      case "mg":
        return malagasy
      default:
        return francais
    }
  }

// Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Éléments de menu pour la navbar avec traductions
  const menuItems = [
    {
      name: Traduction("Accueil", "Home", "Fandraisana"),
      href: "#Acceuil",
    },
    {
      name: Traduction("Fonctionalité", "Functionality", "Zava-misy"),
      href: "#Fonctionnalité",
    },
     {
      name: Traduction("Temoignage", "Testimony", "Vavolombelona"),
      href: "#Temoignage",
    },
     {
      name: Traduction("Partenariat", "Partnership", "Mpiara-miasa"),
      href: "#Partenariat",
    },
    {
      name: Traduction("Contact", "Contact", "Fifandraisana"),
      href: "#Contact",
    },
  ]

  // Noms des langues
  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "mg", name: "Malagasy" },
  ]
  return (
    <div  className={`min-h-screen transition-colors duration-300  ${
       darkMode ? "bg-gray-100" : "bg-black"
      }`}>

        <header className='sticky top-0 z-50 backdrop-blur-xl'>
          <motion.nav
        className={`${scrolled ? "py-2" : "py-2"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="relative z-10">
            <div className="flex justify-between  items-center py-3 px-20">
              {/* Logo */}
              <motion.h1
                href="#"
                className={`text-2xl md:text-3xl  ${darkMode ? "text-black" : "text-white"} flex flex-row items-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{fontFamily:"Cormorant",fontWeight:"700",fontStyle:"italic"}}
              >
                 <DoorOpen className="h-8 w-8 text-red-500 mr-2" />
                {Traduction("EndPage", "EndPage", "EndPage")}
              </motion.h1>

              {/* Desktop Menu */}
              <div className='flex flex-row justify-between'>
                <div className="hidden md:flex items-center space-x-10">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className={`px-4 py-2 ${
                      darkMode
                      ? "text-black"
                      : "text-white"
                    } font-medium relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300,duration: 0.3, delay: index * 0.1  }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {item.name}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        darkMode ? "bg-amber-400" : "bg-amber-700"
                      } origin-left`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}

                {/* Bouton de changement de langue */}
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200`}
                  >
                    <Globe size={18} className="mr-1" color={`${darkMode ? "black": "white"}`} />
                    <span className={`${darkMode ? "text-black": "text-white"} uppercase`}>{language}</span>
                  </button>

                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`${darkMode ?'bg-gray-900' : "bg-gray-100"} absolute right-0 mt-2 w-40 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 z-50 `}
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code)
                              setLangMenuOpen(false)
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              language === lang.code
                                ? darkMode
                                  ? "bg-gray-100 text-black"
                                  : "bg-gray-900 text-white"
                                : darkMode
                                  ? "text-white hover:bg-gray-100 hover:text-black"
                                  : "text-black hover:bg-gray-900 hover:text-white"
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bouton de changement de mode */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`ml-2 p-2 rounded-full  transition-colors duration-200`}
                  aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
                >
                  {darkMode ? <Sun size={18} color={`${darkMode ? "black": "white"}`}/> : <Moon size={18} color={`${darkMode ? "black": "white"}`}/>}
                </button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}  className={` bg-gradient-to-r from-red-600 to-yellow-600  flex flex-1 text-xl px-5 rounded-xl py-2 text-black font-semibold duration-200`} style={{fontFamily:"Poppins"}}>
                 <Link to="/inscription"> 
                  {Traduction("Commencer","Start Now","Andao ary e")}
                 </Link>
              </motion.button>
              </div>
              
            </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                {/* Bouton de changement de langue (mobile) */}
                {/* Bouton de changement de langue */}
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200`}
                  >
                    <Globe size={18} className="mr-1" color={`${darkMode ? "black": "white"}`} />
                  </button>

                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`${darkMode ?'bg-gray-900' : "bg-gray-100"} absolute right-0 mt-2 w-40 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 z-50 `}
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code)
                              setLangMenuOpen(false)
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              language === lang.code
                                ? darkMode
                                  ? "bg-gray-100 text-black"
                                  : "bg-gray-900 text-white"
                                : darkMode
                                  ? "text-white hover:bg-gray-100 hover:text-black"
                                  : "text-black hover:bg-gray-900 hover:text-white"
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                {/* Bouton de changement de mode */}

                {/* Bouton de changement de mode (mobile) */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`mr-2 p-2 rounded-full }`}
                  aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
                >
                  {darkMode ? <Sun size={18} color={`${darkMode ? "black": "white"}`}/> : <Moon size={18} color={`${darkMode ? "black": "white"}`}/>}
                </button>

                {/* Bouton menu hamburger */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-md ${darkMode ? "text-amber-100" : "text-amber-800"} focus:outline-none`}
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={`${darkMode ? "black": "white"}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={`${darkMode ? "black": "white"}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${
             darkMode ? "bg-gray-100" : "bg-gray-900"
          } shadow-lg ${isOpen ? "block" : "hidden"}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container space-y-5 mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={`px-4 py-2 ${
                    darkMode
                      ? "text-black hover:text-black border-b border-slate-600/50"
                      : "text-white hover:text-white border-b border-amber-200/50"
                  } font-medium`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>            
            <div className='flex justify-center items-center'>
              <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}  className={`bg-gradient-to-r from-red-700 to-yellow-700  flex flex-1 text-xl px-5 rounded-xl py-2 text-black font-semibold duration-200`} style={{fontFamily:"Poppins"}}>
                 <Link to="/inscription"> 
                  {Traduction("Commencer","Start Now","Andao ary e")}
                 </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </header>

    <main className='xs:-mt-10 md:mt-20 space-y-40 p-5'>
      {/* Section Acceuil */}
      <section id='Acceuil' className={`${darkMode ? "bg-gray-100" : "bg-black"
      }relative w-full overflow-hidden  min-h-screen`}>
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Decorative elements */}
      <div className={`${darkMode ? "opacity-30" : "opacity-20"} absolute -left-20 top-40 w-80 h-80 bg-orange-500 rotate-12  blur-xl rounded-full`}></div>
      <div className={`${darkMode ? "opacity-30" : "opacity-10"} absolute right-0 bottom-0 w-96 h-96 bg-red-500 opacity-20 blur-xl rounded-full`}></div>

      {/* Diagonal lines */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/30"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/30"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-8 md:mb-16">
            <p
              className={`text-4xl md:text-7xl ${ darkMode? "text-balck" : "text-white" } font-bold tracking-tighter transition-all duration-700 ${animateText ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
              style={{ fontFamily: "Roboto" }}
            >
              {Traduction("C'est l'heure", "Time to go", "Fotoanany izao")}
            </p>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dysrhzaib/image/upload/v1747477172/D%C3%A9mission_et_ch%C3%B4mage___oui_c_est_possible_-_AH_Accompagnement_dsnlpp.png"
                  alt="Departure illustration"
                  width={300}
                  height={300}
                  className="rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <p
              className={`text-4xl md:text-7xl font-bold  ${ darkMode? "text-balck" : "text-white" } tracking-tighter transition-all duration-700 delay-300 ${animateText ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
              style={{ fontFamily: "Roboto" }}
            >
              {Traduction("Claque ta page,", "Slam your page,", "Dondòny ny pejinao,")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 ">
            <p
              className={`text-4xl md:text-7xl  ${ darkMode? "text-balck" : "text-white" } font-bold tracking-tighter transition-all duration-700 delay-500 ${animateText ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
              style={{ fontFamily: "Roboto" }}
            >
              {Traduction("Tu pars avec", "Leaving with", "Hiala miaraka")}
            </p>

            <div className="relative">
              <span className="absolute -top-6 -right-6">
                <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              </span>
              <p
                className={`text-4xl xs:text-center md:text-6xl   font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-700 delay-700 ${animateText ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{ fontFamily: "Roboto" }}
              >
                {Traduction("Des adieux ou Des larmes ?", "Farewells or Tears ?", "Veloma na ranomaso ?")}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition duration-300"></div>
              <img 
                src="https://res.cloudinary.com/dysrhzaib/image/upload/v1747477172/Im_ppue15.png"
                alt="Tears illustration"
                width={200}
                height={200}
                className="rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <button className="group relative px-8 py-4 bg-white text-black font-bold xs:text-md md:text-xl rounded-full overflow-hidden transition-all duration-300 hover:bg-black hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <Link to="/inscription" className="relative z-10 flex items-center gap-2">
              {
                Traduction("CRÉE TA PAGE DE FIN", "CREATE THE END PAGE","FORONO ARY NY PEJY")
              }
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <span className="absolute bottom-0 left-0 w-full h-0  bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-300 group-hover:h-full -z-0"></span>
          </button>
          </div>
        </div>
      </div>
      <div className="absolute xs:hidden md:block bottom-0 left-0 w-full h-5  bg-gradient-to-r from-red-700 to-yellow-700 transform -skew-y-3 translate-y-10"></div>
    </section>
      {/* Section Acceuil */}

       {/* Section Fonctionnalité */}
      <section id="Fonctionnalité">
            <Dashboard language={language} darkMode={darkMode}/>
      </section>
       {/* Section Fonctionnalité */}

        {/* Section Témoignage */}
       <section id='Temoignage'>
         <TestimonialsSection language={language} darkMode={darkMode}/>
       </section>
       {/* Section Témoignage */}

       {/* Section Partenariat */}
      <section id="Partenariat">
              <Partenariat language={language} darkMode={darkMode}/>
      </section>

    {/* Section Partenariat */}
    </main>
       <section id='Contact' className='mt-20'>
                 <Footer/>
       </section>
    </div>
  )
}

export default Landingpage