import path from 'path'

const getRootPath = (subPath) => {
  return path.resolve(__dirname, subPath)
}

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
      title: 'BaoShuang UI Demo',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  alias: {
    '@web-components': getRootPath('sub-packages/web-components')
  }
}
