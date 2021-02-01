let popup = document.querySelector(".popup");
let popupOn = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let form = document.querySelector(".popup__admin")

function togglePopup(evt) {
    evt.preventDefault();
    let name = document.querySelector(".profile__title");
    let job = document.querySelector(".profile__subtitle");
    let heading = name.textContent
    let subheading = job.textContent
    nameInput.setAttribute("placeholder", heading)
    jobInput.setAttribute("placeholder", subheading)
    popup.classList.toggle("popup__opened");
}

popupOn.addEventListener("click", togglePopup);
popupClose.addEventListener("click", togglePopup);

let profileBtn = document.querySelector(".popup__submit-button");
let nameInput = document.querySelector(".popup__change-name");
let jobInput = document.querySelector(".popup__change-job");

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.querySelector(".profile__title");
    let job = document.querySelector(".profile__subtitle");
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    console.log("kkk");
    // popupClose.togglePopup()
}
form.addEventListener("submit", formSubmitHandler);
form.addEventListener("submit", togglePopup);
