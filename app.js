// Selectors
const addForm = document.querySelector(".add");
const searchForm = document.querySelector(".search");
const todoUl = document.querySelector(".todo-list");

// get todos
const getTodos = () => {
    let todos;
  
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    todos.forEach((todo) => {
      generateTodo(todo);
    });
};

// load todos from local storage
document.addEventListener("DOMContentLoaded", getTodos);

// generateTodo function
const generateTodo = (value) => {
    let todos = `
        <div class="todo">
            <div>
                <i class="fas fa-check complete"></i>
                <li class="text">${value}</li>
            </div>
            <i class="fas fa-trash delete"></i>
        </div>
    `;

    todoUl.innerHTML += todos;
}

// add todo
addForm.addEventListener("submit", e => {
    e.preventDefault();

    // input value
    const inputValue = addForm.add.value.trim();
    
    // generate todo template
    if(inputValue){
        generateTodo(inputValue);
    }

    saveToLocalStorage(inputValue);

    // clear input value
    addForm.reset();
})

todoUl.addEventListener("click", e => {
    if(e.target.classList[2] === "delete"){
        e.target.parentElement.style.opacity = "0";
        setTimeout(() => {
            e.target.parentElement.remove();
            removeFromLocalStorage(e.target.parentElement);
          }, 1000);
    }

    if(e.target.classList[2] === "complete"){
        e.target.classList.toggle("completed");
        e.target.parentElement.classList.toggle("done");
    }
})

// // filter todos
const filterTodos = (inputValue) => {
    Array.from(todoUl.children)
    .filter(todo => {
        return !todo.innerText.toLowerCase().includes(inputValue);
    })
    .forEach(todo => todo.classList.add("filtered"));

    Array.from(todoUl.children)
    .filter(todo => {
        return todo.innerText.toLowerCase().includes(inputValue);
    })
    .forEach(todo => todo.classList.remove("filtered"));
}

searchForm.addEventListener("keyup", (e) => {
    e.preventDefault();

    const inputValue = searchForm.filter.value.toLowerCase().trim();

    filterTodos(inputValue);
})

// save to local storage
const saveToLocalStorage = (todo) => {
    let todos;
  
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    todos.push(todo);
  
    localStorage.setItem("todos", JSON.stringify(todos));
};

// removeFromLocalStorage function
const removeFromLocalStorage = (item) => {
    let todos;
  
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    todos.pop(item);
  
    localStorage.setItem("todos", JSON.stringify(todos));
};