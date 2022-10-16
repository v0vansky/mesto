const overlayEl = document.querySelector('.overlay');
const openProfileEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = overlayEl.querySelector('.popup__close-button');
const profileInfo = document.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');
const formElement = overlayEl.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let aboutInput = formElement.querySelector('.popup__input_type_about');

const toggleOverlay = () => {
  overlayEl.classList.toggle('overlay_opened');
  resetInput();
}

const resetInput = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  toggleOverlay();
}

resetInput();

openProfileEditButton.addEventListener('click', toggleOverlay);

formElement.addEventListener('submit', formSubmitHandler);

closePopupButton.addEventListener('click', toggleOverlay);
