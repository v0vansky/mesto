import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this.submitButton = this._form.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach(input => {
            return this._inputValues[input.id] = input.value;
        })
        return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._renderLoading();
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    _renderLoading() {
        this.submitButton.textContent = 'Сохранение...'
    }
}
