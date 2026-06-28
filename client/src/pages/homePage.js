import { getPosts } from "../api.js";
import { createPostCard } from "../components/postCrad.js";

export async function HomePage() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <main>
            <section class="hero">
                <h1>Simple Blog</h1>
                <p>Thoughts, stories and ideas.</p>
            </section>

            <section id="posts" class="posts-grid">
                <p>Loading posts...</p>
            </section>
        </main>
    `;

    const postsContainer = document.querySelector("#posts");

    try {
        const result = await getPosts();
        postsContainer.innerHTML = result.data
            .map(createPostCard)
            .join("");
    }
    catch (error) {
        postsContainer.innerHTML = `
            <p>Failed to load posts.</p>
        `;
        console.error(error);
    }
}