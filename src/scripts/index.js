import '../pages/index.css';
import {initialCards} from './cards';
import Modal from '../components/modal';
import createCard from '../components/card';
import enableValidation from "../components/validate";

//  Список карточек
const places = document.querySelector('.places__list');

//  Элементы связанные с модальным окном редактирования профиля
const profileButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

//  Имя и описание профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

//  Элементы связанные с модальным окном добавления карточки
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

//  Элементы связанные с модальным окном картинки
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');


//  Добавление анимации модальным окнам
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');


//  Универсальное закрытие модальных окон
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        const popup = evt.target.closest('.popup');
        Modal.closeModal(popup);
    }
});
//  Универсальное закрытие модальных окон клавишей ESC
document.addEventListener('keydown', Modal.closeByEsc);

//  Закрытие модальных окон кликом на оверлей
const closeByOverlayClick = (popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            Modal.closeModal(popup);
        }
    });
};

//  Универсальная обработка формы (для исключения повторения evt.preventDefault())
const handleFormSubmit = (evt, callback) => {
    evt.preventDefault();
    callback();
};

//  Модальное окно редактирования профиля
const openProfileModal = () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    Modal.openModal(profilePopup);
}

const handleProfileFormSubmit = () => {
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    Modal.closeModal(profilePopup);
}

profileButton.addEventListener('click', openProfileModal)
profileForm.addEventListener('submit', (evt) => handleFormSubmit(evt, handleProfileFormSubmit));

//  Модальное окно добавления карточки
const openCardModal = () => {
    cardNameInput.value = ''
    cardLinkInput.value = ''
    Modal.openModal(cardPopup)
}

const handleCardFormSubmit = () => {
    const newCard = {name: cardNameInput.value, link: cardLinkInput.value}
    places.append(createCard(newCard));
    Modal.closeModal(cardPopup);
}

cardButton.addEventListener('click', openCardModal)
cardForm.addEventListener('submit', (evt) => handleFormSubmit(evt, handleCardFormSubmit))

closeByOverlayClick(profilePopup)
closeByOverlayClick(imagePopup)
closeByOverlayClick(cardPopup)

//  Рендер карточек
initialCards.forEach(initialCard => {
    const cardElement = createCard(initialCard);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__description .card__title');

    //  Модальное окно карточек
    cardImage.addEventListener('click', () => {
        imagePopupPicture.src = cardImage.src;
        imagePopupPicture.alt = cardImage.alt;
        imageCaption.textContent = cardTitle.textContent;
        Modal.openModal(imagePopup);
    });

    places.append(cardElement);
})
//  Включение валидации
enableValidation();
