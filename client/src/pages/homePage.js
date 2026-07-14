import { getPosts } from "../api.js";
import { createPostCard } from "../components/postCrad.js";
import { setupCategoryModel } from "../components/categoryModal.js";

export async function HomePage() {
    const app = document.querySelector("#app");

    // app.innerHTML = `
    //     <main>
    //         <section class="hero">
    //             <h1>Simple Blog</h1>
    //             <p>Thoughts, stories and ideas.</p>
    //             <div class="hero-actions">
    //                 <button id="new-post-btn">+ New Post</button>
    //                 <button id="new-category-btn">+ New Category</button>
    //             </div>
    //         </section>

    //         <section id="posts" class="posts-grid">
    //             <p>Loading posts...</p>
    //         </section>

    //         <dialog id="category-dialog">
    //             <form id="category-form">
    //                 <h2>New Category</h2>
    //                 <input type="text" name="name" placeholder="Category name">
    //                 <div class="dialog-actions">
    //                     <button id="cancel-category-button" type="button">
    //                         Cancel
    //                     </button>

    //                     <button id="submit-category-button" type="submit">
    //                         Create
    //                     </button>
    //                 </div>
    //             </form>
    //         </dialog>

    //         <dialog id="post-dialog">
    //             <form id="post-form">
    //                 <h2>New Post</h2>
    //                 <div class="post-form-group">
    //                     <label for="post-title">Title</label>

    //                     <input type="text" name="name" placeholder="Post name">
    //                 </div>
    //                 <div class="dialog-actions">
    //                     <button id="cancel-post-button" type="button">
    //                         Cancel
    //                     </button>

    //                     <button id="submit-post-button" type="submit">
    //                         Create
    //                     </button>
    //                 </div>
    //             </form>
    //         </dialog>
                    
    //     </main>
    // `;

    const newCategoryButton = document.querySelector("#new-category-btn");
    newCategoryButton.addEventListener("click", () => {
        setupCategoryModel().open();
    })

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