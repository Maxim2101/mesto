import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._popupForm = this._popup.querySelector('.popup__admin')
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;

    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close()

        })
    }

    close() {
        super.close()
        this._popupForm.reset();
    }

    setMessage(span){
        this._popupForm.querySelector('.popup__submit-button').textContent = span;
    }
}
