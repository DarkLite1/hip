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
        truckId:
          "A string of 4 to 12 characters is allowed with at least 1 character being a letter",
        driverId: "A number between 9800000000 and 9999999999 is required",
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
