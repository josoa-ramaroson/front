import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layers, Users, Sun, Moon, ArrowLeft } from 'lucide-react'
import { useCharacterCustomization } from './CharacterCustomizationContext'
import { useDarkMode } from './DarkModeContext'
import { useNavigate } from 'react-router-dom'

const Interface = () => {
  const { characterMode, setCharacterMode, characterGender, setCharacterGender } = useCharacterCustomization()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [animateElements, setAnimateElements] = useState(false)
 const navigation = useNavigate()
  useEffect(() => {
    setAnimateElements(true)
  }, [])

  const colors = {
    primary: darkMode ? 'from-indigo-400 to-purple-500' : 'from-purple-500 to-indigo-600',
    secondary: darkMode ? 'from-teal-400 to-blue-500' : 'from-blue-500 to-teal-600',
    accent: darkMode ? 'from-amber-400 to-rose-500' : 'from-rose-500 to-amber-600',
    panel: darkMode ? 'bg-white/70' : 'bg-gray-900/70',
    button: darkMode ? 'bg-gray-100/90' : 'bg-gray-800/90',
    text: darkMode ? 'text-gray-800' : 'text-gray-100',
    subtext: darkMode ? 'text-gray-600' : 'text-gray-300',
  }

  return (
    <div className={`transition-colors duration-300 ${colors.text}`}>      
      {/* Back & Dark Mode Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: animateElements ? 1 : 0, x: animateElements ? 0 : -20 }}
        className="fixed top-5 left-5 z-50 flex space-x-4 items-center"
      >
        <motion.button
          onClick={() => window.history.back()}
          className={`flex items-center p-3 rounded-full ${colors.button} shadow-lg backdrop-blur-md`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="h-5 w-5 text-purple-500" />
        </motion.button>
        <motion.button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'bg-gray-200/50' : 'bg-gray-800/50'} backdrop-blur-md`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? <Moon size={18} className="text-indigo-600" /> : <Sun size={18} className="text-amber-400" />}
        </motion.button>
      </motion.div>

      {/* Configurator Panel (Gender Selection) */}
      <motion.div
        className={`z-50 fixed inset-x-0 bottom-4 sm:inset-auto sm:top-12 sm:right-5 sm:w-64 w-full px-5 pb-[env(safe-area-inset-bottom)] pt-5 rounded-t-xl sm:rounded-xl shadow-xl ${colors.panel} backdrop-blur-md`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animateElements ? 1 : 0, y: animateElements ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4 p-4">
          {/* Gender Selection */}
          <div className="space-y-3">
            <div className="flex items-center mb-1">
              <Users className="h-4 w-4 text-purple-500 mr-2" />
              <span className={`text-sm font-medium ${colors.subtext}`}>Choose Gender</span>
            </div>
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={() => setCharacterGender('male')}
                className={`flex-1 py-2 px-3 rounded-xl font-medium ${
                  characterGender === 'male'
                    ? `bg-gradient-to-r ${colors.secondary} text-white`
                    : `bg-gray-800/80 hover:bg-gray-700/80 text-gray-200`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Male
              </motion.button>
              <motion.button
                onClick={() => setCharacterGender('female')}
                className={`flex-1 py-2 px-3 rounded-xl font-medium ${
                  characterGender === 'female'
                    ? `bg-gradient-to-r ${colors.accent} text-white`
                    : `bg-gray-800/80 hover:bg-gray-700/80 text-gray-200`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Female
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
  className="fixed inset-x-0 bottom-5 z-50 flex items-center justify-between px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: animateElements ? 1 : 0, y: animateElements ? 0 : 20 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  {/* Zone gauche vide pour équilibrer */}
  <div className="w-1/3" />

  {/* Boutons PRO / RELAX centrés */}
  <div className="w-1/3 flex justify-center space-x-4">
    <motion.button
      onClick={() => setCharacterMode('PRO')}
      className={`py-2 px-4 rounded-xl font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white ${
        characterMode === 'PRO' ? 'ring-2 ring-offset-2 ring-green-300' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      PRO
    </motion.button>
    <motion.button
      onClick={() => setCharacterMode('RELAX')}
      className={`py-2 px-4 rounded-xl font-medium bg-gradient-to-r from-purple-400 to-pink-500 text-white ${
        characterMode === 'RELAX' ? 'ring-2 ring-offset-2 ring-purple-300' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      RELAX
    </motion.button>
  </div>

  {/* Bouton Next aligné à droite */}
  <div className="w-1/3 flex justify-end">
    <motion.button
      // onClick={()=>{navigation("/hall")}}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`bg-gradient-to-r ${colors.accent} text-white font-semibold px-5 py-2 rounded-xl shadow-lg`}
    >
      Next
    </motion.button>
  </div>
</motion.div>

    </div>
  )
}

export default Interface
