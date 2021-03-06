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
const heading = document.querySelector('.popup__input_type_name')
const subheading = document.querySelector('.popup__input_type_job')

const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_profile');
const editProfilePopupClose = document.querySelector('.popup__closes');
const editProfileForm = document.querySelector('.popup__admin');

const figure = document.querySelector('.popup_type_figure');
const figureClose = document.querySelector('.popup__closes-figure');
const figureImage = document.querySelector('.popup__photo-figure');
const figureImageSub = document.querySelector('.popup__input-figure');

const elementTemplateContent = document.querySelector('#element-template').content;
const elementNode = elementTemplateContent.querySelector('.element');
const elements = document.querySelector('.elements')

const addElement = document.querySelector('.profile__add-button-container');
const formItem = document.querySelector('.popup_type_picture');
const closeFormItem = document.querySelector('.popup__closes-picture');
const addItemForm = document.querySelector(".popup__admin_picture");


const overlayPopupFigure = document.querySelector('.popup__overlay_figure');



function closePopup (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

const closePopupProfil = (event) => {
  if (event.target === event.currentTarget)
  closePopup(editProfilePopup);
};

const closePopupPicture = (event) =>{
  if (event.target === event.currentTarget)
  closePopup(formItem);
}

const closePopupFigure = (event) =>{
  if (event.target === event.currentTarget)
  closePopup(figure);
}

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

function onSubmitProfilePopup (event) {
  event.preventDefault();
  userName.textContent = heading.value;
  userJob.textContent = subheading.value;
  closePopup(editProfilePopup);
}

function openImage (imgLink, sub) {
  openPopup(figure)
  figureImage.src = imgLink;
  figureImageSub.textContent = sub;
}

// function remove (child) {
//   elements.removeChild(child)
// }
function like (self) {
  self.classList.toggle('element__group_active')
}

function createCard (link, name ) {
  const cloneNode = elementNode.cloneNode(true);
  const photo = cloneNode.querySelector('.element__photo');

  photo.src = link;
  photo.alt = name;

  photo.addEventListener('click', function () {
    openImage(link, name)
  })

  overlayPopupFigure.addEventListener('click', closePopupFigure);

  cloneNode.querySelector('.element__text').textContent = name;
  cloneNode.querySelector('.element__trash').addEventListener('click', function () {
    cloneNode.remove()
  });
  cloneNode.querySelector('.element__group').addEventListener('click', function (evt) {
    like(evt.target)
  });

  return cloneNode;
}


function addItemFormSubmit (event) {
  event.preventDefault();
  // remove(elements.lastChild);
  elements.prepend(
    createCard(event.target.subheading.value, event.target.heading.value)
  );
  addItemForm.reset ();
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

// editProfileForm.onsubmit = onSubmitProfilePopup;
editProfileForm.addEventListener ('submit', onSubmitProfilePopup);
addItemForm.addEventListener ('submit', addItemFormSubmit);
// addItemForm.onsubmit = addItemFormSubmit;
figureClose.addEventListener('click', function () {
  closePopup(figure)
});
addElement.addEventListener('click', function () {
  openPopup(formItem)
});
closeFormItem.addEventListener('click', function () {
  closePopup(formItem)
});
// editProfile.addEventListener('click', function () {
//   openPopup(editProfilePopup)
//   heading.value = userName.textContent;
//   subheading.value = userJob.textContent;
// });
editProfilePopupClose.addEventListener('click', function () {
  closePopup(editProfilePopup)
});



// const launchPopupProfil = () => {
//   popupProfilName.value = profilName.textContent;
//   popupProfilProfession.value = profilProfession.textContent;
//   openPopup(popupProfil);
// };

const launchPopupImage = () => {
  heading.value = userName.textContent;
  subheading.value = userJob.textContent;
  openPopup(editProfilePopup)
};

editProfile.addEventListener('click', launchPopupImage);

editProfilePopup.addEventListener('click', closePopupProfil);
formItem.addEventListener('click', closePopupPicture);
overlayPopupFigure.addEventListener('click', closePopupFigure);


