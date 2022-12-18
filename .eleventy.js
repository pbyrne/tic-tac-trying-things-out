const pluginWebc = require("@11ty/eleventy-plugin-webc");

const appDir = "app"

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);

  eleventyConfig.addPassthroughCopy(`./${appDir}/stylesheets/`)
  eleventyConfig.addPassthroughCopy(`./${appDir}/javascripts/`)

  return {
    dir: { input: appDir, output: "_site" }
  };
};
