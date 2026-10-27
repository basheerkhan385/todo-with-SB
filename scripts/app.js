const form = document.querySelector("#form");

const input = document.querySelector("#input");

const todosList = document.querySelector("#todos-list");

const error = document.querySelector("#error");

const logoutButton = document.querySelector("#logout");


const supabaseUrl = "https://ljhjzunkwqdwdflczygf.supabase.co";

const supabaseKey = "sb_publishable_EGM-Tbmrn-0-013kYs5hOA_Tv6nY_Io";


const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// Current logged-in user
let currentUser = null;


// ========================================
// CHECK USER
// ========================================

const checkUser = async () => {
    const response = await supabaseClient.auth.getUser();

    if (response.error || !response.data.user) {
        window.location.href = "signin.html";
        return false;
    }

    currentUser = response.data.user;

    return true;
};


// ========================================
// SHOW TODOS
// ========================================

const showTodo = async () => {

    const response = await supabaseClient

        .from("todos")

        .select("*")

        .eq("user_id", currentUser.id);


    if (response.error) {

        error.textContent = response.error.message;

        error.style.color = "red";

        return;
    }


    const todoTask = response.data;


    todosList.innerHTML = "";


    todoTask.forEach((todo) => {

        const li = document.createElement("li");

        li.classList.add("todo-item");


        const span = document.createElement("span");

        span.textContent = todo.Description;


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        deleteButton.addEventListener("click", () => {

            deleteTodo(todo.id);

        });


        li.append(span, deleteButton);

        todosList.appendChild(li);

    });

};


// ========================================
// ADD TODO
// ========================================

const addTodo = async (event) => {

    event.preventDefault();


    const todoText = input.value.trim();


    if (todoText === "") {

        error.textContent = "Please enter a todo";

        error.style.color = "red";

        return;
    }


    const response = await supabaseClient

        .from("todos")

        .insert({

            Description: todoText,

            Compleated: false,

            user_id: currentUser.id

        });


    if (response.error) {

        error.textContent = response.error.message;

        error.style.color = "red";

        return;
    }


    error.textContent = "";

    input.value = "";


    showTodo();

};


// ========================================
// DELETE TODO
// ========================================

const deleteTodo = async (id) => {


    const response = await supabaseClient

        .from("todos")

        .delete()

        .eq("id", id)

        .eq("user_id", currentUser.id);


    if (response.error) {

        error.textContent = response.error.message;

        error.style.color = "red";

        return;
    }


    showTodo();

};


// ========================================
// LOGOUT
// ========================================

logoutButton.addEventListener("click", async () => {


    const response = await supabaseClient.auth.signOut();


    if (response.error) {

        error.textContent = response.error.message;

        error.style.color = "red";

        return;
    }


    currentUser = null;


    window.location.href = "../index.html";

});


// ========================================
// START APP
// ========================================

const startApp = async () => {

    const isLoggedIn = await checkUser();

    if (!isLoggedIn) {
        return;
    }

    showTodo();
};

form.addEventListener("submit", addTodo);

startApp();