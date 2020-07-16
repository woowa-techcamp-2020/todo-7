module.exports = {
  presets: [
    '@babel/preset-env',
    {
      useBuitIns: 'usage',
      corejs: "3",
      targets: "> 1%, not dead",
      modules: false
    }
  ]
}