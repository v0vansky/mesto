import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import {
  buttonProfileEdit,
  buttonAddPlace,
  placesGrid,
  nameInput,
  aboutInput,
  placeInput,
  linkInput,
  initialCards,
  settings
} from "../utils/constants.js";


function createCard(item) {
  const card = new Card(item, "#place-template", handleCardClick);
  return card.generateCard();
}

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  placesGrid
);
cardsList.renderItems(initialCards);

function handleCardClick(name, src) {
  popupImage.open(name, src);
}

function handleProfileSubmit() {
  userInfo.setUserInfo({ name: nameInput.value, about: aboutInput.value });
  popupProfile.close();
}

function handleCardSubmit() {
  cardsList.addItem(
    createCard({ name: placeInput.value, link: linkInput.value })
  );
  popupPlace.close();
}

buttonProfileEdit.addEventListener("click", () => {
  formEditProfile.resetValidation();
  popupProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
});
buttonAddPlace.addEventListener("click", () => {
  popupPlace.open();
  formAddPlace.resetValidation();
});

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
});

const formAddPlace = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_add-place")
);
const formEditProfile = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_edit-profile")
);
formEditProfile.enableValidation();
formAddPlace.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image-zoom");
const popupProfile = new PopupWithForm(".popup_type_edit-profile", handleProfileSubmit);
const popupPlace = new PopupWithForm(".popup_type_add-place", handleCardSubmit);
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
