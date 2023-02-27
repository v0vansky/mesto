import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import dachaImage from '../images/dacha_goroha.jpg';
import crownImage from '../images/crown_ekb.jpg';
import imeretinkaImage from '../images/imeretinka.jpg';
import chaserImage from '../images/chaser.jpg';
import adlerImage from '../images/adler_leha.jpg';
import cubeImage from '../images/cube01.jpg';

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

const popupForms = document.forms;
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const placesGrid = document.querySelector('.elements');

const popupZoom = document.querySelector('.popup_type_image-zoom');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');
const placeInput = popupAddPlace.querySelector('.popup__input_type_place');
const linkInput = popupAddPlace.querySelector('.popup__input_type_link');

const initialCards = [
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

const fillInputProfile = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function createCard(item) {
  const card = new Card(item, '#place-template', handleCardClick);
  return card.generateCard();
};

const cardsList = new Section({
  items:  initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);

  }
}, placesGrid);
cardsList.renderItems();


function handleCardClick(name, src) {
  popupImage.open(name, src)
};

function handleProfileSubmit () {
    userInfo.setUserInfo({ name: nameInput.value, about: aboutInput.value });
    popupProfile.close();
  }

  function handleCardSubmit () {
    cardsList.addItem(createCard({name: placeInput.value, link: linkInput.value}))
    popupPlace.close();
  }

buttonProfileEdit.addEventListener('click', ()=>{
  popupProfile.open();
  fillInputProfile();
});
buttonAddPlace.addEventListener('click', ()=>{
  popupPlace.open();
  popupForms.inputFormPlace.reset();
  formAddPlace.toggleButtonState();
});

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
})

const formAddPlace = new FormValidator(settings, document.querySelector('.popup__form_type_add-place'));
const formEditProfile = new FormValidator(settings, document.querySelector('.popup__form_type_edit-profile'));
formEditProfile.enableValidation();
formAddPlace.enableValidation();

const popupImage = new PopupWithImage(popupZoom);
const popupProfile = new PopupWithForm(popupEditProfile, handleProfileSubmit);
const popupPlace = new PopupWithForm(popupAddPlace, handleCardSubmit);
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
