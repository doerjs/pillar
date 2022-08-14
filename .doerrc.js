module.exports = {
  // 设置别名
  alias: {
    '@': './src',
  },
  // doer默认会排除所有node_modules编译
  // 如果需要编译部分包，请在这里添加额外的需要编译的包名
  extraBabelCompileNodeModules: [],
  // 项目导出的共享资源
  exposes: {
    // components
    './action': '@/packages/action',
    './layout': '@/packages/layout',
    './grid': '@/packages/grid',
    './tabs': '@/packages/tabs',

    // utils
    './utils/is': '@/utils/is',
    './utils/enum': '@/utils/enum',
    './utils/tree': '@/utils/tree',
  },
  shared: {},
  plugins: [
    '@doerjs/plugin-less',
  ],
}
