const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});
module.exports = {
  entry: "./src/index.js",
  output: { // NEW
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  }, // NEW Ends
  plugins: [htmlPlugin],
  devServer: {
    historyApiFallback: true
 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
       },
       {
          test: /\.(png|j?g|svg|gif)?$/,
          use: 'file-loader'
       }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },


};