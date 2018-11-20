const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Production build - Adding Workbox for PWAs", config, env);
    // Extend the default injection config with required swSrc
    const workboxConfig = {
      ...defaultInjectConfig,
      "globPatterns": [
        "index.html"
      ],
      swSrc: path.join(__dirname, 'src', 'service-worker-custom.js'),
      importWorkboxFrom: "local" // Add this propertie
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};