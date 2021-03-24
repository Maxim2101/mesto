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
const editProfilePopupClose = document.querySelector('.popup__closes');
const editProfileForm = document.querySelector('.popup__admin');
const profileForm = document.querySelector('.popup__admin_profile')
const pictureForm = document.querySelector('.popup__admin_picture')

const figure = document.querySelector('.popup_type_figure');
const figureClose = document.querySelector('.popup__closes-figure');
const figureImage = document.querySelector('.popup__photo-figure');
const figureImageSub = document.querySelector('.popup__input-figure');

const elements = document.querySelector('.elements')

const addElement = document.querySelector('.profile__add-button-container');
const formItem = document.querySelector('.popup_type_picture');
const closeFormItem = document.querySelector('.popup__closes-picture');

const overlayPopupFigure = document.querySelector('.popup__overlay_figure');



function closePopup (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

const handleClosePopup = (event) => {
  if (event.target === event.currentTarget){
    closePopup(editProfilePopup);
    closePopup(formItem);
    closePopup(figure);
  }
};

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

const launchPopupImage = () => {
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


function addItemFormSubmit(event){
  event.preventDefault()
  const card = new Card({name: nameImage.value, link: subNameImage.value},'.element-template', openImage)
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  nameImage.value = '';
  subNameImage.value = '';
  pictureForm.reset()
  handleClosePopup(formItem);
}

initialCards.forEach((item) => {
  const card = new Card(item, '.element-template', openImage);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});

editProfileForm.addEventListener ('submit', onSubmitProfilePopup);
pictureForm.addEventListener ('submit', addItemFormSubmit);

figureClose.addEventListener('click', function () {
  closePopup(figure)
});

addElement.addEventListener('click', function () {
  openPopup(formItem)
});
closeFormItem.addEventListener('click', function () {
  closePopup(formItem)
});

editProfilePopupClose.addEventListener('click', function () {
  closePopup(editProfilePopup)
});


editProfile.addEventListener('click', launchPopupImage);

editProfilePopup.addEventListener('click', handleClosePopup);
formItem.addEventListener('click', handleClosePopup);
overlayPopupFigure.addEventListener('click', handleClosePopup);

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

