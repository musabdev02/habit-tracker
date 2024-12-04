
// main_content
const main_content = document.querySelector(".main_content");
const empty_page = document.querySelector(".empty_page");
let pending_list = document.querySelector(".pending_list");
const createHabit = document.querySelector(".popup button")

const typos = document.querySelectorAll(".typos p");







// popup
const afteri = document.getElementById("afteri");
const iwill = document.getElementById("iwill");
const createtask = document.querySelector(".create");
const popup = document.querySelector(".popup");
const closePop = document.querySelector(".closePop");


let afterVal;
let willVal;
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
         afterVal = afteri.value;
         willVal = iwill.value;
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
    let html = `
                <span class="material-symbols-outlined">check</span>
                <div class="pending-item_content">
                    <h4>I will, ${willVal}</h4>
                    <p>After I, ${afterVal}</p>
                </div> `;
    let newElem = document.createElement("div");
    newElem.innerHTML = html;
    newElem.classList.add("pending-item", "dp-flex");
    pending_list.appendChild(newElem);
    willVal = "";
    afterVal = "";

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
}
window.addEventListener("load", loadCheck)