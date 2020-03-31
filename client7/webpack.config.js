const path = require('path');
// 生成html文件的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于访问内置插件（热更新用到）
const webpack = require('webpack');
// const extractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// 压缩css，优化css结构，利于网页加载和渲染
// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/pages/index.js',
    test: './src/pages/test.js',
    articlePhysical: './src/pages/articlePhysical.js',
    articleSeason: './src/pages/articleSeason.js',
    articleAvoid: './src/pages/articleAvoid.js',
    articleNutrition: './src/pages/articleNutrition.js',
    minihome: './src/pages/minihome.js',
    vegetableCollocation: './src/pages/vegetableCollocation.js',
    myInfo: './src/pages/usercenter/myInfo.js',
    myCollection: './src/pages/usercenter/myCollection.js',
    myRemark: './src/pages/usercenter/myRemark.js',
    myNews: './src/pages/usercenter/myNews.js',
    myPost: './src/pages/usercenter/myPost.js',
    shareRecommend: './src/pages/share/recommend.js',
    shareArticle: './src/pages/share/article.js',
    shareVideo: './src/pages/share/video.js',
    shareAudio: './src/pages/share/audio.js',
    shareDetail: './src/pages/share/shareDetail.js',
    editSharing: './src/pages/share/edit.js',
    // admin: './src/pages/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    // rules
    rules: [
      // {test:/\.js?$/,loader:['jsx-loader','babel-loader'],include:/src/},
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src/pages/css/'),
        use: ['style-loader', 'css-loader']
      },
      // 处理css里的图片
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, './src/pages/images/'),
        use: [
          {
            loader: 'url-loader',
            // options: {
            //   name: '[name].[ext]',
            //   outputPath: 'images/'
            // }
          }
        ]
      },
      //处理font字体文件
      {
        test: /\.(eot|svg|ttf|woff)$/,
        include: path.resolve(__dirname, './src/pages/font/'),
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
            // babel/preset-env
          }
        }
      }
      // {
      //   test: /\.less/,
      //   use: ['style-loader','css-loader','less-loader']
      // }
    ]
  },
  // 控制webpack-dev-serer
  // devServer: {
  //   port: 8080,
  //   //自动打开浏览器
  //   open: true,
  //   // 开启热更新
  //   // hot: true
  // },
  plugins: [
    // new ExtractTextPlugin('styles.css'),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   },
    //   canPrint: true
    // }),
    new HtmlWebpackPlugin({
      title: '首页',
      filename:'index.html',
      template: './src/index.html',
      chunks: ["index"],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: 'mini 首页',
      filename: 'minihome.html',
      template: './src/index.html',
      chunks: ["minihome"],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '测试',
      filename:'test.html',
      template: './src/index.html',
      chunks: ["test"],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '什么样的体质吃什么样的食材',
      filename: 'articlePhysical.html',
      template: './src/index.html',
      chunks: ['articlePhysical'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '春夏秋冬四季食谱',
      filename: 'articleSeason.html',
      template: './src/index.html',
      chunks: ['articleSeason'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '食品搭配禁忌',
      filename: 'articleAvoid.html',
      template: './src/index.html',
      chunks: ['articleAvoid'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '蔬菜营养成分',
      filename: 'articleNutrition.html',
      template: './src/index.html',
      chunks: ['articleNutrition'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '食材搭配',
      filename: 'vegetableCollocation.html',
      template: './src/index.html',
      chunks: ["vegetableCollocation"],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '用户中心-个人资料',
      filename: 'usercenter/myInfo.html',
      template: './src/index.html',
      chunks: ['myInfo'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '用户中心-我的收藏',
      filename: 'usercenter/myCollection.html',
      template: './src/index.html',
      chunks: ['myCollection'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '用户中心-我的评论',
      filename: 'usercenter/myRemark.html',
      template: './src/index.html',
      chunks: ['myRemark'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '用户中心-我的消息',
      filename: 'usercenter/myNews.html',
      template: './src/index.html',
      chunks: ['myNews'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '用户中心-我的帖子',
      filename: 'usercenter/myPost.html',
      template: './src/index.html',
      chunks: ['myPost'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '分享广场-推荐',
      filename: 'share/recommend.html',
      template: './src/index.html',
      chunks: ['shareRecommend'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '分享广场-文章',
      filename: 'share/article.html',
      template: './src/index.html',
      chunks: ['shareArticle'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '分享广场-视频',
      filename: 'share/video.html',
      template: './src/index.html',
      chunks: ['shareVideo'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '分享广场-音频',
      filename: 'share/audio.html',
      template: './src/index.html',
      chunks: ['shareAudio'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '分享广场-详情',
      filename: 'share/shareDetail.html',
      template: './src/index.html',
      chunks: ['shareDetail'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    new HtmlWebpackPlugin({
      title: '写动态',
      filename: 'share/edit.html',
      template: './src/index.html',
      chunks: ['editSharing'],
      minify:{
        // 合并多余的空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true, 
        // 移除 属性上的双引号
        removeAttributeQuotes: true 
      }
    }),
    // <-- 减少 React 大小的关键
    new webpack.DefinePlugin({ 
		  'process.env': {
			'NODE_ENV': JSON.stringify('production')
		  }
    }),
    
    // new HtmlWebpackPlugin({
    //   title: '管理员端界面',
    //   filename: 'admin.html',
    //   template: './src/index.html',
    //   chunks: ['admin']
    // }),
    // 数组形式提供文件(需要清除缓存的文件夹)
    // new CleanWebpackPlugin(),
    // 热更新
    // new webpack.HotModuleReplacementPlugin()
  ]
}