const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Sending...
    `;

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        const result = await response.json();

        if (result.success) {
            status.style.display = "block";
            status.classList.remove("error");
            status.textContent = "✅ Message sent successfully!";
            form.reset();
        } else {
            status.style.display = "block";
            status.classList.add("error");
            status.textContent = "❌ Something went wrong.";
        }
    } catch (error) {
        status.style.display = "block";
        status.classList.add("error");
        status.textContent = "❌ Network error. Please try again.";
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        Send Message
        <i class="fa-solid fa-paper-plane"></i>
    `;
});