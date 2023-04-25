// Empty script file to start with

//after the user has entered a list desription, 
//the user will
//click on the Add Task Button
//that list description should be added to the list as a list item
// and should be preceded by a checkbox

//Step 1- grab an element from the DOM and assign it to our element
//Step 2- write a function to handle the event
//Step 3- connect the variable and the function by the event listener 
	//so that an 'event' triggers the update of the DOM
		
	//Step 1
	let addButton= document.getElementById('add-task');
	let newTaskInput = document.getElementById('task-input');
	let todoListContainer = document.getElementById('todo-list');
	
	let templateElement = document.getElementById("list-item-template");
	let template = templateElement.innerHTML;
		
	let showActiveButton= document.getElementById("show-active");
	let showAllButton= document.getElementById("show-all");
	let showCompletedButton = document.getElementById("show-completed");
	
	function saveTasks(name, isCompleted){
		localStorage.setItem(name, isCompleted);
	}
	
	//function to read from the localStorage and render
	function renderTasks(){
	for(let i=0; i<localStorage.length; i++){
		let taskName = localStorage.key(i);
		let isCompleted = localStorage.getItem(taskName) == "true";
		
		let taskHTML = template.replace("<!--TASK_NAME-->", taskName);
		
		if(!Completed){
			todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
			saveTasks(taskName, false);			
		}
		
		}
	}
	
	//Step 2
	function onAddTaskClicked(e){
		//retrieve the value of the task input and assign a variable
		let taskName = newTaskInput.value;
		newTaskInput.value="";
		
	//update the task name in the template for the li text/placeholder
	if(taskName!=""){
				
		let taskHTML = template.replace("<!--TASK_NAME-->", taskName);
	
	//append the taskHTML to my ul
		todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
	}
}
	
	function onTodoListClicked(e){
		let targetElement= e.target;
	
		while(!targetElement.classList.contains("task")){
			targetElement =targetElement.parentElement;
	}
		let checkbox = targetElement.querySelector(".checkbox");
		
		if(checkbox.checked){
			//task should be striked through
			targetElement.classList.add("completed");
		}
		else{
			//checkbox should be normal
			targetElement.classList.remove("completed");
		}
		
		let taskNameElement = targetElement.querySelector(".task-name");
		let taskName = taskNameElement.innerText;
		
		saveTasks(taskName, checkbox.checked);
}
	function showAllTasks(){
		let tasks = document.getElementsByClassName('task');
		for(let i=0; i<tasks.length;i++){
			tasks[i].style.display = "block"; 
		}
	}
	
	function showActiveTasks(){
		let tasks = document.getElementsByClassName('task');
			for(let i=0; i<tasks.length; i++){
			if(tasks[i].classList.contains("completed")){
				tasks[i].style.display = "none";
			}
			else{
				tasks[i].style.display= "block";				
			}
			
			}			
	}

	function showCompletedTasks(){
		let tasks = document.getElementsByClassName('task');
			for(let i=0; i<tasks.length; i++){
			if(tasks[i].classList.contains("completed")){
				tasks[i].style.display = "block";
			}
			else{
				tasks[i].style.display= "none";				
			}
			
			}				
	}
	//Step 3
	//Event trigger our functions 
	addButton.addEventListener('click', onAddTaskClicked);
	todoListContainer.addEventListener('click', onTodoListClicked);
	showActiveButton.addEventListener('click', showActiveTasks);
	showCompletedButton.addEventListener('click', showCompletedTasks);
	showAllButton.addEventListener('click',showAllTasks);
	renderTasks();