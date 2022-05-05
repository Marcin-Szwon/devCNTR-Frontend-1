let $todoInput
let $alertInfo
let $addBtn
let $ulList
let $newTask
let $allTasks
let $idNumber = 0
let $edit
let $editInfo
let $editedTodo
let $editInput
let $addEditBtn
let $closeTodoBtn

const main = () =>{
    prepareDomElements()
    prepareDomEvents()
    getTodos()
}

const prepareDomElements = () =>{
    $todoInput = document.querySelector('.todo-input')
    $alertInfo = document.querySelector('.info')
    $addBtn = document.querySelector('.add-button')
    $ulList = document.querySelector('.todo-list ul')
    $allTasks = document.getElementsByTagName('li')
    $edit = document.querySelector('.edit-todo')
    $editInfo = document.querySelector('.edit-info')
    $editInput = document.querySelector('.edit-input')
    $addEditBtn = document.querySelector('.accept')
    $closeTodoBtn = document.querySelector('.cancel')
}

const prepareDomEvents = () =>{
    $addBtn.addEventListener('click',addNewTask)
    $todoInput.addEventListener('keyup',enterCheck)
    $ulList.addEventListener('click',checkClick)
    $addEditBtn.addEventListener('click',changeTodo)
    $closeTodoBtn.addEventListener('click',closeEdit)
}

const addNewTask = () =>{
    if($todoInput.value !== ''){
        $idNumber++
        $newTask = document.createElement('li')
        $newTask.innerText = $todoInput.value
        $newTask.setAttribute('id', 'todo-${idNumber}')
        $ulList.appendChild($newTask)

        saveLocalTodos($todoInput.value)

        $todoInput.value = ''
        $alertInfo.innerText = ''

        createToolsArea()
    }else{
        $alertInfo.innerText = 'Wpisz treść zadania!'
    }
}

const enterCheck = () =>{
    if (event.keyCode === 13){
        addNewTask()
    }
}

const createToolsArea = () =>{
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    $newTask.appendChild(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerHTML = '<i class="fa-solid fa-marker"></i>'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>'

    toolsPanel.appendChild(completeBtn)
    toolsPanel.appendChild(editBtn)
    toolsPanel.appendChild(deleteBtn)
}

const checkClick = e =>{
    if (e.target.classList.value !==''){
        if (e.target.closest('button').classList.contains('complete')){
            e.target.closest('li').classList.toggle('completed')
            e.target.closest('button').classList.toggle('completed')

        } else if (e.target.closest('button').classList.contains('edit')){
            editTask(e)
        } else if (e.target.closest('button').classList.contains('delete')){
            deleteTask(e)
        }

    }
}

const editTask = e =>{

    const oldTodo = e.target.closest('li').id
    console.log(oldTodo)
    $editedTodo = document.getElementById(oldTodo)
    $editInput.value = $editedTodo.firstChild.textContent
    $edit.style.display = 'flex'
}

const changeTodo = () =>{
    if ($editInput.value !== ''){
        $editedTodo.firstChild.textContent = $editInput.value
        $edit.style.display = 'none'
        $editInfo.innerText = ''
    } else{
        $editInfo.innerText = 'Musisz podać jakąś treść!'
    }
}

const closeEdit = () =>{
    $edit.style.display = 'none'
    $editInfo.innerText = ''
}

const deleteTask = e =>{
    const deleteTodo = e.target.closest('li')
    deleteTodo.remove()

    removeLocalTodos(deleteTodo);

    console.log($allTasks.length)
    if ($allTasks.length === 0){
        $alertInfo.innerText = "Brak zadań na liście"
    }
}

const saveLocalTodos = todo =>{
    let todos
    if (localStorage.getItem("todos") === null){
        todos=[]
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () =>{
    let todos
    if (localStorage.getItem("todos") === null){
        todos=[]
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        $idNumber++
        console.log($idNumber)
        $newTask = document.createElement('li')
        $newTask.innerText = todo
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $ulList.appendChild($newTask)
    
        $todoInput.value = ''
        $alertInfo.innerText = ''

        createToolsArea()
    })
}

const removeLocalTodos = todo =>{
    let todos
    
    if (localStorage.getItem("todos") === null){
        todos=[]
    } else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.innerText
    console.log(todoIndex)
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded',main)
