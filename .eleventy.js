const dotenv = require('dotenv');
dotenv.config();
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  
  // Add global data for environment variables
  eleventyConfig.addGlobalData("env", {
    EMAIL_API_KEY: process.env.EMAIL_API_KEY
  });
  
  // Add services as global data
  eleventyConfig.addGlobalData("footerServices", function() {
    const services = require("./src/_data/services.json");
    return services.slice(0, 4);
  });
  
  eleventyConfig.addFilter("date", (dateObj, format = "dd LLL yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Ensure proper MIME types for assets
  eleventyConfig.addWatchTarget("src/assets/");
  
  // Determine pathPrefix: prefer explicit env; fallback to GH repo name if available
  const explicitPrefix = process.env.PATH_PREFIX || process.env.ELEVENTY_PATH_PREFIX;
  const repoPrefix = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : "/";
  const pathPrefix = explicitPrefix || repoPrefix || "/";

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 