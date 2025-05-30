const showInputError = (errorElement, inputElement, errorMessage) => {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(errorElement, inputElement);
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    const hasInvalidInput = inputList.some((input) => !input.validity.valid);
    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle("popup__button_disabled", hasInvalidInput);
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(
            formElement.querySelectorAll(".popup__set"),
        );
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

export default enableValidation;
