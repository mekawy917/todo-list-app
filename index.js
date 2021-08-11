let input = document.querySelector(".add-one input");
let addBtn = document.querySelector(".plus");
let tasks = document.querySelector(".tasks");
let noTasksMsg = document.querySelector(".no-tasks");
let allNum = document.querySelector(".all span");
let completedNum = document.querySelector(".completed span");
//check input 
function checkInput() {
    if (input.value != "") {
        if (localStorage.getItem(input.value) == null) {
            createTask(input.value);
        } else {
            alert("this task already add");
        }
    } else {
        alert("You should type something here")
    }
    input.value = '';
}
//create task
function createTask(taskName) {
    input.focus();
    localStorage.setItem(taskName, taskName);
    let task = document.createElement('div');
    let taskTitle = document.createElement('span');
    let taskDel = document.createElement('span') ;
    let taskDone = document.createElement('span') ;
    task.classList.add("task");
    taskTitle.classList.add("task-title");
    taskDone.classList.add("task-done");
    taskDel.classList.add("task-del");
    taskTitle.innerText = taskName ;
    taskDel.innerText = "delete" ;
    taskDone.innerText = "Done!" ;
    task.appendChild(taskTitle) ;
    task.appendChild(taskDel) ;
    task.appendChild(taskDone) ;
    tasks.appendChild(task) ;
    checkTasks();
}
//tasks functions
document.addEventListener("click", function(e){
    if(e.target.classList.contains('task-del')){
      localStorage.removeItem(e.target.parentNode.querySelector(".task-title").innerText)
       e.target.parentNode.remove();
       checkTasks();
    }
    if(e.target.classList.contains('task-done')){
        e.target.parentNode.classList.toggle('done');
        checkTasks();
         localStorage.removeItem(e.target.parentNode.querySelector(".task-title").innerText);
    };
} );
//check tasks 
function checkTasks(){
    if(document.querySelectorAll('.task').length > 0){
        //no tasks messame del
        noTasksMsg.style["display"]= "none" ;
        ///////////////
        //set counters
        allNum.innerText= document.querySelectorAll('.task').length;
        completedNum.innerText= document.querySelectorAll('.done').length;
    }else{
        //no tasks message add
        noTasksMsg.style["display"]= "inline" ;
        //////////////////////////
        allNum.innerText= '0' ;
        completedNum.innerText= '0' ;
        }   

}
//draw localstorage tasks
function drawLocalstorageTasks(){
    for (let [key , value] of Object.entries(localStorage)) {
        createTask(`${key}`);
    }
}
//run task
drawLocalstorageTasks();
//to add one
addBtn.addEventListener("click", function (){
    checkInput(input.value);
});
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        input.blur();
        checkInput();
    }
});
