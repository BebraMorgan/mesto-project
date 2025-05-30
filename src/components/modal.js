import { validationConfig } from ".";
import { resetFormErrors } from "./validate";

const openModal = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", (evt) => closeByEsc(evt, popup));
};

const closeModal = (popup) => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", (evt) => closeByEsc(evt, popup));
    const form = popup.querySelector("form");
    if (form) {
        resetFormErrors(form, validationConfig);
        form.reset();
    }
};

function closeByEsc(evt, popup) {
    if (evt.key === "Escape") {
        closeModal(popup);
    }
}

export default { openModal, closeModal };
