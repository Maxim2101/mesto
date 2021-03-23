export class  FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._popupAdmin = config.popupAdmin;
    }

    _showInputError(inputElement){
        this._errorElement = inputElement
            .closest(this._popupAdmin)
            .querySelector(this._inputErrorClass);
        this._errorElement.textContent = this._errorMessage ;
        this._errorElement.classList.add(this._errorClass)
    }
    _hideInputError(inputElement){
        this._errorElement = inputElement
            .closest(this._popupAdmin)
            .querySelector(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass)
    };

    _getErrorMessage(inputElement){
        if(inputElement.validity.typeMismatch){
            return 'Введите адрес сайта.'
        }else {
            return 'Вы пропустили это поле.'
        }
    }
    _checkInputValidity(inputElement){
        this._isInputNotValid = !inputElement.validity.valid;

        if(this._isInputNotValid ) {
           this._errorMessage = this._getErrorMessage(inputElement);

            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState(){
        this._hasNotValidInput = this._inputList
            .some(inputElement => !inputElement.validity.valid);

        if(this._hasNotValidInput){
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButtonClass)
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButtonClass)
        }
    }
    _setEventListener(){
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });


        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });

        this._formElement.addEventListener('reset', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement)
                this._toggleButtonState([ { validity: {valid: false } } ], this._buttonElement);
            })
        });

        this._toggleButtonState(this._inputList, this._buttonElement);
    }
    enableValidation() {
        this._setEventListener();
    }
}

