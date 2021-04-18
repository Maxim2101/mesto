export default class Card {
    constructor({data, myInfo, cardSelector, handleImageClick, handleDelClick, handleLike, handleDislike,
                }) {
        this._title = data.name;
        this._image = data.link;
        this._likesArr = data.likes;
        this._userId = data.owner._id;
        this._myId = myInfo._id;
        this._card = data;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDelClick = handleDelClick;
        this._handleLike = handleLike;
        this._handleDislike = handleDislike;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true);
    }

    getId() {
        return this._card;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    handleLike(item) {
        this._likesArr = item.likes;
        this._getLikeValue(item);
        if (this._checkValue()) {
            this._element
                .querySelector('.element__group')
                .classList.add('element__group_active');
        } else {
            this._element
                .querySelector('.element__group')
                .classList.remove('element__group_active');
        }
    }

    _getLikeValue(item) {
        this._element.querySelector('.element__counter').textContent =
            item.likes.length;
    }

    _checkValue() {
        return Boolean(this._likesArr.find((item) => item._id === this._myId));
    }

    _setEventListeners() {
        this._element
            .querySelector('.element__photo')
            .addEventListener('click', () => {
                this._handleImageClick(this._card);
            });

        this._element
            .querySelector('.element__group')
            .addEventListener('click', () => {
                if (this._checkValue()) {
                    this._handleDislike();
                } else {
                    this._handleLike();
                }
            });

        this._element
            .querySelector('.element__trash')
            .addEventListener("click", () => this._handleDelClick(this._card._id));
    }

    generateCard() {
        this._element = this._getTemplate();
        const title = this._element.querySelector('.element__text');
        const image = this._element.querySelector('.element__photo');
        const elementLike = this._element.querySelector('.element__counter');
        const deleteBtn = this._element.querySelector('.element__trash');
        if (this._userId !== this._myId)
            deleteBtn.style.display = 'none'
        if (this._checkValue()) {
            this._element
                .querySelector('.element__group')
                .classList.add('element__group_active');
        }
        elementLike.textContent = this._likesArr.length;
        title.textContent = this._title;
        image.src = this._image;
        image.alt = this._title;

        this._setEventListeners();

        return this._element;
    }
}
