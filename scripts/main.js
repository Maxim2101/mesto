import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {initialCards} from "./initialCards.js";

const userName = document.querySelector('.profile__title')
const userJob = document.querySelector('.profile__subtitle')
const heading = document.querySelector('.popup__input_type_name')
const subheading = document.querySelector('.popup__input_type_job')
const nameImage = document.querySelector('.popup__input_picture')
const subNameImage = document.querySelector('.popup__input_pic')

const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_profile');
const editProfileForm = document.querySelector('.popup__admin');
const profileForm = document.querySelector('.popup__admin_profile')
const pictureForm = document.querySelector('.popup__admin_picture')

const figure = document.querySelector('.popup_type_figure');
const figureImage = document.querySelector('.popup__photo-figure');
const figureImageSub = document.querySelector('.popup__input-figure');

const elements = document.querySelector('.elements')

const addElement = document.querySelector('.profile__add-button-container');
const formItem = document.querySelector('.popup_type_picture');

const overlayPopupFigure = document.querySelector('.popup__overlay_figure');

function closePopup (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) =>{
  popup.addEventListener('click', (event)=> {
    if(event.target.classList.contains('popup_opened')){
      closePopup(popup)
    }
    if(event.target.classList.contains('popup__closes')){
      closePopup(popup)
    }
  })
})

function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

const openProfilePopup = () => {
  editProfileForm.reset()
  heading.value = userName.textContent;
  subheading.value = userJob.textContent;
  openPopup(editProfilePopup)
};

function onSubmitProfilePopup (event) {
  event.preventDefault();
  userName.textContent = heading.value;
  userJob.textContent = subheading.value;
  closePopup(editProfilePopup);
}

function openImage (name, link) {
  openPopup(figure)
  figureImage.src = link;
  figureImageSub.textContent = name;
}

function createCard(item) {
  const card = new Card(item, '.element-template', openImage);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

function addItemFormSubmit(event){
  event.preventDefault()
  // const card = new Card({name: nameImage.value, link: subNameImage.value},'.element-template', openImage)
  // const cardElement = card.generateCard();
  // elements.prepend(cardElement);
  createCard({name: nameImage.value, link: subNameImage.value})
  pictureForm.reset();
  closePopup(formItem)
}

 initialCards.forEach((item) => {
   // const card = new Card(item, '.element-template', openImage);
   // const cardElement = card.generateCard();
   // elements.prepend(cardElement);
   createCard(item)
 });


editProfileForm.addEventListener ('submit', onSubmitProfilePopup);
pictureForm.addEventListener ('submit', addItemFormSubmit);

addElement.addEventListener('click', function () {
  pictureForm.reset()
  openPopup(formItem)
});

editProfile.addEventListener('click', openProfilePopup);

overlayPopupFigure.addEventListener('click', function (event){
  if(event.target === event.currentTarget){
    closePopup(figure);
  }
});

const sectionValidity = ({
  formSelector: '.popup__admin',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
  popupAdmin: '.popup__section'
});


const profileValidity = new FormValidator(sectionValidity, profileForm);
const pictureValidity= new FormValidator(sectionValidity, pictureForm);

pictureValidity.enableValidation()
profileValidity.enableValidation()

