export const buttonProfileEdit = document.querySelector(".profile__edit-button");
export const buttonAddPlace = document.querySelector(".profile__add-button");
export const buttonAvatarEdit = document.querySelector(".profile__image-edit");
export const placesGrid = document.querySelector(".elements");

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


export const authData = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    "content-type": "application/json",
    authorization: "d19785a0-38bb-42d0-bebd-94abfb07212d",
  }
}
