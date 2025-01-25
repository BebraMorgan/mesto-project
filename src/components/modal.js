//  Универсальное открытие/закрытие модального окна
const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
}


export default {openModal, closeModal};