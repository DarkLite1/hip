export default {
  general: {
    welcome: "Welcome",
    errorMessage: "Oops, something went wrong",
    fromDate: "From date",
  },
  button: {
    submit: "Submit",
    reset: "Reset",
    back: "Back",
    dismiss: "Dismiss",
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
        driverId: "What is your driver ID?",
        truckId: "What is your truck ID number?",
        driverIdUnknown: "I don't know my driver ID",
      },
      error: {
        driverId: "Driver ID does not exist",
        truckId: "Truck ID does not exist",
        sapDown: "SAP down please try again later or contact your service desk",
        noTripsPlanned: "Were sorry, but there are currently no trips planned...",
      },
      label: {
        driverId: "Driver ID",
        truckId: "Truck ID",
        plantName: "Plant name",
        date: "Date",
        time: "Time",
      },
      hint: {
        driverId: "Example: 9800000000, ...",
        truckId: "Example: BU54EAP, ...",
      },
    },
  },
  validationRules: {
    requiredField: "Field is required",
    minimumStringLength: "Minimal {number} characters are required",
    exactStringLength: "Exactly {number} characters are required",
  },
}
