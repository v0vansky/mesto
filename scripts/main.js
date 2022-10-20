const openProfileEditButton = document.querySelector('.profile__edit-button');
const openAddPlaceButton = document.querySelector('.profile__add-button');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const placeTemplate = document.querySelector('#place-template');
const placesGrid = document.querySelector('.elements');

const popupZoom = document.querySelector('.popup_type_image-zoom');
const popupImage = popupZoom.querySelector('.popup__image');
const popupImageName = popupZoom.querySelector('.popup__image-name');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');
const placeInput = popupAddPlace.querySelector('.popup__input_type_place');
const linkInput = popupAddPlace.querySelector('.popup__input_type_link');

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

function openPopup (evt) {
  evt.classList.add('popup_opened');

  const closeButton = evt.querySelector('.popup__close-button');
  closeButton.addEventListener('click', ()=>{closePopup(evt)});

  const submitButton = evt.querySelector('.popup__save-button');
  if (evt.classList.contains('popup_type_edit-profile')) {
    submitButton.addEventListener('click', profileSubmitHandler);
  } else if (evt.classList.contains('popup_type_add-place')) {
    submitButton.addEventListener('click', cardSubmitHandler);
  };
}

function closePopup (evt) {
  evt.classList.remove('popup_opened');
  const closeButton = evt.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', closePopup);
  resetInputProfile();
}

function profileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function cardSubmitHandler (evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  resetInputPlace();
  closePopup(popupAddPlace);
}

const resetInputProfile = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}
const resetInputPlace = () => {
  placeInput.value = '';
  linkInput.value = '';
}

function imageZoomPopup(name, link) {
  openPopup(popupZoom);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

function renderCard (name, link) {
  const newElement = placeTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementText = newElement.querySelector('.element__text');

  newElement.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  newElement.querySelector('.element__remove-button').addEventListener('click', removeCard);
  elementImage.addEventListener('click', () => imageZoomPopup(name, link));

  elementImage.src = link;
  elementText.textContent = name;
  elementImage.alt = name;
  placesGrid.prepend(newElement);
}

function removeCard (evt) {
  const element = evt.target.closest('.element');
  element.remove();
}

function initialRender () {
  initialCards.forEach((item) => {
    renderCard(item.name, item.link);
  });
}

resetInputPlace();
resetInputProfile();
initialRender();

openProfileEditButton.addEventListener('click', ()=>{openPopup(popupEditProfile)});
openAddPlaceButton.addEventListener('click', ()=>{openPopup(popupAddPlace)});
