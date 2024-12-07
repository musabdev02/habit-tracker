
// main_content
const main_content = document.querySelector(".main_content");
const empty_page = document.querySelector(".empty_page");
const currentDate = document.getElementById("currentDate");
let pending_list = document.querySelector(".pending_list");
const pending_li = document.querySelectorAll(".pending-item");
const createHabit = document.querySelector(".popup button")
const typos = document.querySelectorAll(".typos p");
const counterHabit = document.getElementById("counterHabit");
const typos_colors = document.querySelectorAll(".typos_colors p");
const typos_icons = document.querySelectorAll(".typos_icons span")
const app_footerLi = document.getElementsByClassName("app_footer-li");
const main_complete = document.querySelector(".main_complete");
const compeleted_list = document.querySelector(".compeleted_list");

// popup
const afteri = document.getElementById("afteri");
const iwill = document.getElementById("iwill");
const createtask = document.querySelector(".create");
const popup = document.querySelector(".popup");
const closePop = document.querySelector(".closePop");

// sounds
let pingAud = new Audio("sounds/ping.mp3");
let paperAud = new Audio("sounds/paper.mp3");

let countTask = 0;
let compeletTask = 0;
let compeleteMark;
let selectedColor="default";
let selectedIcon = "sentiment_very_satisfied";

// spinner
window.addEventListener("load", ()=>{
    document.getElementById("spinner").style.display = "none";
    document.querySelector("#app").style.display = "block";
});

// choose typos
typos.forEach((elem)=>{
    elem.addEventListener("click", (e)=>{
       let typoInp = e.target.parentNode.parentNode.childNodes[3];
       let typoText = e.target.textContent;
       typoInp.value = typoText;
    });
});

// labelColors
const changeLabels = (data, added) =>{
    data.forEach((element) => {
        element.addEventListener("click", (e) => {
            data.forEach((el) => {
                el.classList.remove(`${added}`);
            });
            e.target.classList.add(`${added}`);
            let colorsArr = ["colorOfRed", "colorOfGreen", "colorOfBlue"];
            const hasColorClass = colorsArr.some(color => e.target.classList.contains(color));
            if(hasColorClass){selectedColor = e.target.classList[0];}
            else{selectedIcon = e.target.textContent;}
        });
    });
};
changeLabels(typos_icons, "typos_iconsActive");
changeLabels(typos_colors, "activeLabelColor");

// updateCards
const updateDisplay = () =>{
    const getCounter = ()=>{
        counterHabit.textContent = `(${countTask})`;
    }
    if(iwill.value === "" || afteri.value == ""){
        alert("Please Enter Something!");
    }
    else{
        countTask++;
        pingAud.play();
        loadCheck();
      let html = `<span class="material-symbols-outlined"> ${selectedIcon} </span>
                <div class="pending-item_content">
                    <h4>I will, ${iwill.value}</h4>
                    <p>After I, ${afteri.value}</p>
                </div> `;
    let newElem = document.createElement("div");
    newElem.innerHTML = html;
    newElem.classList.add("pending-item", `${selectedColor}`,"dp-flex");
    pending_list.prepend(newElem);
    getCounter();
    afteri.value = "";
    iwill.value = "";
    const allAppearTasks = newElem;
    allAppearTasks.addEventListener("click", (e)=>{
        if(e.target.classList.contains("pending-item")){
            if(!e.target.classList.contains("compeleted_list")){
                paperAud.play();
            }
            e.target = e.target.classList.add("compeleted_list");
            compeleted_list.prepend(e.target);
            compeletTask++; 
            countTask--;
            getCounter();
        }
    });
    
    
}
 
};
// pageNav
app_footerLi[0].addEventListener("click", ()=>{
    if(compeletTask >= 1){
        main_content.style.display = "block"
        main_complete.style.display = "none";
        app_footerLi[2].classList.remove("app_footerActive");
      app_footerLi[0].classList.add("app_footerActive")
    }
})
app_footerLi[2].addEventListener("click", ()=>{
    if(compeletTask >= 1){
        main_content.style.display = "none"
        main_complete.style.display = "block";
        app_footerLi[0].classList.remove("app_footerActive")
        app_footerLi[2].classList.add("app_footerActive");
    }
});


// date & default page
const loadCheck = ()=>{
    if(countTask < 1){
        main_content.style.display = "none";
        empty_page.style.display = "grid";
    }
    else{
        main_content.style.display = "block";
        empty_page.style.display = "none";
        app_footerLi[0].classList.add("app_footerActive");
    }
    // date 
    let now = new Date();
    let nowDay = now.getDay();
    let nowMonth = now.getMonth();
    let nameMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let nameDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    currentDate.textContent = `${nowDay+1} ${nameMonths[nowMonth]}, ${nameDays[nowDay]}`
};
// openPopup
createtask.addEventListener("click", ()=>{
    popup.style.opacity = 1;
    popup.style.visibility = "visible"
});
// closePopup
const closePopUp = () =>{
    popup.style.opacity = 0;
    popup.style.visibility = "hidden";
};
// listeners
window.addEventListener("load", loadCheck);
closePop.addEventListener("click", closePopUp);
createHabit.addEventListener("click", ()=>{
    closePopUp();
    updateDisplay();
});


