const taskInput = document.getElementById('new-task')
const createTaskButton = document.getElementsByTagName('button')[0]
const incompleteTasksList = document.getElementById('incompleteTasks')
const completedTasksList = document.getElementById('completed-tasks')

const createDeleteButton = function () {
  const button = document.createElement('button')
  const image = document.createElement('img')

  button.className = 'delete'
  image.src = './remove.svg'
  button.appendChild(image)

  return button
}

const createEditButton = function () {
  const button = document.createElement('button')

  // innerText encodes special characters, HTML does not.
  button.innerText = 'Edit'
  button.className = 'edit'

  return button
}

const editTask = function () {
  const listItem = this.parentNode

  const editInput = listItem.querySelector('input[type=text]')
  const label = listItem.querySelector('label')
  const editButton = listItem.querySelector('.edit')
  const isEditMode = listItem.classList.contains('editMode')
  if (isEditMode) {
    label.innerText = editInput.value
    editButton.innerText = 'Edit'
  } else {
    editInput.value = label.innerText
    editButton.innerText = 'Save'
  }

  listItem.classList.toggle('editMode')
}

const deleteTask = function () {
  const listItem = this.parentNode
  const ul = listItem.parentNode
  ul.removeChild(listItem)
}

const toggleTaskState = function () {
  const listItem = this.parentNode
  const isChecked = this.checked

  const targetHolder = isChecked ? completedTasksList : incompleteTasksList

  targetHolder.appendChild(listItem)
}

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]')
  const editButton = taskListItem.querySelector('button.edit')
  const deleteButton = taskListItem.querySelector('button.delete')

  editButton.onclick = editTask
  deleteButton.onclick = deleteTask
  checkBox.onchange = toggleTaskState
}

const createTaskListItem = function (taskText) {
  const listItem = document.createElement('li')
  const checkBox = document.createElement('input')
  const label = document.createElement('label')
  const editInput = document.createElement('input')
  const editButton = createEditButton()
  const deleteButton = createDeleteButton()

  checkBox.type = 'checkbox'

  label.innerText = taskText
  label.className = 'task'

  editInput.type = 'text'
  editInput.className = 'task'

  listItem.appendChild(checkBox)
  listItem.appendChild(label)
  listItem.appendChild(editInput)
  listItem.appendChild(editButton)
  listItem.appendChild(deleteButton)

  return listItem
}

const addTask = function () {
  if (!taskInput.value) return
  const listItem = createTaskListItem(taskInput.value)

  incompleteTasksList.appendChild(listItem)
  bindTaskEvents(listItem)

  taskInput.value = ''
}

createTaskButton.addEventListener('click', addTask)

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i])
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i])
}
