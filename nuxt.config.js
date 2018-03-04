const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
 	performance: {
    prefetch: false,
  },
   
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    script: [
      { src: '../lib/jquery.min.js' },
      { src: '../lib/wangEditor.min.js'}
    ]
  },
  
  router: {
    extendRoutes (routes) {
      routes.push({
        name: 'bookDetail',
        path: '/mView/bookDetail/:bookId?',
        component: resolve(__dirname, 'pages/mView/bookDetail.vue')
      })
    }
  }
}
