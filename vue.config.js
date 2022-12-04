const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
    //配置 运行和打包时的文件路径
    publicPath:process.env.NODE_ENV==='production'?'./':'/',
}
