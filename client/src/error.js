export function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    console.log(document.querySelectorAll(".error-message"));
    document.querySelectorAll(".error-field").forEach(el => el.classList.remove("error-field"));
    console.log(document.querySelectorAll(".error-field"));
}

export function showErrors(error) {
  error.issues.forEach(issue => {
    const fieldName = issue.path[0];
    const input = document.querySelector(`[name="${fieldName}"]`);

    if (!input) return;

    input.classList.add("error-field");

    const message = document.createElement("div");
    message.className = "error-message";
    message.textContent = issue.message;

    input.parentNode.insertBefore(message, input.nextSibling);
  });
}