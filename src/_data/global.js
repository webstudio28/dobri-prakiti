require('dotenv').config();

module.exports = {
  pathPrefix: "/globus89/",
  email_api: process.env.EMAIL_API_KEY || "YOUR_ACCESS_KEY_HERE",
  production_domain_prefix: 'https://www.globus89.com/',
  development_domain_prefix: 'http://localhost:8081/globus89/'
}; 