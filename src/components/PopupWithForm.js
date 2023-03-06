import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__save-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach(input => {
            return this._inputValues[input.name] = input.value;
        })
        return this._inputValues
    }

    setInputValues(data) {
      this._inputs.forEach((input) => {
        input.value = data[input.name];
      });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true, "Сохранение...");
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, loadingText) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._submitButtonText;
      }
    }
}
