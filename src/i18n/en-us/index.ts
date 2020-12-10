export default {
  general: {
    welcome: "Welcome",
  },
  button: {
    submit: "Submit",
    reset: "Reset",
    back: "Back",
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
      reportProblem: "Report an issue",
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
      rosterQueryResult: {
        title: "Planned trips:",
      },
      question: {
        truckId: "What is your truck ID number?",
        driverId: "What is your driver ID?",
        driverIdUnknown: "I don't know my driver ID",
      },
      error: {
        truckId: "Truck ID does not exist",
        driverId: "Driver ID does not exist",
      },
      label: {
        truckId: "Truck ID",
        driverId: "Driver ID",
        plantName: "Plant name",
        date: "Date",
        time: "Time",
      },
    },
  },
  validationRules: {
    requiredField: "Field is required",
  },
}
