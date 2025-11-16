require('dotenv').config();

module.exports = {
  pathPrefix: "/",
  email_api: process.env.EMAIL_API_KEY || "YOUR_ACCESS_KEY_HERE",
  production_domain_prefix: 'https://dobripraktiki.com/',
  development_domain_prefix: 'http://localhost:8080/'
}; 