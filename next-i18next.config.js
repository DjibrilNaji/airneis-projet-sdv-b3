const path = require("path")

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es", "he", "ar"],
  },
  localePath: path.resolve("./public/locales"),
}
