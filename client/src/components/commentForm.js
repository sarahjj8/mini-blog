import { createComment } from "../api";
import { commentCard, commentCardElement } from "./commentCard";
import { showComments } from "../pages/postPage";
import { createCommentSchema } from "../../../shared/validation/schema";
import { showErrors, clearErrors } from "../error";

export function commentForm(postId) {
    const form = document.querySelector("#comment-form");
    form.noValidate = true;
    
    form.innerHTML = `
        <h4>Leave a comment</h4>
        <input type="email" name="mail" placeholder="Enter your email"
        />
        <textarea name="description" placeholder="Your comment ..."></textarea>
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

        clearErrors();

        const validation = createCommentSchema.safeParse(newComment);
        console.log(validation);
        if (!validation.success) {
            console.log("validation.error:", validation.error);
            showErrors(validation.error);
            return;
        }

        const submitButton = form.querySelector("button");
        submitButton.disabled = true;

        try{
            const response = await createComment(newComment);
            addNewCommentCard(response.data);
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

function addNewCommentCard(newComment) {
    const commentsContainer = document.querySelector("#comments");
    const emptyState = commentsContainer.querySelector("#noComments");

    if (emptyState) {
        emptyState.remove();
    }

    commentsContainer.appendChild(commentCardElement(newComment));
}