var taskInput = document.getElementById("task-input");
var btn = document.getElementById("btn");
var tasks = document.getElementById("tasks");
var loading = document.getElementById("loading");

btn.addEventListener("click", function(){
    console.log(taskInput.value);
    var task = {
        title: taskInput.value,
        apiKey: "65a817022681618c591c4b62"
    }
    addToDo(task)
})

async function addToDo(task){
var data = await fetch('https://todos.routemisr.com/api/v1/todos', {
    method: 'post',
    body: JSON.stringify(task),
    headers: {'content-type' : 'application/json'}
})
var result = await data.json()
if (result.message == 'success') {
    getAllToDos()
}
console.log(result);
}

async function getAllToDos(){
    loading.style.display='block'
    tasks.style.display='none'
var data = await fetch('https://todos.routemisr.com/api/v1/todos/65a817022681618c591c4b62')
var result = await data.json()
console.log(result);
if (result.message == 'success') {
    loading.style.display='none'
    tasks.style.display='block'
    displayData(result.todos)
}
}

getAllToDos()
function displayData(data){
    var cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="task ${data[i].completed?'bg-danger':''} my-3 px-4 py-2 d-flex justify-content-between w-75 m-auto shadow align-items-center p-2 rounded-3">
        <div>
            <p class="task-text m-0 p-0 ${data[i].completed ? 'text-decoration-line-through' : ''}">${data[i].title}</p>
        </div>
        <div>
            <i onclick="markComplated('${data[i]._id}')" class="fa-regular fa-circle-check ${data[i].completed?'d-none':''}"></i>
            <i onclick="deleteToDo('${data[i]._id}')" class="fa-solid fa-trash"></i>
        </div>
    </div>`
    }
    tasks.innerHTML = cartona;
}

async function deleteToDo(id){
    var data = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'delete',
        body: JSON.stringify({todoId: id}),
        headers: {'content-type' : 'application/json'}
    })
    var result = await data.json()
    if (result.message == 'success') {
        getAllToDos()
    }
    console.log(result);
}

async function markComplated(id){
    var data = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'put',
        body: JSON.stringify({todoId: id}),
        headers: {'content-type' : 'application/json'}
    })
    var result = await data.json()
    if (result.message == 'success') {
        getAllToDos()
    }
    console.log(result);
}