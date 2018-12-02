module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-faker`,
      options: {
        schema: {
          commerce: [`productName`, `price`, `department`],
          random: [`number`], // price in cents
          lorem: [`sentence`], // description
        },
        count: 10000,
        type: `Product`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [`Access-Control-Allow-Origin: *`],
        },
      },
    },
  ],
}
