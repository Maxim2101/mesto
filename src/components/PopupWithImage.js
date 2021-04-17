import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._title = this._popup.querySelector('.popup__input-figure');
        this._image = this._popup.querySelector('.popup__photo-figure');

    }

    open(data) {
        this._title.textContent = data.name;
        this._image.src = data.link;
        this._image.alt = data.link;
        super.open()
    }
}