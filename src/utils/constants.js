import dachaImage from '../images/dacha_goroha.jpg';
import crownImage from '../images/crown_ekb.jpg';
import imeretinkaImage from '../images/imeretinka.jpg';
import chaserImage from '../images/chaser.jpg';
import adlerImage from '../images/adler_leha.jpg';
import cubeImage from '../images/cube01.jpg';

export const buttonProfileEdit = document.querySelector(".profile__edit-button");
export const buttonAddPlace = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
export const placesGrid = document.querySelector(".elements");
export const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
export const aboutInput = popupEditProfile.querySelector(".popup__input_type_about");
export const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
export const linkInput = popupAddPlace.querySelector(".popup__input_type_link");

export const initialCards = [
  {
    name: 'Дача',
    link: dachaImage
  },
  {
    name: 'Краун',
    link: crownImage
    },
  {
    name: 'Имеретинка',
    link: imeretinkaImage
    },
  {
    name: 'Чейзер',
    link: chaserImage
    },
  {
    name: 'Адлер',
    link: adlerImage
    },
  {
    name: 'Куб',
    link: cubeImage
    }
];

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
