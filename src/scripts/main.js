import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";

import {sectionValidity, initialCards, pictureForm,
  profileForm, editProfile, heading, subheading, addElement} from "../utils/constans.js";


const userInfo = new UserInfo('.profile__title', '.profile__subtitle')

function generatedCard(item) {
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
}

const cardSection = new Section({
  items: initialCards,
  render(item){
    generatedCard(item)
  }
}, '.elements')


const editProfileForm = new PopupWithForm({
  handleFormSubmit:(data) =>{
    userInfo.setUserInfo(data)
  }
}, '.popup_type_profile')

editProfile.addEventListener('click', ()=>{
  editProfileForm.open()
  getUserInfoForm()
})

function getUserInfoForm(){
  const profileInfo = userInfo.getUserInfo()
  heading.value = profileInfo.heading;
  subheading.value = profileInfo.subheading;
}


const editCardForm = new PopupWithForm({
  handleFormSubmit: (data) =>{
    generatedCard({
      'name': data.headingCard,
      'link': data.subheadingCard
    })
  }
}, '.popup_type_picture')

addElement.addEventListener('click', ()=>{
  editCardForm.open()
})

const openImagePopup = new PopupWithImage('.popup_type_figure');
function handleCardClick(name, link){
  openImagePopup.open(name, link)
}

cardSection.renderItems()
editProfileForm.setEventListeners();
editCardForm.setEventListeners();
openImagePopup.setEventListeners()

const profileValidity = new FormValidator(sectionValidity, profileForm);
const pictureValidity= new FormValidator(sectionValidity, pictureForm);

pictureValidity.enableValidation()
profileValidity.enableValidation()

