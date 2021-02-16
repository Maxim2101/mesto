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

const userName = document.querySelector('.profile__title')
const userJob = document.querySelector('.profile__subtitle')

const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup');
const editProfilePopupClose = document.querySelector('.popup__closes');
const editProfileForm = document.querySelector('.popup__admin');

const figure = document.querySelector('.figure');
const figureClose = document.querySelector('.figure__closes');
const figureImage = document.querySelector('.figure__photo');
const figureImageSub = document.querySelector('.figure__input');

const elementTemplateContent = document.querySelector('#element-template').content;
const elementNode = elementTemplateContent.querySelector('.element');
const elements = document.querySelector('.elements')

const addElement = document.querySelector('.profile__add-button-container');
const formItem = document.querySelector('.picture');
const closeFormItem = document.querySelector('.picture__closes');
const addItemForm = document.querySelector(".picture__admin");

function closePopup (element) {
  element.classList.remove('popup_opened');
}

function openPopup (element) {
  element.classList.add('popup_opened');
}

function onSubmitProfilePopup (event) {
  event.preventDefault();
  userName.innerText = this.heading.value;
  userJob.innerText = this.subheading.value;
  closePopup(editProfilePopup);
}

function openImage (imgLink, sub) {
  openPopup(figure)
  figureImage.src = imgLink;
  figureImageSub.innerText = sub;
}

function remove (child) {
  elements.removeChild(child)
}
function like (self) {
  self.classList.toggle('element__group_active')
}

function createCard (link, name ) {
  const cloneNode = elementNode.cloneNode(true);
  const photo = cloneNode.querySelector('.element__photo');

  photo.src = link;
  photo.Alt = name;

  photo.onclick = function () {
    openImage(link, name)
  }

  cloneNode.querySelector('.element__text').innerText = name;
  cloneNode.querySelector('.element__trash').onclick = function () {
    remove(cloneNode)
  };
  cloneNode.querySelector('.element__group').onclick = function () {
    like(this)
  };

  return cloneNode;
}


function addItemFormSubmit (event) {
  event.preventDefault();
  remove(elements.lastChild);
  elements.prepend(
    createCard(this.subheading.value, this.heading.value)
  );
  closePopup(formItem);
}


function init () {
  initialCards.forEach(function (item) {
    elements.appendChild(
      createCard(item.link, item.name)
    )
  })
}

init();

editProfileForm.onsubmit = onSubmitProfilePopup;
addItemForm.onsubmit = addItemFormSubmit;
figureClose.onclick = function () {
  closePopup(figure)
};
addElement.onclick = function () {
  openPopup(formItem)
};
closeFormItem.onclick = function () {
  closePopup(formItem)
};
editProfile.onclick = function () {
  openPopup(editProfilePopup)
};
editProfilePopupClose.onclick = function () {
  closePopup(editProfilePopup)
};