import { postSchema, commentSchema } from "../../shared/validation/schema";
import { z } from "zod";
import { validate } from "./validate";

const BASE_URL = "http://localhost:3000";

export async function getPosts() {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) 
        throw new Error("Failed to fetch posts");

    const json = await response.json();
    validate(z.array(postSchema), json.data, "Invalid posts.");

    return json;
}

export async function getPostById(postId) {
    const params1 = new URLSearchParams();
    params1.append("post_id", postId);
    const response = await fetch(`${BASE_URL}/posts?post_id=${postId}`);

    if (!response.ok)
        throw new Error("Failed to fetch post.");
    
    const json = await response.json();
    validate(postSchema, json.data[0], "Invalid post.");

    return json;
}

export async function getCommentsByPostId(postId) {
    const response = await fetch(`${BASE_URL}/comments?post_id=${postId}`);

    if (!response.ok)
        throw new Error("Failed to fetch comments");

    const json = await response.json();
    validate(z.array(commentSchema), json.data, "Invalid comments.")

    return json;
}

export async function createComment(data) {
    const response = await fetch(`${BASE_URL}/comment`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) 
        throw new Error("Failed to create comment.");

    return response.json();
}