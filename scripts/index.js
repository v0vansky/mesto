const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');


const popupForms = document.forms;
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const placeTemplate = document.querySelector('#place-template');
const placesGrid = document.querySelector('.elements');
const buttonPlaceSubmit = popupAddPlace.querySelector('.popup__save-button');

const popupZoom = document.querySelector('.popup_type_image-zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupImageName = popupZoom.querySelector('.popup__image-name');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');
const placeInput = popupAddPlace.querySelector('.popup__input_type_place');
const linkInput = popupAddPlace.querySelector('.popup__input_type_link');
const closeButtons = document.querySelectorAll('.popup__close-button');

const initialCards = [
  {
    name: 'Дача',
    link: './images/dacha_goroha.jpg'
  },
  {
    name: 'Краун',
    link: './images/crown_ekb.jpg'
    },
  {
    name: 'Имеретинка',
    link: './images/imeretinka.jpg'
    },
  {
    name: 'Чейзер',
    link: './images/chaser.jpg'
    },
  {
    name: 'Адлер',
    link: './images/adler_leha.jpg'
    },
  {
    name: 'Куб',
    link: './images/cube01.jpg'
    }
];

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEsc);
}


function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function handleCardSubmit (evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  evt.submitter.classList.add('popup__save-button_disabled');
  evt.submitter.setAttribute('disabled', true);
  closePopup(popupAddPlace);
}


const fillInputProfile = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openImagePopup(name, link) {
  openPopup(popupZoom);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

function createCard (name, link) {
  const newElement = placeTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementText = newElement.querySelector('.element__text');

  newElement.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  newElement.querySelector('.element__remove-button').addEventListener('click', removeCard);
  elementImage.addEventListener('click', () => openImagePopup(name, link));

  elementImage.src = link;
  elementText.textContent = name;
  elementImage.alt = name;
  return newElement;
}

function renderCard (name, link) {
  const newCard = createCard(name, link);
  placesGrid.prepend(newCard);
}

function removeCard (evt) {
  const element = evt.target.closest('.element');
  element.remove();
}

const closeByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

buttonProfileEdit.addEventListener('click', ()=>{
  openPopup(popupEditProfile);
  fillInputProfile();
});
buttonAddPlace.addEventListener('click', ()=>{
  openPopup(popupAddPlace);
  popupForms.inputFormPlace.reset();
});


popupEditProfile.addEventListener('submit', handleProfileSubmit);
popupAddPlace.addEventListener('submit', handleCardSubmit);
popupEditProfile.addEventListener("click", closeByOverlay);
popupAddPlace.addEventListener("click", closeByOverlay);
popupZoom.addEventListener("click", closeByOverlay);
