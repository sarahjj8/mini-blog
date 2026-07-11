import { z } from "zod"

export const idSchema = z.coerce.number().int().positive();

const sqliteDateTime = z.string().regex(
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  "Invalid date."
);

export const postSchema = z.object({
    id: idSchema,
    title: z.string().trim()
        .min(1, "Title cannot be empty")
        .max(150, "Title must be at most 150 characters."), 
    description: z
        .string()
        .trim()
        .min(1, "Description must be at least 1 characters.")
        .max(5000, "Description must be at most 5000 characters."),
        image: z.string().trim().refine(
        value =>
            value === "" ||
            value.startsWith("/images/") ||
            z.url().safeParse(value).success,
        {
            message: "Image must be a valid URL or image path.",
        }
    ),
    category_id: idSchema, 
    created_at: sqliteDateTime
});

export const createPostSchema = postSchema.omit({
    id: true,
    created_at: true
});

export const commentSchema = z.object({
    id: idSchema,
    post_id: z.coerce.number({
        message: "Invalid post."
    }),
    mail: z.email({
        message: "Please enter a valid email address.",
    }).toLowerCase(), 
    description: z.string().trim()
        .min(1, "Comment cannot be empty.")
        .max(300, "Comment cannot exceed 300 characters."), 
    approved: z.union([
        z.boolean(),
        z.literal(0),
        z.literal(1),
        z.literal("0"),
        z.literal("1"),
        z.literal("true"),
        z.literal("false")
    ])
    .transform(value => {
        if (value === true || value === "true" || value === 1 || value === "1")
            return 1;

        return 0;
    })
    .default(0), 
    created_at: sqliteDateTime
});

export const createCommentSchema = commentSchema.omit({
    id: true,
    created_at: true
});


export const categorySchema = z.object({
    id: idSchema,
    name: z.string().trim()
        .min(1, "Category cannot be empty.")
        .max(50, "Category name must be at most 50 characters.")
});

export const createCategorySchema = categorySchema.omit({
    id: true
});
