export default {
  general: {
    welcome: "Welcome",
  },
  button: {
    submit: "Submit",
    reset: "Reset",
  },
  page: {
    home: {
      name: "Home",
      welcomeMessage: "Welcome {userName}!",
    },
    applications: {
      name: "Applications",
    },
    settings: {
      name: "Settings",
      darkMode: "Dark mode",
      language: "Language",
      help: "Help",
      reportProblem: "Report a problem",
      emailUs: "Send us an e-mail",
    },
  },
  application: {
    sapTruckRoster: {
      name: "SAP Truck Roster",
      shortDescription: "Get the truck planning",
      longDescription: "Get the truck planning from SAP",
      question: {
        truckId: "What is your truck ID number?",
        driverId: "What is your driver ID?",
        driverIdUnknown: "I don't know my driver ID",
      },
      error: {
        truckId: "10 characters are required",
        driverId: "At least 3 characters are required",
      },
      label: {
        truckId: "Truck ID",
        driverId: "Driver ID",
      },
    },
  },
}
