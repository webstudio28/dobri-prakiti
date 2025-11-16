require('dotenv').config();
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets with proper MIME types
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  
  // Add global data for environment variables
  eleventyConfig.addGlobalData("env", {
    EMAIL_API_KEY: process.env.EMAIL_API_KEY
  });
  
  eleventyConfig.addFilter("date", (dateObj, format = "dd LLL yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Ensure proper MIME types for assets
  eleventyConfig.addWatchTarget("src/assets/");
  
  // Set input and output directories
  const config = {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };

  // Only add pathPrefix for production builds (GitHub Pages)
  // For local development, no pathPrefix is needed
  if (process.env.NODE_ENV === 'production') {
    config.pathPrefix = "/dobri-praktiki/";
  }

  return config;
}; 