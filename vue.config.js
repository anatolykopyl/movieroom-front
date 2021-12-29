module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @use 'sass:math';
          @import '~@/scss/_variables.scss';
        `,
      },
    },
  },
};
