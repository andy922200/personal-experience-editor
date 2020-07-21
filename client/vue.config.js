const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    open: true,
    // host: "localhost",
    proxy: {
      "/api": {
        target: "https://personal-experience-editor.herokuapp.com/",
        // target: "http://localhost:3000"
      }
    }
  }
};
