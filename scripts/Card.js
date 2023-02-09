import {openImagePopup} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _setValues() {
    const elementImage = this._element.querySelector('.element__image');
    const elementText = this._element.querySelector('.element__text');

    elementImage.src = this._link;
    elementText.textContent = this._name;
    elementImage.alt = this._name;
  }

  _likeCard() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.classList.toggle('element__like-button_active');
  }

  _removeCard() {
        this._element.remove();
        this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.element__remove-button').addEventListener('click', () => this._removeCard());
    this._element.querySelector('.element__image').addEventListener('click', () => openImagePopup({name: this._name, link: this._link}));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setValues();
    this._setEventListeners();

    return this._element;
  }
};
