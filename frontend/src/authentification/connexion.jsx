import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, Eye, EyeOff, Sun, Moon, Globe, Flame, DoorOpen, ChevronDown, Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Removed 'redirect' as it's not needed with useNavigate
import axios from "axios";
import { api } from "../hooks/api";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  // États
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [showPassword, setShowPassword] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Renamed to `navigate` for consistency

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  // Fonction de traduction
  const Traduction = (francais, anglais, malagasy) => {
    switch (language) {
      case "fr":
        return francais;
      case "en":
        return anglais;
      case "mg":
        return malagasy;
      default:
        return francais;
    }
  };

  // Noms des langues
  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "mg", name: "Malagasy" },
  ];

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Gestion de la vérification reCAPTCHA
  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
    if (errors.recaptcha) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: undefined,
      }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = Traduction("L'email est requis", "Email is required", "Ilaina ny mailaka");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = Traduction(
        "Veuillez entrer une adresse email valide",
        "Please enter a valid email address",
        "Ampidiro adiresy mailaka marina"
      );
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = Traduction("Le mot de passe est requis", "Password is required", "Ilaina ny tenimiafina");
    } else if (formData.password.length < 3) {
      newErrors.password = Traduction(
        "Le mot de passe doit contenir au moins 8 caractères",
        "Password must be at least 6 characters",
        "Ny tenimiafina dia tokony ahitana litera 6 farafahakeliny"
      );
    }

    // Validation reCAPTCHA
    if (!recaptchaVerified) {
      newErrors.recaptcha = Traduction(
        "Veuillez vérifier que vous n'êtes pas un robot",
        "Please verify that you are not a robot",
        "Hamafiso fa tsy robot ianao"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      axios
        .post(`${api}/login/`, { email: formData.email, password: formData.password })
        .then((res) => {
          localStorage.setItem("token", res.data.access);
          setIsSubmitting(false);
          setIsSuccess(true);
          // Réinitialiser le succès après 3 secondes et naviguer
          setTimeout(() => {
            setIsSuccess(false);
            setFormData({
              email: "",
              password: "",
            });
            setRecaptchaVerified(false); 
            navigate("/3d-choice"); // Navigate to relative path "./hall"
          }, 2000);
          
        })
        .catch((error) => {
          console.log(error);
          setIsSubmitting(false);
          setErrors({
            server: Traduction(
              "Erreur de connexion. Vérifiez vos identifiants.",
              "Login error. Check your credentials.",
              "Hadisoana amin'ny fidirana. Hamarino ny fampahalalana anao."
            ),
          });
        });
    }
  };


  // Charger le script reCAPTCHA
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);

    window.recaptchaCallback = (value) => {
      handleRecaptchaChange(value);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? "bg-white" : "bg-black"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%]"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Flame size={40} className={`${darkMode ? "text-amber-500/20" : "text-amber-700/20"}`} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[5%]"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        >
          <DoorOpen size={36} className={`${darkMode ? "text-amber-500/20" : "text-amber-700/20"}`} />
        </motion.div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${darkMode ? "bg-amber-400/40" : "bg-amber-600/40"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Conteneur principal */}
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contrôles de thème et langue */}
        <div className="flex justify-end mb-4 space-x-2">
          {/* Bouton de changement de mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full transition-colors duration-200"
            aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {darkMode ? <Sun size={18} color={`${darkMode ? "black" : "white"}`} /> : <Moon size={18} color={`${darkMode ? "black" : "white"}`} />}
          </button>

          {/* Bouton de changement de langue */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center px-3 py-2 rounded-md transition-colors duration-200"
            >
              <Globe size={18} className="mr-1" color={`${darkMode ? "black" : "white"}`} />
              <span className={`${darkMode ? "text-black" : "text-white"} uppercase`}>{language}</span>
            </button>

            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} absolute right-0 mt-2 w-40 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50`}
              >
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
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
        </div>

        {/* Carte du formulaire */}
        <motion.div
          className={`relative rounded-xl overflow-hidden ${darkMode ? "bg-blanc" : "bg-noir"} shadow-2xl`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Sceau décoratif */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-noir" : "bg-blanc"}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <DoorOpen size={24} color={`${darkMode ? "white" : "black"}`} />
            </motion.div>
          </div>

          {/* Contenu du formulaire */}
          <div className="p-8 pt-10">
            {/* Titre */}
            <div className="text-center mb-8">
              <motion.h2
                className={`text-2xl font-serif mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-600`}
                style={{ fontFamily: "Roboto", fontWeight: "700" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {Traduction("Bienvenue dans l’ultime acte", "Welcome to the final act", "Tongasoa eto am-pamaranana")}
              </motion.h2>
              <motion.p
                className={`${darkMode ? "text-black" : "text-white"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ fontFamily: "poppins" }}
              >
                {Traduction(
                  "C’est ici que tout se termine. Et ça commence par un login",
                  "This is where it all ends. And it starts with a login.",
                  "Eto no iafarany. Ary manomboka amin'ny fidirana."
                )}
              </motion.p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Email */}
              <div className="">
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? "text-noir" : "text-blanc"}`}>
                  {Traduction("Email", "Email", "Mailaka")}
                </label>
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                      darkMode ? "text-amber-400" : "text-amber-700"
                    }`}
                  >
                    <Mail size={18} color="orange" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 w-full px-4 py-2 rounded-lg ${
                      darkMode ? "bg-white placeholder:text-noir" : "bg-black placeholder:text-blanc"
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? "focus:ring-orange-500/50" : "focus:ring-orange-700/50"
                    } ${errors.email ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
                    placeholder={Traduction("Votre email", "Your email", "Ny mailakao")}
                  />
                  {errors.email && (
                    <motion.p
                      className="mt-1 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="">
                <label htmlFor="password" className={`block text-sm font-medium mb-2 ${darkMode ? "text-noir" : "text-blanc"}`}>
                  {Traduction("Mot de passe", "Password", "Tenimiafina")}
                </label>
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                      darkMode ? "text-amber-400" : "text-amber-700"
                    }`}
                  >
                    <Lock size={18} color="orange" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 w-full px-4 py-2 rounded-lg ${
                      darkMode ? "bg-white placeholder:text-noir" : "bg-black placeholder:text-blanc"
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? "focus:ring-orange-500/50 focus:border-0" : "focus:ring-orange-700/50 focus:border-0"
                    } ${errors.password ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
                    placeholder={Traduction("Votre mot de passe", "Your password", "Ny tenimiafinao")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                      darkMode ? "text-amber-400" : "text-amber-700"
                    }`}
                  >
                    {showPassword ? <EyeOff size={18} color={`${darkMode ? "black" : "white"}`} /> : <Eye size={18} color={`${darkMode ? "black" : "white"}`} />}
                  </button>
                  {errors.password && (
                    <motion.p
                      className="mt-1 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center items-center">
                <div className="g-recaptcha" data-sitekey="6LfV5z0rAAAAAMciyH24vgr4ACjZe251DmipcB4U" data-callback="recaptchaCallback"></div>
                {errors.recaptcha && (
                  <motion.p
                    className="mt-1 text-sm text-red-500 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} className="mr-1" />
                    {errors.recaptcha}
                  </motion.p>
                )}
              </div>

              {/* Bouton de soumission */}
              <motion.button
                type="submit"
                className={`bg-gradient-to-r from-red-600 to-yellow-600 flex justify-center items-center w-full text-xl px-5 rounded-xl py-2 text-black font-semibold duration-200`}
                style={{ fontFamily: "Poppins" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {Traduction("Connexion en cours...", "Sign ig...", "fidirana...")}
                  </div>
                ) : (
                  Traduction("Connexion", "Sign In", "Hiditra")
                )}
              </motion.button>

              {/* Message de succès */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    className={`mt-4 p-3 rounded-lg flex items-center ${darkMode ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check size={18} className="mr-2 flex-shrink-0" />
                    <span>
                      {Traduction(
                        "Inscription réussie ! Bienvenue dans l'aventure.",
                        "Registration successful! Welcome to the adventure.",
                        "Vita soa aman-tsara ny fanoratana anarana! Tongasoa amin'ny fialan-tsasatra."
                      )}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Afficher les erreurs serveur */}
              {errors.server && (
                <motion.div
                  className="mt-4 p-3 rounded-lg flex items-center bg-red-100 text-red-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                  <span>{errors.server}</span>
                </motion.div>
              )}
            </form>

            {/* Lien de connexion */}
            <div className="mt-6 text-center">
              <p className={darkMode ? "text-noir" : "text-blanc"}>
                {Traduction("Vous n'avez pas de compte ?", "You have any account ?", "Tsy manana kaonty?")}
                <Link
                  to="/inscription"
                  className={`ml-1 font-medium ${darkMode ? "text-orange-400 hover:text-amber-300" : "text-orange-700 hover:text-amber-600"}`}
                >
                  {Traduction("S'inscricre", "Sign in", "Hisoratra")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}