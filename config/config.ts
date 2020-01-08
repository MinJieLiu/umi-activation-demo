import { IConfig, IPlugin } from 'umi-types';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        routes: {
          exclude: [
            /models\//,
            /components\//,
            /services\//,
            /containers\//,
            /locales\//,
            /.+\.less$/,
          ],
        },
        locale: {
          // default false
          enable: true,
          // default zh-CN
          default: 'zh-CN',
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: true,
        },
        dynamicImport: {
          loadingComponent: './components/Spinner/index',
          webpackChunkName: true,
          level: 3,
        },
        // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
        // dll features https://webpack.js.org/plugins/dll-plugin/
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
          exclude: ['@babel/runtime'],
        },
      },
    ],
    // 保持多页标签的状态
    // https://github.com/CJY0208/react-activation/blob/master/README_CN.md
    ['umi-plugin-activation-route-modify', { exclude: ['/', '/404'] }]
  ] as IPlugin[],
  hash: true,
  targets: {
    ie: 10,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  // routes: [],
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  extraBabelPlugins: ['babel-plugin-styled-components'],
} as IConfig;
