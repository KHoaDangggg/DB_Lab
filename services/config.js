const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "db4free.net",
      user: "dblabhust",
      password: "soictlab",
      database: "food_order_web",
      connectTimeout: 60000
    },
    listPerPage: 12,
  };
  module.exports = config;