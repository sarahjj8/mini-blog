import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";
import { getComments, getPosts, getCategories, createPost, getCategoryById, getPostById, createComment, createCategory } from "./database/blogDatabase.js";
import { validate, ValidationError } from "./utils/validate_blog.js";
import { idSchema, createPostSchema, createCommentSchema, createCategorySchema } from "../shared/validation/schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const APP_VERSION = "0.1.0-practice";

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  // TODO: Read this response header in the browser with response.headers.get().
  res.set("X-App-Version", APP_VERSION);
  next();
});

app.use((req, res, next) => {
  // TODO: Implement 406 Not Acceptable later.
  // Hint: inspect req.get("Accept") and decide whether JSON is acceptable.
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running.",
  });
});

app.get("/comments", (req, res) => {
  try{
    let {post_id = undefined} = req.query;
    if (post_id !== undefined)
      post_id = validate(idSchema, post_id);
    const data = getComments({
      post_id: post_id
    });
    res.status(200).json({
      status: "ok",
      data: data
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({
        status: "error",
        errors: err.errors,
      });
    }
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/categories", (req, res) => {
  try{
    const data = getCategories();
    res.status(200).json({
      status: "ok",
      data: data
    });
  } catch (err) {
      res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/posts", (req, res) => {
  try{
    let {post_id = undefined, category_id = undefined} = req.query;
    if (post_id !== undefined)
      post_id = validate(idSchema, post_id);
    if (category_id !== undefined)
      category_id = validate(idSchema, category_id);
    const data = getPosts({
      post_id: post_id,
      category_id: category_id
    });
    res.status(200).json({
      status: "ok",
      data: data
    });
  } catch (err) {
      res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.post("/post", (req, res) => {
  try {
    const data = validate(createPostSchema, req.body);

    const category = getCategoryById({
      id: data.category_id,
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "category not found",
      });
    }

    const result = createPost(data);

    return res.status(201).json({
      status: "ok",
      data: result,
    });

  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({
        status: "error",
        errors: err.errors,
      });
    }

    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.post("/category", (req, res) => {
  try {
    const data = validate(createCategorySchema, req.body);
    const result = createCategory(data);

    return res.status(201).json({
      status: "ok",
      data: result,
    });

  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.post("/comment", (req, res) => {
  try {
    const data = validate(createCommentSchema, req.body);

    const post = getPostById({
      id: data.post_id,
    });

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "post not found",
      });
    }

    const result = createComment(data);

    return res.status(201).json({
      status: "ok",
      data: result,
    });

  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "This route does not exist yet.",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Fetch HTTP Practice Lab API is running at http://localhost:${PORT}`);
});