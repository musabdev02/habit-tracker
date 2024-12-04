
// main_content
const main_content = document.querySelector(".main_content");
const empty_page = document.querySelector(".empty_page");
const currentDate = document.getElementById("currentDate");
let pending_list = document.querySelector(".pending_list");
const pending_li = document.querySelectorAll(".pending-item");
const createHabit = document.querySelector(".popup button")
const typos = document.querySelectorAll(".typos p");

// popup
const afteri = document.getElementById("afteri");
const iwill = document.getElementById("iwill");
const createtask = document.querySelector(".create");
const popup = document.querySelector(".popup");
const closePop = document.querySelector(".closePop");

// sounds
let pingAud = new Audio("sounds/ping.mp3");

let countTask = 0;

createtask.addEventListener("click", ()=>{
    popup.style.opacity = 1;
    popup.style.visibility = "visible"
});
const closePopUp = () =>{
    popup.style.opacity = 0;
    popup.style.visibility = "hidden";
};
// typos funcs
typos.forEach((elem)=>{
    elem.addEventListener("click", (e)=>{
       let typoInp = e.target.parentNode.parentNode.childNodes[3];
       let typoText = e.target.textContent;
       typoInp.value = typoText;
    });
});

createHabit.addEventListener("click", ()=>{
    closePopUp();
    updateDisplay();
});

closePop.addEventListener("click", closePopUp);

const updateDisplay = () =>{
    countTask++;
    loadCheck();
    pingAud.play();
    let html = `<span class="material-symbols-outlined"> sentiment_very_satisfied </span>
                <div class="pending-item_content">
                    <h4>I will, ${iwill.value}</h4>
                    <p>After I, ${afteri.value}</p>
                </div> `;
    let newElem = document.createElement("div");
    newElem.innerHTML = html;
    newElem.classList.add("pending-item", "dp-flex");
    pending_list.appendChild(newElem);
    afteri.value = "";
    iwill.value = "";

};

const loadCheck = ()=>{
    if(countTask < 1){
        main_content.style.display = "none";
        empty_page.style.display = "grid";
    }
    else{
        main_content.style.display = "block";
        empty_page.style.display = "none";
    }
    // date 
    let now = new Date();
    let nowDay = now.getDay();
    let nowMonth = now.getMonth();
    let nameMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let nameDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    currentDate.textContent = `${nowDay+1} ${nameMonths[nowMonth]}, ${nameDays[nowDay]}`
};

window.addEventListener("load", loadCheck)

// complete task
if(countTask >= 1){
    pending_li.forEach((element)=>{
        element.addEventListener("click", (e)=>{
            console.log(e.target)
        })
    })
}