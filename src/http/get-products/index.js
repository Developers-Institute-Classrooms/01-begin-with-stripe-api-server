const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.handler = async function products(req) {
  const products = await stripe.products.list({
    limit: 3,
  });

  return {
    statusCode: 201,
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify({
      products,
    }),
  };
};
