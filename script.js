let formEl = document.getElementById('todo-form');
let inputEl = document.getElementById('todo-input');
let counterEl = document.getElementById('todo-count');
let todoList = document.getElementById('todo-list');

let activities = ["Clean House", "Make Dinner", "Study Javascript"];

initialize();

function initialize() {
    if (localStorage.getItem('activities') !== null) {
        activities = JSON.parse(localStorage.getItem('activities'));
        console.log(JSON.parse(localStorage.getItem('activities')))
    }
    todoUpdater();
}

function todoUpdater() {
    todoList.innerHTML = "";
    counterEl.textContent = activities.length;

    for (let i = 0; i < activities.length; i++) {

        let currentButton = document.createElement('button');
        currentButton.textContent = "Complete";
        currentButton.setAttribute('button-number', i);

        let currentLi = document.createElement('LI');
        currentLi.textContent = activities[i];
        currentLi.appendChild(currentButton);
        todoList.appendChild(currentLi);
    }
    localStorage.setItem('activities', JSON.stringify(activities));
}

function removeActivity(index) {
    let beginning = activities.slice(0, index);
    let end = activities.slice(index + 1);
    activities = beginning.concat(end);
}

formEl.addEventListener("submit", function(event) {
    event.preventDefault();
    activities.push(inputEl.value);
    todoUpdater();
    inputEl.value = "";

});

todoList.addEventListener("click", function(event) {
    if (event.target.matches('button')) {
        event.target.parentElement.classList.add('fade');

        setTimeout(function(){ 
            removeActivity(parseInt(event.target.getAttribute('button-number')));
            todoUpdater();
        }, 500);
    }
    
})