// Handles content box display and hide functionality
function manageContentBoxVisibility() {
  const allElements = document.querySelectorAll(".allElements");
  // Open the corresponding content box when an element is clicked

  allElements.forEach((elem) => {
    elem.addEventListener("click", () => {
      
     const ContentBox = document.querySelectorAll(".ContentBox")[elem.id];
      ContentBox.style.display = "block";
      allElements.forEach((elem)=>{
        elem.style.display ="none"
      })   
    });
  });

  // Close the corresponding content box when the back button is clicked

  const backButton = document.querySelectorAll(".ContentBox .backButton");
  backButton.forEach((elem) => {
    elem.addEventListener("click", () => {
      const ContentBox = document.querySelectorAll(".ContentBox")[elem.id];
      ContentBox.style.display = "none";
      allElements.forEach((elem)=>{
        elem.style.display ="block"
      })  
    });
  });
}
manageContentBoxVisibility();

// Theme color object 

let themeObj = {
  Midnight_Sand: {
    "--pri": "#222831",
    "--sec": "#393E46",
    "--tri": "#DFD0B8",
    "--four": "#948979",
  },
  Ocean_Blue: {
    "--pri": "#112d4e",
    "--sec": "#3f72af",
    "--tri": "#dbe2ef",
    "--four": "#f9f7f7",
  },
  Cherry_Blossom: {
    "--pri": "#FFB8E0",
    "--sec": "#EC7FA9",
    "--tri": "#BE5985",
    "--four": "#FFEDFA",
  },
  Pink_Passion: {
    "--pri": "#D6336C",
    "--sec": "#FF4081",
    "--tri": "#FFB6C1",
    "--four": "#FFF5F8",
  },
  Sage_Green: {
    "--pri": "#8db775",
    "--sec": "#BFD8AF",
    "--tri": "#D4E7C5",
    "--four": "#f3faef",
  },
};




// Todo Relate Code



const todoRightContainer = document.querySelector(".todoRightContainer")

let TodoTaskContainerArr = JSON.parse(localStorage.getItem("currentTodoTask")) || [];


// Renders all todo tasks from the array into the task container
function renderTodoTasks(){
let sum = "";
TodoTaskContainerArr.forEach((elem , id)=>{
    sum+=`<div class="todoTaskShowBoxes">
             <div class="todoTaskShowImp" id=${elem.imp}>Imp</div>
            <h4 class="todoTaskShowH4">${elem.task}</h4>
            <p class="todoTaskShowPera">${elem.des}</p>
         <button class="todoTaskCompleteButton commonButtonDesign" id=${id}>Mark As Complete</button>
        </div>
`
})
todoRightContainer.innerHTML = sum
}
renderTodoTasks()
setupDeleteButtons()


const todoForm = document.querySelector(".todoForm");
const todoTask = document.querySelector("#todoTask");
const todoDes = document.querySelector("#todoDes");
const todoImp = document.querySelector("#todoImp");


todoForm.addEventListener("submit", (e)=>{
    e.preventDefault();

   if(todoTask.value.trim().length === 0){
    return prompt ("Please enter something")
   }
    

   let todoHeading = todoTask.value.trim();
   let todoPera = todoDes.value.trim();
   let todoImpValue = todoImp.checked 
    
    TodoTaskContainerArr.push({
 task : todoHeading,
 des : todoPera,
 imp :todoImpValue,
    })
     

    localStorage.setItem("currentTodoTask" , JSON.stringify(TodoTaskContainerArr));

    renderTodoTasks();
      setupDeleteButtons()
    todoDes.value="";
    todoTask.value="";
    todoImp.checked = false

})

function setupDeleteButtons() {
  const todoTaskCompleteButton = document.querySelectorAll(
    ".todoTaskCompleteButton"
  );

  todoTaskCompleteButton.forEach((elem) => {
    elem.addEventListener("click", () => {
     let con=  confirm("confirm delete ")
      console.log(con)
      TodoTaskContainerArr.splice(elem.id, 1);

      localStorage.setItem(
        "currentTodoTask",
        JSON.stringify(TodoTaskContainerArr)
      );

      renderTodoTasks();

      setupDeleteButtons();
    });
  });
}