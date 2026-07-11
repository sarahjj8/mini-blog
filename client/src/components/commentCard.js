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

export function commentCardElement(comment) {
    const card = document.createElement("div");
    card.className = "comment-card";

    const mail = document.createElement("strong");
    mail.className = "comment-mail";
    mail.textContent = comment.mail;

    const text = document.createElement("p");
    text.className = "comment-text";
    text.textContent = comment.description;

    const date = document.createElement("span");
    date.className = "comment-date";
    date.textContent = new Date(comment.created_at).toLocaleString();

    card.appendChild(mail);
    card.appendChild(text);
    card.appendChild(date);

    return card;
}