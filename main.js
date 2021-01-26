let popup = document.querySelector('.popup')
let popupOn = document.querySelector('.profile__EditButton')
let popupClose = document.querySelector('.popup__close')

function togglePopup (evt) {
evt.preventDefault()
popup.classList.toggle('popup__opened')
}

popupOn.addEventListener('click', togglePopup)
popupClose.addEventListener('click', togglePopup)

let profileBtn = document.querySelector('.popup__SubmitButton')
let nameInput = document.querySelector('.popup__change-name')
let jobInput = document.querySelector('.popup__change-job')

function formSubmitHandler (evt) {
evt.preventDefault();

let name = document.querySelector(".profile__title")
let job = document.querySelector(".profile__subtitle")

name.textContent= nameInput.value
job.textContent=jobInput.value
console.log("kkk")
// popupClose.togglePopup()

}
profileBtn.addEventListener('click', formSubmitHandler);
profileBtn.addEventListener('click', togglePopup);