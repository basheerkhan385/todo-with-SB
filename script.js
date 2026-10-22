const form = document.querySelector("#form");
const input = document.querySelector("#input");
const todosList = document.querySelector("#todos-list");
const error = document.querySelector("#error");

const supabaseUrl = "https://ljhjzunkwqdwdflczygf.supabase.co";
const supabaseKey = "sb_publishable_EGM-Tbmrn-0-013kYs5hOA_Tv6nY_Io";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const showTodo = async () => {
    const response = await supabaseClient
        .from("todos")
        .select("*");

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
            Compleated: false
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

const deleteTodo = async (id) => {
    const response = await supabaseClient
        .from("todos")
        .delete()
        .eq("id", id);

    if (response.error) {
        error.textContent = response.error.message;
        error.style.color = "red";
        return;
    }

    showTodo();
};

form.addEventListener("submit", addTodo);

showTodo();