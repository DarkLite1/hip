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
      processedDispatchGroupTable: {
        title: "Available dispatch groups:",
      },
      question: {
        truckId: "What is your truck ID number?",
        driverId: "What is your driver ID?",
        driverIdUnknown: "I don't know my driver ID",
      },
      error: {
        truckId: "At least 4 and maximum 12 characters are allowed",
        driverId: "A number between 9800000000 and 9999999999 (10 characters) is required",
      },
      label: {
        truckId: "Truck ID",
        driverId: "Driver ID",
      },
    },
  },
}
