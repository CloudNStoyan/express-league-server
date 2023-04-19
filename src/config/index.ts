import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 8332,
    allowedOrigin: "http://localhost:8004",
    secrets: {
      riotApiToken: process.env.RIOT_API_TOKEN,
    },
  },
  envConfig
);
