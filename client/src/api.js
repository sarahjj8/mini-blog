const BASE_URL = "http://localhost:3000";

export async function getPosts() {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) 
        throw new Error("Failed to fetch posts");

    return response.json();
}

export async function getPostById(postId) {
    const params1 = new URLSearchParams();
    params1.append("post_id", postId);
    const response = await fetch(`${BASE_URL}/posts?post_id=${postId}`);

    if (!response.ok)
        throw new Error("Failed to fetch post.");
    
    return response.json();
}

export async function getCommentsByPostId(postId) {
    const response = await fetch(`${BASE_URL}/comments?post_id=${postId}`);

    if (!response.ok)
        throw new Error("Failed to fetch comments");

    return response.json();
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