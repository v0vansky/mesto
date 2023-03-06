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
  settings,
  authData,
} from "../utils/constants.js";


const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  placesGrid
)

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__image",
})
let userId;

const api = new Api(authData);
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
    });
    userId = userInfo.getUserInfo()._id;
    cardsList.renderItems(initialCards.reverse());
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


function handleProfileSubmit({ inputName, inputAbout }) {
  api.patchUserInfo({ name: inputName, about: inputAbout })
  .then(() => {
    userInfo.setUserInfo({ name: inputName, about: inputAbout })
  })
  .then(() => popupProfile.close())
  .catch((err) => console.log(err))
  .finally(() => {
    popupProfile.renderLoading(false);
  });
}

function handleCardSubmit({ inputPlace, inputUrl }) {
  api.postCard({ name: inputPlace, link: inputUrl })
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
    popupPlace.renderLoading(false);
  });
}

function handleAvatarSubmit({ inputAvatar }) {
  api.patchAvatar({ avatar: inputAvatar })
  .then(() => {
    userInfo.setUserInfo({ avatar: inputAvatar });
  })
  .then(() => popupAvatar.close())
  .catch((err) => console.log(err))
  .finally(() => {
    popupAvatar.renderLoading(false);
  });
}

buttonAvatarEdit.addEventListener("click", () => {
  popupAvatar.open();
  formAvatarValidator.resetValidation();
})
buttonProfileEdit.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  formEditProfileValidator.resetValidation();
  popupProfile.open();
  popupProfile.setInputValues({ inputName: currentInfo.name, inputAbout: currentInfo.about });
});
buttonAddPlace.addEventListener("click", () => {
  popupPlace.open();
  formAddPlaceValidator.resetValidation();
});

const formAvatarValidator = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_avatar")
);
const formAddPlaceValidator = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_add-place")
);
const formEditProfileValidator = new FormValidator(
  settings,
  document.querySelector(".popup__form_type_edit-profile")
);
formAvatarValidator.enableValidation();
formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();

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
