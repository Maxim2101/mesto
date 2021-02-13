const MAX_CARD_COUNT = 6
let popup = document.querySelector(".popup");
let popupOn = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let form = document.querySelector(".popup__admin");
let nam = document.querySelector(".profile__title");
let job = document.querySelector(".profile__subtitle");
let namInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

let cards = document.querySelectorAll(".element");
const popupOnitem = document.querySelector(".profile__add-button-container");
const formItem = document.querySelector(".popup__item");
const popupCloseItem = document.querySelector(".popup__close_item");
let popupImage = document.querySelector(".popup__image");
let popupOnImage = document.querySelectorAll(".element__photo");
let popupCloseImage = document.querySelector(".popup__close_image");
let namImage = document.querySelectorAll(".element__text");
let nameImageText = document.querySelector(".popup__input_text");
let popupPhoto = document.querySelector(".popup__photo");
let elements = document.querySelectorAll(".element");
let elementsContainer = document.querySelector(".elements");
let addElementnam = document.querySelector(".popup__input_nam");
let elementpath = document.querySelector(".popup__input_photo");
let elementForm = document.querySelector(".popup__admin_item");
let formImage = document.querySelector(".popup__admin_image");
let templateE = document.querySelector('.template');


function setLaikList() {
  const laik = document.querySelectorAll('.element__group');
 
  for (i = 0; i < laik.length; i++) { // используем существующую переменную
       laik[i].addEventListener('click', setLaik);;
   }
 }
 setLaikList()

function setTrashListeners() {
  const resetButton = document.querySelectorAll(".element__trash-container");
  for (i = 0; i < resetButton.length; i++) { // используем существующую переменную
    resetButton[i].addEventListener('click', deleteElement);
 }
}
setTrashListeners()

function setPhotosListeners() {
  popupOnImage = document.querySelectorAll(".element__photo");
  for (i = 0; i < popupOnImage.length; i++) { // используем существующую переменную
    popupOnImage[i].addEventListener('click', togglePopupImage);
    popupOnImage[i].addEventListener('click', setImage);
    popupOnImage[i].addEventListener('click', Imagename);
    }
}
setPhotosListeners()

  popupCloseImage.addEventListener("click", togglePopupImage);
  
function togglePopupImage(evt) {
  evt.preventDefault();
  popupImage.classList.toggle("popup_opened");
  }
function setImage(evt) {
  evt.preventDefault();
  const eventImage = evt.target
  const Imagepath = eventImage.getAttribute('src');
  popupPhoto.setAttribute('src', Imagepath)
  }
function Imagename(evt) {
  evt.preventDefault();
  const eventText = evt.target.parentNode.querySelector('.element__text');
  
  console.log(eventText.textContent);
  nameImageText.textContent = eventText.textContent;
  console.log(nameImageText.textContent);
}   
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];



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



function setLaik(evt) { 
    evt.preventDefault();
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули
    
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__group_active');
};



function deleteElement(evt) {
    evt.preventDefault();
    const cardElement = evt.target;
    // card.remove();
    console.log(cardElement.parentNode.parentNode);
    cardElement.parentNode.parentNode.remove();
};



function togglePopupItem(evt) { 
  evt.preventDefault();
  formItem.classList.toggle("popup_opened");
}

popupOnitem.addEventListener("click", togglePopupItem);
popupCloseItem.addEventListener("click", togglePopupItem);


function addElement() {
  // evt.preventDefault();
  
  elementsContainer.insertAdjacentHTML('afterBegin', `
  <div class="element">
    <div class="element__trash">
      <img src="./images/Urna.svg" class="element__trash-container" alt="удаление карточки">
    </div>
    <img src="${elementpath.value}" alt="Карачаевск" class="element__photo">
    <div class="element__container">
      <h3 class="element__text">${addElementnam.value}</h3>
      <button class="element__group" type="button"></button>
    </div>
  </div>
  `);
  setTrashListeners()
  setLaikList()
  deleteLastCard()
  setPhotosListeners()
}
elementForm.addEventListener("submit", addElement);
elementForm.addEventListener("submit", togglePopupItem);

function deleteLastCard() {
  cards = document.querySelectorAll(".element");
  if(cards.length > MAX_CARD_COUNT) {
    const lastChild = cards[cards.length-1]
    elementsContainer.removeChild(lastChild);    
  }
}

function refrash() {
  resetButton = document.querySelectorAll(".element__trash-container");
  for (i = 0; i < resetButton.length; i++) { // используем существующую переменную
    resetButton[i].addEventListener('click', deleteElement);
  }
};




