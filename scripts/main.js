const overlayEl = document.querySelector('.overlay');
const openProfileEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = overlayEl.querySelector('.popup__close-button');
const profileInfo = document.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');
const formElement = overlayEl.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input-name');
let aboutInput = formElement.querySelector('.popup__input-about');

const toggleOverlay = () => {
  overlayEl.classList.toggle('overlay_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  formElement.addEventListener('submit', toggleOverlay);
}

openProfileEditButton.addEventListener('click', toggleOverlay);

closePopupButton.addEventListener('click', toggleOverlay);

formElement.addEventListener('submit', formSubmitHandler);
