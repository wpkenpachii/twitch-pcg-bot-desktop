const { defineConfig } = require('@vue/cli-service')
// const fs = require('fs');
// const settings = fs.readFileSync('./src/database/settings.json');
// const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: true,
  // configureWebpack: config => {
  //   return {
  //     plugins: [
  //       new webpack.DefinePlugin({
  //         'settings': JSON.parse(settings),
  //       })
  //     ]
  //   }
  // },
})
