import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageName = this._popup.querySelector('.popup__image-name');
    }

    open({ src, name }) {
        this._popupImage.src = src;
        this._popupImage.alt = name;
        this._popupImageName.textContent = name;
        super.open();
    }
}
