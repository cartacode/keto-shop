module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
  	"**/*.css",
  	"index.html",
  	"images/*.png",
  	"images/*.ico",
  	"manifest.json",
  	"favicon.png"
  ],
  "globIgnores": [
	"**/node_modules/**/*"
  ],
  "swDest": "build/service-worker-custom.js",
  "swSrc": "public/service-worker-custom.js"
};