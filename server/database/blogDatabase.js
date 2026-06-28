import fs from "fs";
import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";
import {seedPosts, seedCategories, seedComments} from "../data/blogs.js";
import { Result } from "postcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "..", "data", "blogs.sqlite");

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT
  );
  
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    category_id INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    mail TEXT NOT NULL, 
    post_id INTEGER, 
    description TEXT NOT NULL,
    approved INTEGER NOT NULL DEFAULT 0, 
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    CHECK (approved IN (0, 1))
  );
`);

const statements = {
  countPosts: database.prepare("SELECT COUNT(*) AS count FROM posts"),
  getPosts: database.prepare(`
    SELECT id, title, description, image, category_id, created_at
    FROM posts
    WHERE (? IS NULL OR id = ?)
        AND (? IS NULL OR category_id = ?)
    ORDER BY id ASC
  `),
  getComments: database.prepare(`
    SELECT id, mail, post_id, description, approved, created_at
    FROM comments
    WHERE (? IS NULL OR post_id = ?)
  `),
  getCategories: database.prepare(`
    SELECT id, name
    FROM categories
  `),
  getPostById: database.prepare(`
    SELECT id, title, description, image, category_id, created_at
    FROM posts
    WHERE id = ?
  `),
  getCommentById: database.prepare(`
    SELECT id, mail, post_id, description, approved, created_at
    FROM comments
    WHERE id = ?
  `),
  getCategoryById: database.prepare(`
    SELECT id, name
    FROM categories
    WHERE id = ?
  `),
  createPost: database.prepare(`
    INSERT INTO posts (title, description, image, category_id)
    VALUES (?, ?, ?, ?)
  `),
  createComment: database.prepare(`
    INSERT INTO comments (mail, post_id, description, approved)
    VALUES (?, ?, ?, ?)
  `),
  createCategory: database.prepare(`
    INSERT INTO categories (name)
    VALUES (?)
  `), 
};

function seedDatabase() {
  const countRow = statements.countPosts.get();

  if (countRow.count > 0) {
    return;
  }

  database.exec("BEGIN");

  try {
    seedCategories.forEach((category) => {
      statements.createCategory.run(
        category.name
      );
    });
    seedPosts.forEach((post) => {
      statements.createPost.run(
        post.title,
        post.description,
        post.image,
        post.category_id
      );
    });
    seedComments.forEach((comment) => {
      statements.createComment.run(
        comment.mail, 
        comment.post_id, 
        comment.description,
        comment.approved
      );
    });
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

function mapCategory(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name
  };
}

function mapComment(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    mail: row.mail, 
    post_id: row.post_id, 
    description: row.description, 
    approved: Boolean(row.approved),
    created_at: row.created_at
  };
}

function mapPost(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    category_id: row.category_id,
    created_at: row.created_at
  };
}

seedDatabase();

export function getComments(params = {}) {
  const post_id = params.post_id === undefined ? null : Number(params.post_id);
  return statements.getComments.all(post_id, post_id).map(mapComment);
}

export function getPosts(params = {}) {
  const post_id = params.post_id === undefined ? null : Number(params.post_id);
  const category_id = params.category_id === undefined ? null : Number(params.category_id);
  return statements.getPosts.all(post_id, post_id, category_id, category_id).map(mapPost);
}

export function getCategories() {
  return statements.getCategories.all().map(mapCategory);
}

export function getCategoryById(params) {
  return mapCategory(statements.getCategoryById.get(params.id));
}

export function getPostById(params) {
  return mapPost(statements.getPostById.get(params.id));
}

export function getCommentById(params) {
  return mapComment(statements.getCommentById.get(params.id));
}

export function createPost(params) {
  const result = statements.createPost.run(
    params.title.trim(),
    params.description.trim(),
    params.image.trim(),
    Number(params.category_id)
  );
  return getPostById({id : Number(result.lastInsertRowid)});
}

export function createCategory(params) {
  const result = statements.createCategory.run(
    params.name.trim()
  );
  return getCategoryById({id : Number(result.lastInsertRowid)});
}

export function createComment(params) {
  const result = statements.createComment.run(
    params.mail.trim(),
    Number(params.post_id),
    params.description.trim(),
    Number(params.approved)
  );
  return getCommentById({id : Number(result.lastInsertRowid)});
}