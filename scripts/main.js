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
    link: 'https://s597sas.storage.yandex.net/rdisk/7f214d44a1f5e21eaf4f1404926305de4bed6e66882a8d1d7b200c9a7b4bcd3e/6351536d/STOqPuQzydoAxUeQx33XzX4K5qczQt82yth8ErRwVpcpanlT7StkBr1T8lKF-LxVEs5nq-2Ja-vFWqZkPmgMGQ==?uid=99713884&filename=dacha_goroha.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=99713884&fsize=3014859&hid=f852dff4e85cac6dc2462b89b9ec6ab0&media_type=image&tknv=v2&etag=31d8eb1d326f8d34f12bfa1b03e5d916&rtoken=TZdmob0AGNwg&force_default=yes&ycrid=na-1017bd0fb1b05d872f8d8d1efbcac584-downloader7f&ts=5eb77af39f540&s=8ed1cd193624efeea04bbc597ebc65915b2dff4360a017dcc85975fc33536cf8&pb=U2FsdGVkX1-989HuKi1ijk2ru87GHhA2IrYDU_bhxRWeHKZojMXHY3Vtik6kWGchG-BDWXz9qwZmu0yKof9oyTzAQpRWMAuWNngZ-FINoyQ'
  },
  {
    name: 'Краун',
    link: 'https://s438vla.storage.yandex.net/rdisk/03d20fcff48813660573bb1a40351c4a8634adea4879d40032f14292b628b713/63514f77/STOqPuQzydoAxUeQx33XzesiJXqkZ-L3y8ArxFredrxRdl_4Thos8fIqQzACkwgzUuiXKdx0hymNYyFkxNc0_w==?uid=0&filename=crown_ekb.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=8781873&hid=a85f77e836d7562f9c161c1b1638b2cc&media_type=image&tknv=v2&etag=8386a209f03f33f2918fb41f2aa34914&rtoken=q7nyNkseymWa&force_default=no&ycrid=na-8aaa5a3f7bc861713025ab8f7e6eb6e1-downloader10h&ts=5eb7772c98bc0&s=3c0037573d696c52da288f399734b708f0c8cb66f2fabb50867b7e52a8786733&pb=U2FsdGVkX18LBHGxrS9HQ1Ycs5pCtyVgld34YAvmf777KyIMA6FFbanDm4LTAt5KJV5kgguW65oBR5LI-VYPjkm2A5yOuPkn_hWq_tI7VTs'
  },
  {
    name: 'Имеретинка',
    link: 'https://s275myt.storage.yandex.net/rdisk/02df210c08cb9c979783e8c7947190fa427701dc3d5ba1a87badb447cfcb0381/63514f89/STOqPuQzydoAxUeQx33Xzb7akqNOti_t6s6BFf99nJtd4l5IAooy2j6hsw02R4-7TIaztc2xKpzGmIee3hz51A==?uid=0&filename=imeretinka.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=1955409&hid=aded7063cb5331dccb823e3d9f72e482&media_type=image&tknv=v2&etag=d7047cf35aafa85510cdd07760ade92d&rtoken=G8WDavtB5gIT&force_default=no&ycrid=na-4fb62dca66e9a5c1f8491cb61df4543b-downloader10h&ts=5eb7773dc3440&s=47e26e2c54c2463ec608c551128eda33643d782ec4830e9f1ae109788466d0da&pb=U2FsdGVkX1_TM2ysQY4_FQv0kllj8VLzQyi40hFXYW2PX_BLM-VoCWtrL_sE2gOk3LNW9gLKT_46FovjQ8mZO8rJry8965vgEcPbl3zFu3E'
  },
  {
    name: 'Чейзер',
    link: 'https://s231vla.storage.yandex.net/rdisk/f8bc3128c578396a82840132c127cc9a966c30cc4594631234d80a6244ab315b/63515061/STOqPuQzydoAxUeQx33Xza0rNDyB0TuDrSG6tXntRusfyKQA_iI6QNYIN1HMW07ADvg-3zjd_Xe9bpG7b6fhGg==?uid=0&filename=chaser.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=3528926&hid=8a555c90715ee8ce88adaee35e078f14&media_type=image&tknv=v2&etag=535dbcc7d15a779b4501b13732e89acb&rtoken=UEXyCgOAf0Tt&force_default=no&ycrid=na-da404d190b273e3ccfb8fc42792ef1f5-downloader10h&ts=5eb7780bc1a40&s=1e365ef95feb5faaceedf67fb9a46a3b8576d390b5d9ded65f44528521c38c00&pb=U2FsdGVkX18kzljs4gzLO0oUynlooWFVjogSRNyUAQHFQ05yOHrEbxcjA3LQ462oGABq4t3ybOAhfNyb_SXGVvAauczI55ifMQti0C5VLN8'
  },
  {
    name: 'Адлер',
    link: 'https://s81vla.storage.yandex.net/rdisk/b2ee016c14c3fdc0036819a94c8c0572ef4b11d3c5d88cdfda507e4e1baf2b66/63514f52/STOqPuQzydoAxUeQx33XzTl_aY9ZgM8EdIVBrwnN7EvpKdO-73uD5FbDxjwHOPsS5lN0VAX_mRU-W7MoTskkdQ==?uid=99713884&filename=adler_leha.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=99713884&fsize=3823082&hid=16eb0a94a650537e70eefa30ac2b91fb&media_type=image&tknv=v2&etag=e54fe3546216c82fdabf3db530669856&rtoken=tfYojkM4DIaw&force_default=yes&ycrid=na-48750dda379bf5a8aa672a6d04805c9f-downloader10h&ts=5eb777094f880&s=bc9b6ea75a353f9c9fc5771755b7a00dbb7fefafe8abff71494f3bc8bafb6d02&pb=U2FsdGVkX19K4SOyESutGMK22i2Uv9eeIYKlECkzFZSVvCbI8_vHORv_igznGnLASm7GTW0Vx1OXOIlX2SdlWuSoPQU0ERC1mg78OSnDkNs'
  },
  {
    name: 'Куб',
    link: 'https://s274vla.storage.yandex.net/rdisk/7c480747f07fd6430be072806575fef6b3fc433ed4fcba5d74f92c517ae418a3/63514fd6/STOqPuQzydoAxUeQx33XzSu-XQJ1bK6sSlUhSNTs0dg7OhW4caQJlOVIs0J1cY-oRbhH9p5FuHmAPgqeJwVD9w==?uid=0&filename=cube01.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=1718861&hid=fa7b4dcc5af5bb407448c6b0de50950a&media_type=image&tknv=v2&etag=a7713572bd968626cf4ac52a34d3dd02&rtoken=7RO6IPua6Js8&force_default=no&ycrid=na-b62b47ebe8691c9617b9b2d0cf3e835a-downloader10h&ts=5eb7778732180&s=09d3ff72442890c32fed02cbe73517c3bfad7cc21448d7016bb49d3559e2b3db&pb=U2FsdGVkX18CLdDajaTzHoxtkVwOFAJwwetucZ6xFDTtL4yG6XOeQbj1eSLEQ97xwSz9npBDh1frHhV00MulNClFKp_B_1zFAohYW3XN6s8'
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
