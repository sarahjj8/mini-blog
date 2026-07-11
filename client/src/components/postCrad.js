const API_URL = "http://localhost:3000";

export function createPostCard(post){
    return `<a href="/post.html?id=${post.id}" class="post-link">
                <div class="card">
                    <img class="card-image" src="${API_URL}/${post.image}" alt="${post.title}">
                    <div class="card-content">
                        <h4><b>${post.title}</b></h4> 
                        <p>${post.description.slice(0, 120)}...</p>
                        <span class="post-date">${new Date(post.created_at).toLocaleString()}</span> 
                    </div>
                </div>
            </a>`;
}