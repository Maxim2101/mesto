export const sectionValidity = ({
    formSelector: '.popup__admin',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disable',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active',
    popupAdmin: '.popup__section'
});
export const initialCards = [
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

export const profileForm = document.querySelector('.popup__admin_profile')
export const pictureForm = document.querySelector('.popup__admin_picture')
export const editProfile = document.querySelector('.profile__edit-button');
export const heading = document.querySelector('.popup__input_type_name')
export const subheading = document.querySelector('.popup__input_type_job')
export const addElement = document.querySelector('.profile__add-button-container');
