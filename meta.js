"use strict";
let exeq = undefined;
try {
  exeq = require("exeq");
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.log(`Tip: cd ~ && yarn add exeq`);
  }
}
module.exports = function (values) {
  return {
    questions: [
      {
        type: "confirm",
        name: "apiGW",
        message: "Add API Gateway (moleculer-web) service?",
        default: true,
      },
      {
        type: "confirm",
        name: "needTransporter",
        message: "Would you like to communicate with other nodes?",
        default: false,
      },
      {
        type: "confirm",
        name: "useMongoDB",
        message: "Connect to MongoDB?",
        default: true,
      },
      {
        type: "input",
        name: "MONGODB_URI",
        message: "MONGODB_URI:",
        when(answers) {
          return answers.useMongoDB;
        },
        default: "mongodb://localhost:27017/",
      },
      {
        type: "input",
        name: "MONGODB_REPLICASET",
        message: "MONGODB_REPLICASET:",
        when(answers) {
          return answers.useMongoDB;
        },
      },
      {
        type: "input",
        name: "MONGODB_SSL",
        message: "MONGODB_SSL:",
        when(answers) {
          return answers.useMongoDB;
        },
        default: false,
      },
      {
        type: "input",
        name: "MONGODB_AUTHSOURCE",
        message: "MONGODB_AUTHSOURCE:",
        when(answers) {
          return answers.useMongoDB;
        },
        default: null,
      },
      {
        type: "input",
        name: "MONGODB_AUTH_USER",
        message: "MONGODB_AUTH_USER:",
        when(answers) {
          return answers.useMongoDB && answers.MONGODB_AUTHSOURCE;
        },
      },
      {
        type: "password",
        name: "MONGODB_AUTH_PASSWORD",
        message: "MONGODB_AUTH_PASSWORD:",
        when(answers) {
          return answers.useMongoDB && answers.MONGODB_AUTHSOURCE;
        },
      },
      // {
      //     type: "confirm",
      //     name: "needCacher",
      //     message: "Would you like to use cache?",
      //     default: false,
      // },
      // {
      //     type: "list",
      //     name: "logger",
      //     message: "Select a logger",
      //     choices: [
      //         { name: "Console (default)", value: "Console" },
      //         { name: "Bunyan", value: "Bunyan" },
      //         { name: "Pino", value: "Pino" },
      //     ],
      //     default: "Console"
      // },
      {
        type: "confirm",
        name: "useLint",
        message: "Use ESLint to lint your code?",
        default: true,
      },
      {
        type: "confirm",
        name: "usePrettier",
        message: "Use prettier to format your code?",
        default: true,
      },
      {
        type: "confirm",
        name: "useJest",
        message: "Setup unit tests with Jest?",
        default: false,
      },
      {
        type: "confirm",
        name: "install",
        message: "Would you like to run 'yarn'?",
        default: true,
        when() {
          return exeq !== undefined;
        },
      },
    ],
    metalsmith: {
      before(metalsmith) {
        const data = metalsmith.metadata();
        data.calculatorService = !data.apiGW && !data.useMongoDB;
        data.calculatorServiceTest = data.calculatorService && data.useJest;
        data.useApiGWWithJest =
          (data.apiGW && data.useJest) ||
          (data.apiGW && data.useMongoDB && data.useJest);
        data.useMongoDBWithApiGW = data.apiGW && data.useMongoDB;
        data.useMongoDBWithJest = data.useMongoDB && data.useJest;
        if (data.action !== undefined) {
          if (typeof data.action === "string") {
            data.tipAction = data.action === "tip";
            data.namesAction = data.action === "names";
          } else if (Array.isArray(data.action)) {
            data.tipAction = data.action.includes("tip");
            data.namesAction = data.action.includes("names");
          }
          data.tipActionTest = data.tipAction && data.useJest;
          data.namesActionTest = data.namesAction && data.useJest;
        } else {
          data.tipAction = false;
          data.tipActionTest = false;
          data.namesAction = false;
          data.namesActionTest = false;
        }
      },
      complete(metalsmith) {
        const data = metalsmith.metadata();
        if (data.install && exeq) {
          exeq([`cd ${data.projectPath}`, "yarn", `code ${data.projectPath}`]);
        }
      },
    },
    filters: {
      "rest/node.http": "apiGW",
      "src/index.d.ts": "apiGW",
      "src/services/routes.service.ts": "apiGW",
      "src/mixins/mongodb.mixin.ts": "useMongoDB",
      "test/unit/mixins/mongodb.mixin.spec.ts": "useMongoDBWithJest",
      "test/unit/fixtures/privkey": "useMongoDBWithJest",
      "test/unit/fixtures/pubkey": "useMongoDBWithJest",
      "src/services/controllers/documents.service.ts": "useMongoDBWithApiGW",
      "src/services/stores/documents-store.service.ts": "useMongoDB",
      "src/utils/utils.ts": "useMongoDB",
      "src/moleculer-db-adapter-mongo.d.ts": "useMongoDB",
      "jest.config.js": "useJest",
      "test/fixtures/localhost.crt": "useApiGWWithJest",
      "test/fixtures/localhost.key": "useApiGWWithJest",
      "test/unit/services/routes.service.spec.ts": "useApiGWWithJest",
      ".eslintrc.json": "useLint",
      ".prettierignore": "usePrettier",
      "test/fixtures/privkey": "useMongoDBWithJest",
      "test/fixtures/pubkey": "useMongoDBWithJest",
      "test/unit/utils/utils.spec.ts": "useMongoDBWithJest",
      "src/services/calculator.service.ts": "calculatorService",
      "test/unit/services/calculator.service.spec.ts": "calculatorServiceTest",
      "src/actions/tip.action.ts": "tipAction",
      "test/unit/actions/tip.action.spec.ts": "tipActionTest",
      "src/actions/names.action.ts": "namesAction",
      "test/unit/actions/names.action.spec.ts": "namesActionTest",
    },
    completeMessage: `
To get started:
        cd {{projectName}} && yarn && code .`,
  };
};
