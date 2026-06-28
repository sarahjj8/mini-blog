import { getCommentsByPostId, getPostById } from "../api";
import { commentCard } from "../components/commentCard";
import { commentForm } from "../components/commentForm";

const API_URL = "http://localhost:3000";

export async function postPage(postId) {
    const app = document.querySelector("#app");
    app.innerHTML = `<p>Loading ...</p>`;
    try{
        const result = await getPostById(postId);
        const post = result.data[0];
        app.innerHTML = `
            <main class="post-page">
                <a
                    href="/"
                    class="back-button">
                    ← Back
                </a>
                <img
                    class="post-image"
                    src="${API_URL}${post.image}"
                >
                <h1>
                    ${post.title}
                </h1>
                <p class="description">
                    ${post.description}
                </p>
                <hr>
                <form id="comment-form">
                </form>
                <hr>
                <section id="comments">
                </section>
            </main>
        `; 

        showComments(postId);

        // const comments = await getCommentsByPostId(postId);    
        // const commentsContainer = document.querySelector("#comments");
        // if (!comments.data.length) {
        //     commentsContainer.innerHTML = `
        //         <p>No comments yet.</p>
        //     `
        // } else{
        //     commentsContainer.innerHTML = comments.data.map(commentCard).join("");
        // }
    } catch (error) {
        console.log(error);

        app.innerHTML = `
            <h2>Post not found.</h2>
        `;
    }
    commentForm(postId);
}

export async function showComments(postId) {
    const comments = await getCommentsByPostId(postId);    
    const commentsContainer = document.querySelector("#comments");
    if (!comments.data.length) {
        commentsContainer.innerHTML = `
            <p>No comments yet.</p>
        `
    } else{
        commentsContainer.innerHTML = comments.data.map(commentCard).join("");
    }   
}