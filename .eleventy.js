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
  
  // Expose env vars if needed in templates (keep debug optional)
  // Support both MAIL_KEY and EMAIL_API_KEY for compatibility
  const mailKey = process.env.MAIL_KEY || process.env.EMAIL_API_KEY || "";
  if (mailKey) {
    console.log("Loaded API key:", mailKey);
  }
  eleventyConfig.addGlobalData("mailKey", mailKey);
  
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
  
  // Determine pathPrefix: 
  // 1. Check explicit env variable (highest priority)
  // 2. If CNAME file exists, use "/" for custom domain
  // 3. Fallback to GH repo name if available
  // 4. Default to "/"
  const fs = require('fs');
  const hasCNAME = fs.existsSync('./CNAME');
  const explicitPrefix = process.env.PATH_PREFIX || process.env.ELEVENTY_PATH_PREFIX;
  
  let pathPrefix = "/";
  if (explicitPrefix) {
    pathPrefix = explicitPrefix;
  } else if (hasCNAME) {
    // Custom domain detected - use root path
    pathPrefix = "/";
  } else if (process.env.GITHUB_REPOSITORY) {
    // GitHub Pages project site - use repo name
    pathPrefix = `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`;
  }

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