export const buttonProfileEdit = document.querySelector(".profile__edit-button");
export const buttonAddPlace = document.querySelector(".profile__add-button");
export const buttonAvatarEdit = document.querySelector(".profile__image-edit");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupAvatar = document.querySelector(".popup_type_avatar");
export const placesGrid = document.querySelector(".elements");
export const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
export const aboutInput = popupEditProfile.querySelector(".popup__input_type_about");
export const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
export const linkInput = popupAddPlace.querySelector(".popup__input_type_link");
export const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");

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
