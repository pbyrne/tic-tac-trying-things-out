const pluginWebc = require("@11ty/eleventy-plugin-webc")
const esbuild = require("esbuild")

const appDir = "app"
const outDir = "_site"

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);

  eleventyConfig.addWatchTarget(`./${appDir}/javascripts/`)
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: [
        `./${appDir}/javascripts/vanilla-js.js`,
      ],
      bundle: true,
      outdir: `./${outDir}/javascripts/`,
    })
  })

  eleventyConfig.addPassthroughCopy(`./${appDir}/stylesheets/`)

  return {
    dir: { input: appDir, output: "_site" }
  };
};
