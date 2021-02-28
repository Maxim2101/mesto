const showInputError = (inputElement, errorMessage, inputErrorClass, errorClass) => {
    
    const errorElement = inputElement
    .closest('.popup__section')
    .querySelector(inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass)
}

const hideInputError = (inputElement, inputErrorClass, errorClass) =>{

    const errorElement = inputElement
    .closest('.popup__section')
    .querySelector(inputErrorClass);
    
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass)
};

const getErrorMessage = (inputElement) => {
    if(inputElement.validity.typeMismatch){
        return 'Введите адрес сайта.'
    }else {
        return 'Вы пропустили это поле.'
    }
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid;

    if(isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);

        showInputError(inputElement, errorMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(inputElement, inputErrorClass, errorClass);
    }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const hasNotValidInput = inputList
    .some(inputElement => !inputElement.validity.valid);

    if(hasNotValidInput){
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass)
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass)
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
    });
    
};

enableValidation({
    formSelector: '.popup__admin',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disable',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
  }); 