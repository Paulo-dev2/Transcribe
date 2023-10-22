/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.module.rules.push({
          test: /\.node$/,
          use: 'file-loader',
        });
      }
      return config;
    },
};
