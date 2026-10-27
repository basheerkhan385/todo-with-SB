const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const error = document.querySelector("#error");

const supabaseUrl = "https://ljhjzunkwqdwdflczygf.supabase.co";
const supabaseKey = "sb_publishable_EGM-Tbmrn-0-013kYs5hOA_Tv6nY_Io";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    error.textContent = "";

    if (email === "" || password === "") {
        error.textContent = "Please enter email and password";
        error.style.color = "red";
        return;
    }

    const response = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    console.log("Login response:", response);

    if (response.error) {
        console.log("Login error:", response.error);

        error.textContent = response.error.message;
        error.style.color = "red";

        return;
    }

    console.log("Login successful");
    console.log("User:", response.data.user);

    window.location.href = "todos.html";
});