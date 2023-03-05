import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import {
  buttonProfileEdit,
  buttonAddPlace,
  buttonAvatarEdit,
  placesGrid,
  nameInput,
  aboutInput,
  placeInput,
  linkInput,
  avatarInput,
  settings,
  authData,
} from "../utils/constants.js";

const api = new Api(authData);
let cardsList;
const initialCards = api.getInitialCards()
.then(function (data) {
  cardsList = new Section(
    {
      items: data.reverse(),
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      },
    },
    placesGrid
  );
})
.catch((err) => console.log(err));

function createCard(item) {
  const card = new Card(
    item,
    userId,
    "#place-template",
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    handleCardUnlike,
  );
  return card.generateCard();
}

function handleCardClick(name, src) {
  popupImage.open(name, src);
}

function handleCardLike(item) {
  api.putLike(item.getId())
  .then((data) => item.toggleLikeCard(data))
  .catch((err) => console.log(err));
}

function handleCardUnlike(item) {
  api.deleteLike(item.getId())
  .then((data) => item.toggleLikeCard(data))
  .catch((err) => console.log(err));
}

function handleCardDelete(item) {
  popupConfirmation.open(() => {
    api.deleteCard(item.getId())
      .then(() => {
        item.removeCard();
        popupConfirmation.close();
      })
      .catch((err) => console.log(err));
  });
}

function handleProfileSubmit() {
  api.patchUserInfo({ name: nameInput.value, about: aboutInput.value })
  .then(() => {
    userInfo.setUserInfo({ name: nameInput.value, about: aboutInput.value })
  })
  .then(() => popupProfile.close())
  .catch((err) => console.log(err))
  .finally(() => {
    popupProfile.submitButton.textContent = "Сохранить";
  });
}

function handleCardSubmit() {
  api.postCard({ name: placeInput.value, link: linkInput.value })
  .then((data) => {
    cardsList.addItem(
      createCard({
        name: data.name,
        link: data.link,
        owner: { _id: userId },
        likes: data.likes,
        _id: data._id,
      })
    );
  })
  .then(() => popupPlace.close())
  .catch((err) => console.log(err))
  .finally(() => {
    popupPlace.submitButton.textContent = "Создать";
  });
}

function handleAvatarSubmit() {
  api.patchAvatar({ avatar: avatarInput.value })
  .then((data) => {
    userInfo.setUserAvatar(data.avatar);
  })
  .then(() => popupAvatar.close())
  .catch((err) => console.log(err))
  .finally(() => {
    popupAvatar.submitButton.textContent = "Сохранить";
  });
}

buttonAvatarEdit.addEventListener("click", () => {
  popupAvatar.open();
  formAvatar.resetValidation();
})
buttonProfileEdit.addEventListener("click", () => {
  let currentInfo = userInfo.getUserInfo();
  formEditProfile.resetValidation();
  popupProfile.open();
  nameInput.value = currentInfo.name;
  aboutInput.value = currentInfo.about;
});
buttonAddPlace.addEventListener("click", () => {
  popupPlace.open();
  formAddPlace.resetValidation();
});

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__image",
});

let userId;
const profileInfo = api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
    });
    userInfo.setUserAvatar(data.avatar);
  })
  .catch((err) => console.log(err));

const formAvatar = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_avatar")
);
const formAddPlace = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_add-place")
);
const formEditProfile = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_edit-profile")
);
formAvatar.enableValidation();
formEditProfile.enableValidation();
formAddPlace.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image-zoom");
const popupProfile = new PopupWithForm(".popup_type_edit-profile", handleProfileSubmit);
const popupPlace = new PopupWithForm(".popup_type_add-place", handleCardSubmit);
const popupAvatar = new PopupWithForm(".popup_type_avatar", handleAvatarSubmit);
const popupConfirmation = new PopupWithConfirmation(".popup_type_confirm");
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupAvatar.setEventListeners();
popupConfirmation.setEventListeners();

Promise.all([profileInfo, initialCards]).then(() => cardsList.renderItems());
