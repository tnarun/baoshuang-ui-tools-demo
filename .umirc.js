import path from 'path'

// ref: https://umijs.org/config/
export default {
  hash: true,
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'BaoShuang UI DEMO',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  alias: {
    '@web-components': path.resolve(__dirname, 'sub-packages/web-components')
  }
}
