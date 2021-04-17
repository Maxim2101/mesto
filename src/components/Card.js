export default class Card {
    constructor({data, cardSelector, handleImageClick, handleDelClick, handleDelSubmit, handleLike, handleDislike}) {
        this._title = data.name;
        this._image = data.link;
        this._likesArr = data.likes;
        this._userId = data.owner._id;
        this._cardId = data._id;
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;

        this._handleDelClick = handleDelClick;
        this._handleDelSubmit = handleDelSubmit;
        this._handleLike = handleLike;
        this._handleDislike = handleDislike;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    _toggleLike() {
        this._element
            .querySelector('.element__group')
            .classList.toggle('element__group_active');
    }

    _getLikeEl() {
        this._handleLike();
        this._toggleLike()
        if (Boolean(this._element.querySelector('.element__group_active'))) {
            this._element.querySelector('.element__counter').textContent = this._likesArr.length + 1;
        } else {
            this._element.querySelector(".element__counter").textContent = this._likesArr.length;
            this._handleDislike();
        }
    }

    _getDelLikeEl() {
        this._handleDislike();
        this._toggleLike()
        if (Boolean(this._element.querySelector('.element__group_active'))) {
            this._element.querySelector('.element__counter').textContent = this._likesArr.length;
            this._handleLike();
        } else {
            this._element.querySelector('.element__counter').textContent = this._likesArr.length - 1;
        }
    }

    _getRemoveEl() {
        this._handleDelClick()
        document.querySelector('.popup_type_delete').addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleDelSubmit();
            this._element.remove();
        })
    }

    getId() {
        return this._cardId;
    }

    _setEventListeners(UserId) {
        this._element
            .querySelector('.element__photo')
            .addEventListener("click", () => {
                this._handleImageClick(this._data);
            });

        this._element
            .querySelector('.element__group')
            .addEventListener("click", () => {
                if (Boolean(this._likesArr.find(item => item._id === UserId))) {
                    this._getDelLikeEl()
                } else {
                    this._getLikeEl();
                }
            });

        this._element
            .querySelector('.element__trash')
            .addEventListener("click", () => this._getRemoveEl());
    }

    generateCard(UserId) {
        this._element = this._getTemplate();
        const title = this._element.querySelector('.element__text');
        const image = this._element.querySelector('.element__photo');
        const elementLike = this._element.querySelector('.element__counter');
        const deleteBtn = this._element.querySelector('.element__trash');
        if (this._userId !== UserId) deleteBtn.style.display='none';
        if (Boolean(this._likesArr.find(item => item._id === UserId))) {
            this._element
                .querySelector('.element__group')
                .classList.add('element__group_active');
        }

        elementLike.textContent = this._likesArr.length;
        title.textContent = this._title;
        image.src = this._image;
        image.alt = this._title

        this._setEventListeners(UserId);
        return this._element;
    }
}