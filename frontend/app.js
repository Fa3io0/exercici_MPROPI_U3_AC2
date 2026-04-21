import { validateLoginInput } from "../shared/loginValidation.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

function setMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const validationError = validateLoginInput(email, password);
  if (validationError) {
    setMessage(validationError, "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Login successful.", "success");
    } else {
      setMessage(data.error || "Login failed.", "error");
    }
  } catch (error) {
    setMessage("Unable to connect to server.", "error");
  }
});