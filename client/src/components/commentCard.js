export function commentCard(comment) {
    return `
        <div class="comment-card">
            <strong class="comment-mail">${comment.mail}</strong>
            <p class="comment-text">${comment.description}</p>
            <span class="comment-date">
                    ${new Date(comment.created_at).toLocaleString()}
            </span>
        </div>
    `;
}