export default (req, res) => {
  res.status(200).json([
    {
      id: 1,
      title: "sourcing products",
      icon: function () {
        return (
          <Image
            color="primary"
            fontSize="large"
            style={{
              background: "white",
              padding: "5px",
              borderRadius: "4px",
            }}
          />
        );
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum quia. Voluptates facilis praesentium nam fugiat, corrupti, nobis vero esse laudantium sit rem facere accusamus reprehenderit ipsam corporis deserunt alias",
    },
    {
      id: 2,
      title: "fulfilment",
      icon: function () {
        return (
          <SentimentVerySatisfied
            color="primary"
            fontSize="large"
            style={{
              background: "white",
              padding: "5px",
              borderRadius: "4px",
            }}
          />
        );
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum quia. Voluptates facilis praesentium nam fugiat, corrupti, nobis vero esse laudantium sit rem facere accusamus reprehenderit ipsam corporis deserunt alias",
    },
    {
      id: 3,
      title: "business operations",
      icon: function () {
        return (
          <BusinessCenter
            color="primary"
            fontSize="large"
            style={{
              background: "white",
              padding: "5px",
              borderRadius: "4px",
            }}
          />
        );
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum quia. Voluptates facilis praesentium nam fugiat, corrupti, nobis vero esse laudantium sit rem facere accusamus reprehenderit ipsam corporis deserunt alias",
    },
    {
      id: 4,
      title: "store design & optimisation",
      icon: function () {
        return (
          <Storage
            color="primary"
            fontSize="large"
            style={{
              background: "white",
              padding: "5px",
              borderRadius: "4px",
            }}
          />
        );
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum quia. Voluptates facilis praesentium nam fugiat, corrupti, nobis vero esse laudantium sit rem facere accusamus reprehenderit ipsam corporis deserunt alias",
    },
  ]);
};
