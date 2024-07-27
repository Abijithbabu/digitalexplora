export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json([
      {
        id: 1,
        text: "It’s on the cutting-edge of this industry.",
        rating: 5,
        logo: "https://ecomworldconference.com/images/quotes/logo-shopify.svg",
      },
      {
        id: 2,
        text: "A new standard for digital events.",
        rating: 5,
        logo: "https://ecomworldconference.com/images/quotes/logo-snapchat.svg",
      },
      {
        id: 3,
        text: "It’s on the cutting-edge of this industry.",
        rating: 5,
        logo: "https://ecomworldconference.com/images/quotes/logo-shopify.svg",
      },
      {
        id: 4,
        text: "A new standard for digital events.",
        rating: 5,
        logo: "https://ecomworldconference.com/images/quotes/logo-snapchat.svg",
      },
    ]);
  } else {
    res.status(404).json({ message: "No data found" });
  }
};
