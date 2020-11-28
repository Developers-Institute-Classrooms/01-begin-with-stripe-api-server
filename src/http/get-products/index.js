const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const response = {
  headers: {
    "content-type": "application/json; charset=utf8",
    "cache-control":
      "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  },
};

exports.handler = async function products(req) {
  if (!STRIPE_SECRET_KEY) {
    return {
      ...response,
      statusCode: 500,
      body: JSON.stringify({
        errors: [
          {
            name: "Missing Stripe Key",
          },
        ],
      }),
    };
  }
  const products = await stripe.products.list({
    limit: 3,
  });

  return {
    ...response,
    statusCode: 201,
    body: JSON.stringify({
      products,
    }),
  };
};
