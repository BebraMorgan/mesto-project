import "../pages/index.css";
import Modal from "./modal";
import createCard from "./card";
import enableValidation from "./validate";
import {
    getCardsApi,
    getMeApi,
    postCardApi,
    patchMeApi,
    updateAvatarApi,
} from "../api";

//  Список карточек
const places = document.querySelector(".places__list");

//  Элементы связанные с модальным окном редактирования профиля
const profileButton = document.querySelector(".profile__edit-button");

const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;
const submitProfileFormButton = profileForm.querySelector(".popup__button");

//  Имя и описание профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

//  Элементы связанные с модальным окном добавления карточки
const cardButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");

const cardForm = document.forms["new-place"];
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const submitCardFormButton = cardForm.querySelector(".popup__button");

//  Элементы связанные с модальным окном картинки
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");

// Элементы связанные с модальным окном аватара
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarLinkInput = avatarForm.elements["avatar-link"];

export const userData = {
    name: null,
    about: null,
    avatar: null,
    _id: null,
    cohort: null,
};

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClassActive: "popup__input-error_active",
    errorClassActiveSelector: ".popup__input-error_active",
};

//  Универсальное закрытие модальных окон
document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        const popup = evt.target.closest(".popup");
        Modal.closeModal(popup);
    }
});

//  Закрытие модальных окон кликом на оверлей
const closeByOverlayClick = (popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
            Modal.closeModal(popup);
        }
    });
};

//  Модальное окно редактирования профиля
const openProfileModal = () => {
    profileNameInput.value = userData.name;
    profileDescriptionInput.value = userData.about;
    Modal.openModal(profilePopup);
};

const handleProfileFormSubmit = (event) => {
    event.preventDefault();

    const originalButtonText = submitProfileFormButton.textContent;

    submitProfileFormButton.textContent = "Сохранение...";
    submitProfileFormButton.disabled = true;

    const updatedData = {
        name: profileNameInput.value,
        about: profileDescriptionInput.value,
    };

    patchMeApi(updatedData)
        .then((response) => {
            userData.name = response.name;
            userData.about = response.about;
            renderProfile(userData);
            Modal.closeModal(profilePopup);
        })
        .catch((err) => {
            console.error("Ошибка обновления профиля:", err);
        })
        .finally(() => {
            submitProfileFormButton.textContent = originalButtonText;
            submitProfileFormButton.disabled = false;
        });
};

//  Модальное окно добавления карточки
const openCardModal = () => {
    cardForm.reset();
    Modal.openModal(cardPopup);
};

const handleCardFormSubmit = (event) => {
    event.preventDefault();

    const originalButtonText = submitCardFormButton.textContent;
    submitCardFormButton.textContent = "Сохранение...";
    submitCardFormButton.disabled = true;

    const newCard = {
        name: cardNameInput.value.trim(),
        link: cardLinkInput.value.trim(),
    };

    postCardApi(newCard)
        .then((createdCard) => {
            const cardElement = createCardElement(createdCard);
            places.prepend(cardElement);
        })
        .catch((err) => {
            console.error("Ошибка при добавлении карточки:", err);
        })
        .finally(() => {
            Modal.closeModal(cardPopup);
            cardForm.reset();
            submitCardFormButton.textContent = originalButtonText;
            submitCardFormButton.disabled = false;
        });
};
const openAvatarModal = () => {
    Modal.openModal(avatarPopup);
};

const handleAvatarFormSubmit = (event) => {
    event.preventDefault();

    const originalButtonText =
        avatarForm.querySelector(".popup__button").textContent;
    const submitAvatarFormButton = avatarForm.querySelector(".popup__button");
    submitAvatarFormButton.textContent = "Сохранение...";
    submitAvatarFormButton.disabled = true;

    updateAvatarApi({ avatar: avatarLinkInput.value })
        .then(() => {
            userData.avatar = avatarLinkInput.value;
            renderProfile(userData);
            Modal.closeModal(avatarPopup);
        })
        .catch((err) => {
            console.error("Ошибка обновления аватара:", err);
        })
        .finally(() => {
            submitAvatarFormButton.textContent = originalButtonText;
            submitAvatarFormButton.disabled = false;
        });
};
const initializeUI = () => {
    const popups = [profilePopup, cardPopup, imagePopup, avatarPopup];
    popups.forEach((popup) => {
        popup.classList.add("popup_is-animated");
    });
    profileButton.addEventListener("click", openProfileModal);
    profileForm.addEventListener("submit", handleProfileFormSubmit);
    profileImage.addEventListener("click", openAvatarModal);
    avatarForm.addEventListener("submit", handleAvatarFormSubmit);
    cardButton.addEventListener("click", openCardModal);
    cardForm.addEventListener("submit", handleCardFormSubmit);
    popups.forEach((popup) => {
        closeByOverlayClick(popup);
    });
};

const createCardElement = (cardData) => {
    const cardElement = createCard(cardData);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(
        ".card__description .card__title",
    );

    cardImage.addEventListener("click", () => {
        imagePopupPicture.src = cardImage.src;
        imagePopupPicture.alt = cardImage.alt;
        imageCaption.textContent = cardTitle.textContent;
        Modal.openModal(imagePopup);
    });

    return cardElement;
};

const renderCards = (cards) => {
    if (!Array.isArray(cards)) {
        console.error(
            "Ошибка: переданные данные для карточек не являются массивом",
        );
        return;
    }

    const fragment = document.createDocumentFragment();

    cards.forEach((cardData) => {
        const cardElement = createCardElement(cardData);
        fragment.appendChild(cardElement);
    });

    places.innerHTML = "";
    places.appendChild(fragment);
};

const renderProfile = (me) => {
    if (!me || typeof me !== "object") {
        console.error("Ошибка: данные пользователя некорректны");
        return;
    }

    userData.name = me.name || "";
    userData.about = me.about || "";
    userData.avatar = me.avatar || "";
    userData._id = me._id || null;
    userData.cohort = me.cohort || "";

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = userData.avatar
        ? `url(${userData.avatar}?t=${new Date().getTime()})`
        : "";
};

const initApp = () => {
    Promise.all([getMeApi(), getCardsApi()])
        .then(([me, cards]) => {
            initializeUI();
            enableValidation(validationConfig);

            renderProfile(me);
            renderCards(cards);
        })
        .catch((err) => {
            console.error("Ошибка инициализации приложения:", err);
        });
};

initApp();
