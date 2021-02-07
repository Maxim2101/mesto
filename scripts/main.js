let popup = document.querySelector(".popup");
let popupOn = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let form = document.querySelector(".popup__admin")
let nam = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");
let namInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

function togglePopup(evt) { 
    evt.preventDefault();
    popup.classList.toggle("popup_opened");
}
function selectInput() {
    namInput.value = nam.textContent;
    jobInput.value = job.textContent;
}
popupOn.addEventListener("click", togglePopup);
popupClose.addEventListener("click", togglePopup);



function formSubmitHandler(evt) {
    evt.preventDefault();
    nam.textContent = namInput.value;
    job.textContent = jobInput.value;
}
form.addEventListener("submit", formSubmitHandler);
popupOn.addEventListener("click", selectInput);
form.addEventListener("submit", togglePopup);