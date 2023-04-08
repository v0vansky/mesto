import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popup) {
        super(popup);
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }

    open(deleteHandler) {
      super.open();
      this._deleteHandler = deleteHandler;
      this._submitButton.onclick = this._deleteHandler;
    }
}
