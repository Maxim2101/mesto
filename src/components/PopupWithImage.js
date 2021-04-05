import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._title = this._popup.querySelector('.popup__input-figure');
        this._image = this._popup.querySelector('.popup__photo-figure');

    }

    open(name, link) {
        this._title.textContent = name;
        this._image.src = link;
        this._image.alt = link;
        super.open()
    }
}