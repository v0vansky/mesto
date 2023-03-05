export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    handleCardUnlike,
    ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
    this._likes = data.likes;
    this._userId = userId;
    this._id = data._id;
    this._owner = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setValues() {
    this._elementImage = this._element.querySelector(".element__image");
    this._elementText = this._element.querySelector(".element__text");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._removeButton = this._element.querySelector(".element__remove-button");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeCounter.textContent = this._likes.length;
    this._elementImage.src = this._link;
    this._elementText.textContent = this._name;
    this._elementImage.alt = this._name;
  }

  toggleLikeCard(data) {
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like-button_active");
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._handleCardUnlike(this);
      } else {
        this._handleCardLike(this);
      }
    });
    this._removeButton.addEventListener("click", () => this._handleCardDelete(this));
    this._elementImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, src: this._link })
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setValues();
    this._checkOwner();
    this._checkLikeOwner();
    this._setEventListeners();
    return this._element;
  }

  getId() {
    return this._data._id;
  }

  _checkOwner() {
    if (this._owner === this._userId) {
      this._removeButton.classList.add("element__remove-button_active");
    }
  }

  _checkLikeOwner() {
    if (this._likes.some((user) => this._userId === user._id)) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }
}
