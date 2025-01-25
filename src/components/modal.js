//  Универсальное открытие/закрытие модального окна
const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}



export default {openModal, closeModal, closeByEsc};