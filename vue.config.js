/**
 * 配置文件
 * alias：配置别名
 */
const path = require('path')
function resolve (dir) {
 return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
    .set('assets', resolve('src/assets'))
    .set('commen',resolve('src/commen'))
    .set('network', resolve('src/network'))
    .set('components', resolve('src/components'))
    .set('views', resolve('src/views'))
  }
}


