import "./style.css";
import { postPage } from "./pages/postPage";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
    document.querySelector("#app").innerHTML = `
        <h2>Invalid Post</h2>
    `;
} else {
    postPage(postId);
}