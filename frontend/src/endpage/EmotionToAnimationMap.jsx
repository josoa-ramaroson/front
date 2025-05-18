export const EmotionToAnimationMap = {
    // Mapping des émotions vers les animations disponibles
    TRISTE: "sad",            // Utilise l'animation "sad"
    COLERE: "angry",          // Utilise l'animation "angry"
    JOIE: "happy",            // Utilise l'animation "happy"
    SOULAGEMENT: "thankful",  // "thankful" semble approprié pour le soulagement
    ANXIETE: "rejected",      // "rejected" a des expressions compatibles avec l'anxiété
    ESPOIR: "thankful",       // Une variante de "thankful" peut exprimer l'espoir
    FRUSTRATION: "stomping",  // "stomping" exprime bien la frustration
    FIERTE: "happy",          // Variante de "happy" pour la fierté
    REGRET: "crying",         // "crying" peut être adapté pour le regret
    DETERMINATION: "angry-gesture", // "angry-gesture" peut être utilisé pour la détermination
  };
  
  // Fonction utilitaire pour obtenir l'animation correspondant à une émotion
  export const getAnimationForEmotion = (emotion) => {
    return EmotionToAnimationMap[emotion] || "idle";  // Par défaut "idle" si l'émotion n'est pas reconnue
  };
  