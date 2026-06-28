export const seedPosts = [
  {
    title: "Getting Started with Node.js",
    description: "Node.js is a powerful runtime for backend development.",
    image: "/images/node.png",
    category_id: 1,
  },
  {
    title: "Understanding REST APIs",
    description: "REST APIs allow applications to communicate over HTTP.",
    image: "/images/api.png",
    category_id: 2,
  },
  {
    title: "Healthy Daily Routine",
    description: "Simple habits that improve your lifestyle.",
    image: "/images/life.jpg",
    category_id: 3,
  },
];

export const seedCategories = [
  { name: "Technology" },
  { name: "Programming" },
  { name: "Lifestyle" },
  { name: "Travel" },
];

export const seedComments = [
  {
    mail: "user1@example.com",
    post_id: 1,
    description: "Great article!",
    approved: 1,
  },
  {
    mail: "user2@example.com",
    post_id: 1,
    description: "Very helpful, thanks.",
    approved: 0,
  },
  {
    mail: "reader@test.com",
    post_id: 2,
    description: "Nice explanation of REST.",
    approved: 1,
  },
];