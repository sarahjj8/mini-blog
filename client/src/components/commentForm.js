import { createComment } from "../api";
import { commentCard } from "./commentCard";
import { showComments } from "../pages/postPage";

export function commentForm(postId) {
    const form = document.querySelector("#comment-form");
    form.innerHTML = `
        <h4>Leave a comment</h4>
        <input type="email" name="mail" placeholder="Enter your email" required
        />
        <textarea name="description" placeholder="Your comment ..." required>
        </textarea>
        <button type="submit">Submit</button>
    `;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const newComment = {
            post_id: Number(postId),
            mail: formData.get("mail"),
            description: formData.get("description")
        };

        const submitButton = form.querySelector("button");
        submitButton.disabled = true;

        try{
            const response = await createComment(newComment);
            showComments(postId);
            // addNewCommentCard(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to send comment");
        } finally {
            form.reset();
            submitButton.disabled = false;
        }
    });

    return form;
}

// function addNewCommentCard(newComment) {
//     const commentsContainer = document.querySelector("#comments");

//     // const commentsContainer = document.getElementById("comments");
//     // const node = document.createElement("div");
//     // node.setAttribute("calss", "comment-card");
//     // node.innerHTML = `
//     //     <strong class="comment-mail">${newComment.mail}</strong>
//     //     <p class="comment-text">${newComment.description}</p>
//     //     <span class="comment-date">
//     //             ${new Date(newComment.created_at).toLocaleString()}
//     //     </span>
//     // `

//     const emptyState = commentsContainer.querySelector("p");

//     if (emptyState) {
//         emptyState.remove();
//     }

//     commentsContainer.appendChild(commentCard(newComment));
// }