// DS for todo
//  const todo ={
//  	 id :0,
//   title: "",
// 	 iscompleted : false

// }
//Utility
const pageReload = () => {
  window.location.reload()
}
const addBtn = document.querySelector('.add-btn')
const editBtn = document.querySelector('.edit-btn')
const toggleIcon = document.querySelector('.toggle-icon')

//Get todoDB from localstorage
const todoDb = 'db101'
const todoInstance = JSON.parse(localStorage.getItem(todoDb)) || []
//Todo: create function
const addtodo = () => {
  const todoInput = document.getElementById('todo-input')
  const title = todoInput.value
  console.log(title)

  const newTodo = {
    _id: todoInstance.length + 1,
    title: title,
    iscompleted: false,
  }
  const updatedTodoDB = [...todoInstance, newTodo]
  localStorage.setItem(todoDb, JSON.stringify(updatedTodoDB))
  pageReload()
}

//TODO Render Function

const renderTodoItems = () => {
  const todoListContainer = document.querySelector('#todo-list-container')
  const todoListItems = todoInstance
    .map(({ _id, title, iscompleted }) => {
      return `
<li class =${iscompleted && 'checked'}>
${title}
<span class="complete-icon" onClick = "toggleComplete(${_id})">✔</span>
<span class="edit-icon" onClick = "editMode(${_id})">✍</span>
<span class="close" onClick = "deleteTodo(${_id})">🚮</span>

`
    })
    .join('')

  todoListContainer.innerHTML = todoListItems
}
// class="--"
// Todo toggle complete
function toggleComplete(_id) {
  const todoToToggle = todoInstance.find((todo) => todo._id === _id)
  todoToToggle.iscompleted = !todoToToggle.iscompleted
  localStorage.setItem(todoDb, JSON.stringify([...todoInstance]))
  pageReload()

  // const toggle = todoInstance.map((todo) =>
  //   todo._id === _id ? todoToToggle : todo
  // )
  // if(_id !== iscompleted){

  // }

  // console.log(toggle)
}

//Todo:edit

const editMode = (_id) => {
  const todo = todoInstance.find((todo) => todo._id === _id)
  document.getElementById('todo-input').value = todo.title
  addBtn.style.display = 'none'
  editBtn.style.display = 'block'
  editBtn.setAttribute('id', _id)
}

function updateTodoTitle() {
  const { id } = this
  const _id = parseInt(id)
  //   const todo = todoInstance.find((todo) => todo._id === _id)
  const todoToUpdate = todoInstance.find((todo) => todo._id === _id)
  todoToUpdate.title = document.getElementById('todo-input').value

  updatedTodoDB = todoInstance.map((todo) =>
    todo._id === _id ? todoToUpdate : todo
  )

  localStorage.setItem(todoDb, JSON.stringify(updatedTodoDB))
  pageReload()
  console.log(updatedTodoDB)
}

//Todo:delete
function deleteTodo(todoId) {
  const updatedTodoDB = todoInstance.filter(({ _id }) => _id !== todoId)
  localStorage.setItem(todoDb, JSON.stringify(updatedTodoDB))

  pageReload()
}

//EVENTLISTENER
addBtn.addEventListener('click', addtodo)
editBtn.addEventListener('click', updateTodoTitle)
// toggleIcon.addEventListener('click', toggleComplete)
renderTodoItems()

// BEFORE RESTRUCTURING

// document.querySelector('#push').onclick = function(){
//     if(document.querySelector('#newtask input').value.length == 0){
//         alert("Please Enter a Task")
//     }
//     else{
//         document.querySelector('#tasks').innerHTML += `
//             <div class="task">
//                 <span id="taskname">
//                     ${document.querySelector('#newtask input').value}
//                 </span>
//                 <button class="delete">
//                     <i class="far fa-trash-alt"></i>
//                 </button>
//             </div>
//         `;

//         var current_tasks = document.querySelectorAll(".delete");
//         for(var i=0; i<current_tasks.length; i++){
//             current_tasks[i].onclick = function(){
//                 this.parentNode.remove();
//             }

//         }

//         var tasks = document.querySelectorAll(".task");
//         for(var i=0; i<tasks.length; i++){
//             tasks[i].onclick = function(){
//                 this.classList.toggle('completed');
//             }
//         }
// 		console.log(tasks)
//         document.querySelector("#newtask input").value = "";
//     }
// }
