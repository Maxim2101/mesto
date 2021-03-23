export class Card{
    constructor(data, cardSelector, handleImageClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate(){
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__photo').src = this._image;
        this._element.querySelector('.element__photo').alt = this._image;
        this._element.querySelector('.element__text').textContent = this._title;

        return this._element;
    }

    _setEventListeners(){
        this._element.querySelector('.element__group')
            .addEventListener('click', () => {
            this._like();
        });

        this._element.querySelector('.element__trash-container')
            .addEventListener('click', () => {
            this._removeCard();
        });

        this._element.querySelector('.element__photo')
            .addEventListener('click', () => {
            this._handleImageClick(this._title, this._image)
        });
    }
    _like() {
        this._element
            .querySelector('.element__group')
            .classList
            .toggle('element__group_active');
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }
}