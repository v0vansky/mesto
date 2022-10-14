const overlayEl = document.querySelector('.overlay');
const openProfileEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = overlayEl.querySelector('.popup__close-button');


const toggleOverlay = () => {
  overlayEl.classList.toggle('overlay_opened');
}

openProfileEditButton.addEventListener('click', () => {
  toggleOverlay();
})

closePopupButton.addEventListener('click', () => {
  toggleOverlay();
})



let formElement = overlayEl.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_name');
let aboutInput = formElement.querySelector('.popup__input_about');

function formSubmitHandler (evt) {
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileInfo = document.querySelector('.profile__info');
  let profileName = profileInfo.querySelector('.profile__name');
  let profileAbout = profileInfo.querySelector('.profile__about');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  nameInput.value = '';
  aboutInput.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
