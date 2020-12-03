export default {
  general: {
    welcome: "Welkom",
  },
  page: {
    home: {
      name: "Startpagina",
      welcomeMessage: "Welkom {userName}!",
    },
    applications: {
      name: "Applicaties",
    },
    settings: {
      name: "Instellingen",
      darkMode: "Donkere modus",
      language: "Taal",
      help: "Help",
      reportProblem: "Meld een probleem",
      emailUs: "Stuur ons een e-mail",
    },
  },
  application: {
    sapTruckRoster: {
      name: "SAP vracthwagen planning",
      shortDescription: "Haal de planning op",
      longDescription: "",
      processedDispatchGroupTable: {
        title: "Available dispatch groups:",
      },
      question: {
        truckId: "Wat is uw vrachtwagen ID nummer?",
        driverId: "Wat is uw chauffeur ID?",
        driverIdUnknown: "Ik ken mijn chauffeur ID nummer niet",
      },
      error: {
        truckId:
          "Een string van 4 tot 12 karakters is toegestaan met minmimum 1 alfabetisch karakter",
        driverId: "Een nummer tusen 9800000000 en 9999999999 is vereist",
      },
      label: {
        truckId: "Vrachtwagen ID",
        driverId: "Chauffeur ID",
      },
    },
  },
  validationRules: {
    requiredField: "Verplicht veld",
  },
}
