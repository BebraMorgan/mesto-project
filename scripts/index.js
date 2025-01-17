//  Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//  Список карточек
const places = document.querySelector('.places__list');

//  Элементы связанные с модальным окном редактирования профиля
const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInput = profilePopup.querySelector('.popup__input_type_description');

//  Имя и описание профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

//  Элементы связанные с модальным окном добавления карточки
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

//  Элементы связанные с модальным окном картинки
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

//  Добавление анимации модальным окнам
profilePopup.classList.add('popup_is-animated.');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

//  Универсальное открытие/закрытие модального окна
const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
}

// Универсальное закрытие модальных окон
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    }
});

// Универсальная обработка формы (для исключения повторения evt.preventDefault())
const handleFormSubmit = (evt, callback) => {
    evt.preventDefault();
    callback();
};

//  Модальное окно редактирования профиля
const openProfileModal = () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

const handleProfileFormSubmit = () => {
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profilePopup);
}

profileButton.addEventListener('click', openProfileModal)
profileFormElement.addEventListener('submit', (evt) => handleFormSubmit(evt, handleProfileFormSubmit));

//  Модальное окно добавления карточки
const openCardModal = () => {
    cardNameInput.value = ''
    cardLinkInput.value = ''
    openModal(cardPopup)
}

const handleCardFormSubmit = () => {
    const newCard = {name: cardNameInput.value, link: cardLinkInput.value}
    places.append(createCard(newCard));
    closeModal(cardPopup);
}

cardButton.addEventListener('click', openCardModal)
cardFormElement.addEventListener('submit', (evt) => handleFormSubmit(evt, handleCardFormSubmit))

const createCard = ({name, link}) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__description').querySelector('.card__title');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    deleteButton.addEventListener('click', (evt) => evt.target.closest('.card').remove());
    likeButton.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_is-active'));

    //  Модальное окно картинки
    cardImage.addEventListener('click', () => {
        imagePopupPicture.src = cardImage.src;
        imagePopupPicture.alt = cardImage.alt;
        imageCaption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    });

    return cardElement;
}

//  Рендер карточек

initialCards.forEach(initialCard => {
    places.append(createCard(initialCard));
})
