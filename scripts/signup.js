const signupForm = document.querySelector("#signup-form");

const emailInput = document.querySelector("#email");

const passwordInput = document.querySelector("#password");

const error = document.querySelector("#error");


const supabaseUrl = "https://ljhjzunkwqdwdflczygf.supabase.co";

const supabaseKey = "sb_publishable_EGM-Tbmrn-0-013kYs5hOA_Tv6nY_Io";


const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = emailInput.value.trim();

    const password = passwordInput.value;


    if (email === "" || password === "") {

        error.textContent = "Please enter email and password";

        error.style.color = "red";

        return;
    }


    if (password.length < 6) {

        error.textContent = "Password must be at least 6 characters";

        error.style.color = "red";

        return;
    }


    const response = await supabaseClient.auth.signUp({

        email: email,

        password: password

    });


    if (response.error) {

        error.textContent = response.error.message;

        error.style.color = "red";

        return;
    }


    error.textContent = "Account created successfully!";

    error.style.color = "green";


    setTimeout(() => {

        window.location.href = "signin.html";

    }, 1000);

});