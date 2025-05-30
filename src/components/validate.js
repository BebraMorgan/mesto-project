const showInputError = (errorElement, inputElement, errorMessage, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClassActive);
};

const hideInputError = (errorElement, inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClassActive);
    errorElement.textContent = "";
};

/**
 * Универсальная функция проверки валидности поля ввода
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {Object} config
 */
const checkInputValidity = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(
            errorElement,
            inputElement,
            inputElement.validationMessage,
            config,
        );
    } else {
        hideInputError(errorElement, inputElement, config);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    const hasInvalidInput = inputList.some((input) => !input.validity.valid);
    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector),
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

export const resetFormErrors = (formElement, config) => {
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector),
    );
    const errorList = Array.from(
        formElement.querySelectorAll(config.errorClassActiveSelector),
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.classList.remove(config.inputErrorClass);
    });

    errorList.forEach((errorElement) => {
        errorElement.textContent = "";
        errorElement.classList.remove(config.errorClassActive);
    });

    toggleButtonState(inputList, submitButton, config);
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

export default enableValidation;
