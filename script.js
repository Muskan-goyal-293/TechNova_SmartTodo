// Handles content box display and hide functionality
function manageContentBoxVisibility() {
  const allElements = document.querySelectorAll(".allElements");
  // Open the corresponding content box when an element is clicked

  allElements.forEach((elem) => {
    elem.addEventListener("click", () => {
      const ContentBox = document.querySelectorAll(".ContentBox")[elem.id];
      ContentBox.style.display = "block";
      allElements.forEach((elem) => {
        elem.style.display = "none";
      });
    });
  });

  // Close the corresponding content box when the back button is clicked

  const backButton = document.querySelectorAll(".ContentBox .backButton");
  backButton.forEach((elem) => {
    elem.addEventListener("click", () => {
      const ContentBox = document.querySelectorAll(".ContentBox")[elem.id];
      ContentBox.style.display = "none";
      allElements.forEach((elem) => {
        elem.style.display = "block";
      });
    });
  });
}
manageContentBoxVisibility();

// Theme color object

let themeObj = {
  Midnight_Sand: {
    "pri": "#222831",
    "sec": "#393E46",
    "tri": "#DFD0B8",
    "four": "#948979",
  },
  Ocean_Blue: {
    "pri": "#112d4e",
    "sec": "#3f72af",
    "tri": "#dbe2ef",
    "four": "#f9f7f7",
  },
  Cherry_Blossom: {
    "pri": "#FFB8E0",
    "sec": "#EC7FA9",
    "tri": "#BE5985",
    "four": "#FFEDFA",
  },
  Pink_Passion: {
    "pri": "#D6336C",
    "sec": "#FF4081",
    "tri": "#FFB6C1",
    "four": "#FFF5F8",
  },
  Sage_Green: {
    "pri": "#8db775",
    "sec": "#BFD8AF",
    "tri": "#D4E7C5",
    "four": "#f3faef",
  },
};
const root = document.documentElement

// Theme fetch by local storage

function applyTheme(){
  let color = localStorage.getItem("color");
  if(color === null){
root.style.setProperty("--pri" ,themeObj["Pink_Passion"].pri)
root.style.setProperty("--sec" ,themeObj["Pink_Passion"].sec)
root.style.setProperty("--tri" ,themeObj["Pink_Passion"].tri)
root.style.setProperty("--four" ,themeObj["Pink_Passion"].four)  
  }
  else{
root.style.setProperty("--pri" ,themeObj[color].pri)
root.style.setProperty("--sec" ,themeObj[color].sec)
root.style.setProperty("--tri" ,themeObj[color].tri)
root.style.setProperty("--four" ,themeObj[color].four)  
  }
}

applyTheme()


const Theme = document.querySelector("#Theme");

//  theme change function
Theme.addEventListener("change",()=>{
  localStorage.removeItem("color")
localStorage.setItem("color" , Theme.value);
applyTheme()
})

// Todo Relate Code
const todoRightContainer = document.querySelector(".todoRightContainer");
let TodoTaskContainerArr =
  JSON.parse(localStorage.getItem("currentTodoTask")) || [];

// Renders all todo tasks from the array into the task container
function renderTodoTasks() {
  let sum = "";
  TodoTaskContainerArr.forEach((elem, id) => {
    sum += `<div class="todoTaskShowBoxes">
             <div class="todoTaskShowImp" id=${elem.imp}>Imp</div>
            <h4 class="todoTaskShowH4">${elem.task}</h4>
            <p class="todoTaskShowPera">${elem.des}</p>
         <button class="todoTaskCompleteButton commonButtonDesign" id=${id}>Mark As Complete</button>
        </div>
`;
  });
  todoRightContainer.innerHTML = sum;
}
renderTodoTasks();
setupDeleteButtons();

const todoForm = document.querySelector(".todoForm");
const todoTask = document.querySelector("#todoTask");
const todoDes = document.querySelector("#todoDes");
const todoImp = document.querySelector("#todoImp");

// todo form handling and add task

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoTask.value.trim().length === 0) {
    return prompt("Please enter something");
  }

  let todoHeading = todoTask.value.trim();
  let todoPera = todoDes.value.trim();
  let todoImpValue = todoImp.checked;

  TodoTaskContainerArr.push({
    task: todoHeading,
    des: todoPera,
    imp: todoImpValue,
  });

  localStorage.setItem("currentTodoTask", JSON.stringify(TodoTaskContainerArr));

  renderTodoTasks();
  setupDeleteButtons();
  todoDes.value = "";
  todoTask.value = "";
  todoImp.checked = false;
});

//  Delete function logic

function setupDeleteButtons() {
  const todoTaskCompleteButton = document.querySelectorAll(
    ".todoTaskCompleteButton",
  );

  todoTaskCompleteButton.forEach((elem) => {
    elem.addEventListener("click", () => {
      let con = confirm("Do you want to remove this task?");
      if (!con) {
        return;
      }
      TodoTaskContainerArr.splice(elem.id, 1);

      localStorage.setItem(
        "currentTodoTask",
        JSON.stringify(TodoTaskContainerArr),
      );

      renderTodoTasks();

      setupDeleteButtons();
    });
  });
}

// section two daily planner code start here
const dailyPlannerOuterDiv = document.querySelector(".dailyPlannerOuterDiv");
const dailyPlannerIterableArr = Array.from({ length: 24 }, (_, idx) => {
  return `${idx}:00 - ${idx + 1}:00`;
});

let dailyPlannerInputValueArray =
  JSON.parse(localStorage.getItem("dailyPlannerInputValue")) || [];

// Generates and renders daily planner time blocks
function renderDailyPlanner() {
  let sum = "";
  dailyPlannerIterableArr.forEach((elem, idx) => {
    sum += `<div class="dailyPlannerInnerDiv">
 <h5 class="dailyPlannerH5">${elem} <span class="dailyPlannerSpan">${
   idx > 11 ? "PM" : "AM"
 }</span></h5>
             <input type="text" name="dailyPlannerInput" class="dailyPlannerInput" id="${idx}" placeholder="Enter your daily planes"
             value=${dailyPlannerInputValueArray[idx] || ""} >    
            </div>`;
  });
  dailyPlannerOuterDiv.innerHTML = sum;
}
renderDailyPlanner();

// Save daily plans to localStorage
function saveDailyPlans() {
  const dailyPlannerInput = document.querySelectorAll(".dailyPlannerInput");
  dailyPlannerInput.forEach((elem, idx) => {
    elem.addEventListener("input", () => {
      let val = elem.value.trim();
      dailyPlannerInputValueArray[idx] = val;
      localStorage.setItem(
        "dailyPlannerInputValue",
        JSON.stringify(dailyPlannerInputValueArray),
      );
    });
  });
}
saveDailyPlans();

//  motivation section code start 

// motivational headlines 
const motivationHeadlineArray = [
  "🚀 Keep Going",
  "💪 Never Quit",
  "🌟 Dream Big",
  "🎯 Stay Driven",
  "🔥 Keep Pushing",
  "⚡ Daily Motivation",
  "🌈 Positive Mindset",
  "🏆 Success Starts",
  "💫 Believe More",
  "✨ Stay Focused",
];


const motivationPera = document.querySelector(".motivationPera");
const MotivationH4 = document.querySelector(".MotivationH4");


//fetch motivation quotes api  code
function FetchMotivationQuotesApi() {
  try {
    const Api = fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then((res) => {
        motivationPera.innerHTML = res.quote;
        MotivationH4.innerHTML = res.author;
      });
  } catch (err) {
    motivationPera.innerHTML = "Something Went wrong Please Wait .";
    MotivationH4.innerHTML = "🖊🖊🖊🖊🖊🖊";
  }
}

const motivation = document.querySelector(".motivation");
const motivationH1 = document.querySelector("#motivationH1");


// Fetch quotes and animate motivation headlines
motivation.addEventListener("click", () => {
  FetchMotivationQuotesApi();
  let count = 0;
  let int = setInterval(() => {
    motivationH1.innerText = motivationHeadlineArray[count];
    count++;
    if (count === motivationHeadlineArray.length) {
      clearInterval(int);
    }
  }, 2000);
});

