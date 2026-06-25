import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedPosts = [
  {
    title: "Getting Started with Node.js",
    description: "Node.js is a powerful runtime for backend development.",
    image: fs.readFileSync(path.join(__dirname, "../database/seeds/node.png")),
    category_id: 1,
  },
  {
    title: "Understanding REST APIs",
    description: "REST APIs allow applications to communicate over HTTP.",
    image: fs.readFileSync(path.join(__dirname, "../database/seeds/api.png")),
    category_id: 2,
  },
  {
    title: "Healthy Daily Routine",
    description: "Simple habits that improve your lifestyle.",
    image: fs.readFileSync(path.join(__dirname, "../database/seeds/life.jpg")),
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