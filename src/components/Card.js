export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _setValues() {
    this._elementImage = this._element.querySelector('.element__image');
    this._elementText = this._element.querySelector('.element__text');

    this._elementImage.src = this._link;
    this._elementText.textContent = this._name;
    this._elementImage.alt = this._name;
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
    this._elementImage.addEventListener('click', () => this._handleCardClick({name: this._name, src: this._link}));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setValues();
    this._setEventListeners();

    return this._element;
  }
};
