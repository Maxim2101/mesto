import './index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import Api from "../components/Api.js";

import {sectionValidity, avatarForm, pictureForm,
  profileForm, editProfile, heading, subheading, addElement} from "../utils/constans.js";



const profileValidity = new FormValidator(sectionValidity, profileForm);
const pictureValidity= new FormValidator(sectionValidity, pictureForm);
const avatarValidity = new FormValidator(sectionValidity, avatarForm)

pictureValidity.enableValidation()
profileValidity.enableValidation()
avatarValidity.enableValidation()

const userInfo = new UserInfo(
    '.profile__title',
    '.profile__subtitle',
    '.profile__avatar'
)

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-22",
  token: "7e582476-f2fe-4ea7-9a98-2d0a59f84524",
});

 let myInfo
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([objectInfo, cardArr]) => {
        myInfo = objectInfo;
        userInfo.setUserInfo(objectInfo);
        cardList.renderItems(cardArr);
    })
    .catch((err) => {
        console.log(err);
    });

const cardList = new Section(
    {
      renderer: (item) => {
        createCardEl(item);
        cardList.appendItem(createCardEl(item));
      },
    },
    '.elements'
);

const createCardEl = (item) => {
  const card = new Card({
    data: item,
    myInfo: myInfo,
    cardSelector: '.element-template',
    handleImageClick: (data) => popupImage.open(data),
    handleDelClick: (cardId) => {
      popupDelCard.resetSubmit(() => {
          api.deleteCard(cardId)
              .then(() => {
                  card.removeCard();
                  popupDelCard.close();

              })
              .catch((err) => {
                  console.log(err);
              });
      });
      popupDelCard.open();
  },
  handleLike: () => {
      api.setLike(card.getId()._id)
          .then((itemCard) => {
              card.handleLike(itemCard);
          })
          .catch((err) => console.log(err));
  },
  handleDislike: () => {
      api.deleteLike(card.getId()._id)
          .then((itemCard) => {
              card.handleLike(itemCard);
          })
          .catch((err) => console.log(err));
    },
    });
    return card.generateCard();
};

const editFormProfile = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (data) => {
        api.updateAvatar(data)
            .then((objectInfo) => {
                userInfo.setUserInfo(objectInfo);
                editFormProfile.setMessage('Сохранение...');
                editFormProfile.close();
            })
            .catch((err) => console.log(err));
    },
});
editFormProfile.setEventListeners();

const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (data) => {
        api.setUserInfo(data)
            .then((objectInfo) => {
                userInfo.setUserInfo(objectInfo);
                popupProfile.setMessage('Сохранение...');
                popupProfile.close();
            })
            .catch((err) => console.log(err));
    },
});
popupProfile.setEventListeners();

const editCardForm = new PopupWithForm({
    popupSelector: '.popup_type_picture',
    handleFormSubmit: (item) => {
        api.addCard(item)
            .then((objectCard) => {
                const newCard = createCardEl(objectCard);
                cardList.prependItem(newCard);
                editCardForm.setMessage('Сохранение...');
                editCardForm.close();
            })
            .catch((err) => console.log(err));
    },
});
editCardForm.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_figure');
popupImage.setEventListeners();

const popupDelCard = new PopupWithForm({
    popupSelector: '.popup_type_delete'
})
popupDelCard.setEventListeners();

const editButtonAvatar = document.querySelector('.profile__redact')
editButtonAvatar.addEventListener("click", () => {
    editFormProfile.setMessage("Сохранить");
    editFormProfile.open();
});

editProfile.addEventListener("click", () => {
    popupProfile.setMessage("Сохранить");
    heading.value = userInfo.getUserInfo().name;
    subheading.value = userInfo.getUserInfo().about;
    popupProfile.open();
});

addElement.addEventListener("click", () => {
    editCardForm.setMessage("Создать");
    editCardForm.open();
});