const inputBox = document.getElementById('inputBox');
const listTask = document.getElementById('listTasks');

const buttonAddTask = document.getElementById('buttonAdd');

const listFilters = document.getElementById('mainFilters');
const allFilters = document.querySelectorAll('.h2');

// Поиск выбранного фильтра
const findFilter = () => {
  for (let i = 0; i < allFilters.length; i++) {
    if (allFilters[i].classList.contains('selected')) return allFilters[i].classList[1];
  }
};
const hidePopup = () => {
  const popup = document.getElementById('popup');
  setTimeout(() => {
    popup.classList.remove('active', 'error');
    buttonAddTask.disabled = false;
  }, 1500);
};
// Добавление задачи
const addTask = () => {
  const popup = document.getElementById('popup');
  buttonAddTask.disabled = true;
  if (inputBox.value === '') {
    popup.classList.add('active', 'error');
    popup.innerHTML = 'Заполните поле ввода';
    hidePopup();
    return;
  }

  let taskItem = document.createElement('li');
  taskItem.classList.add('main_list-item');
  // Если фильтр = "Выполненные", то созданная задача будет скрыта (дефолтный статус = активный)
  if (findFilter() === 'completed') {
    taskItem.classList.add('hidden');
  }

  // Создание задачи, иконки удаления
  let taskText = document.createElement('span');
  taskText.classList.add('main_list-text');
  taskText.innerHTML = inputBox.value;

  let taskDelete = document.createElement('img');
  taskDelete.classList.add('delete');
  taskDelete.src = './assets/image/delete.png';

  taskItem.appendChild(taskText);
  taskItem.appendChild(taskDelete);

  // Добавление задачи в список
  listTask.appendChild(taskItem);

  popup.classList.add('active');
  popup.innerHTML = 'Задача успешно создана';
  hidePopup();

  inputBox.value = '';
};

buttonAddTask.addEventListener('click', addTask);

// Клин на задачу
listTask.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    return;
  }
  if (e.target.tagName === 'SPAN') {
    e.target.parentElement.classList.toggle('checked');
    return;
  }
  if (e.target.tagName === 'IMG') {
    e.target.parentElement.remove();
  }
});

// Фильтрация
const filterTasks = (active = false) => {
  const allTasks = document.querySelectorAll('.main_list-item');
  for (let i = 0; i < allTasks.length; i++) {
    if (
      active
        ? !allTasks[i].classList.contains('checked')
        : allTasks[i].classList.contains('checked')
    ) {
      allTasks[i].classList.remove('hidden');
    } else {
      allTasks[i].classList.add('hidden');
    }
  }
};

// Клин на элемент филтрации
listFilters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'H2') return;
  for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].classList.remove('selected');
  }

  const classList = e.target.classList;
  const allTasks = document.querySelectorAll('.main_list-item');
  if (e.target.tagName === 'H2') {
    classList.toggle('selected');
  }

  if (classList.contains('active')) {
    filterTasks(true);
    return;
  }

  if (classList.contains('completed')) {
    filterTasks();
    return;
  }

  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i].classList.remove('hidden');
  }
});
