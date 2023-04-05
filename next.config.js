module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fastly.picsum.photos',
          port: '',
          pathname: '/id/**',
        },
      ],
    },
  }