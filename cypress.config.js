const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://demo.podium.tools/qa-webchat-lorw/",
  },
});
