/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://mesto-project/./src/scripts/cards.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards */ \"./src/scripts/cards.js\");\n\n\n\n//  Темплейт карточки\nvar cardTemplate = document.querySelector('#card-template').content;\n\n//  Список карточек\nvar places = document.querySelector('.places__list');\n\n//  Элементы связанные с модальным окном редактирования профиля\nvar profileButton = document.querySelector('.profile__edit-button');\nvar profilePopup = document.querySelector('.popup_type_edit');\nvar profileForm = document.forms['edit-profile'];\nvar profileNameInput = profileForm.elements.name;\nvar profileDescriptionInput = profileForm.elements.description;\n\n//  Имя и описание профиля\nvar profileTitle = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\n\n//  Элементы связанные с модальным окном добавления карточки\nvar cardButton = document.querySelector('.profile__add-button');\nvar cardPopup = document.querySelector('.popup_type_new-card');\nvar cardForm = document.forms['new-place'];\nvar cardNameInput = cardForm.elements['place-name'];\nvar cardLinkInput = cardForm.elements.link;\n\n//  Элементы связанные с модальным окном картинки\nvar imagePopup = document.querySelector('.popup_type_image');\nvar imagePopupPicture = imagePopup.querySelector('.popup__image');\nvar imageCaption = imagePopup.querySelector('.popup__caption');\n\n//  Добавление анимации модальным окнам\nprofilePopup.classList.add('popup_is-animated');\ncardPopup.classList.add('popup_is-animated');\nimagePopup.classList.add('popup_is-animated');\n\n//  Универсальное открытие/закрытие модального окна\nvar openModal = function openModal(popup) {\n  popup.classList.add('popup_is-opened');\n};\nvar closeModal = function closeModal(popup) {\n  popup.classList.remove('popup_is-opened');\n};\n\n// Универсальное закрытие модальных окон\ndocument.addEventListener('click', function (evt) {\n  if (evt.target.classList.contains('popup__close')) {\n    var popup = evt.target.closest('.popup');\n    closeModal(popup);\n  }\n});\n\n// Универсальная обработка формы (для исключения повторения evt.preventDefault())\nvar handleFormSubmit = function handleFormSubmit(evt, callback) {\n  evt.preventDefault();\n  callback();\n};\n\n//  Модальное окно редактирования профиля\nvar openProfileModal = function openProfileModal() {\n  profileNameInput.value = profileTitle.textContent;\n  profileDescriptionInput.value = profileDescription.textContent;\n  openModal(profilePopup);\n};\nvar handleProfileFormSubmit = function handleProfileFormSubmit() {\n  profileTitle.textContent = profileNameInput.value;\n  profileDescription.textContent = profileDescriptionInput.value;\n  closeModal(profilePopup);\n};\nprofileButton.addEventListener('click', openProfileModal);\nprofileForm.addEventListener('submit', function (evt) {\n  return handleFormSubmit(evt, handleProfileFormSubmit);\n});\n\n//  Модальное окно добавления карточки\nvar openCardModal = function openCardModal() {\n  cardNameInput.value = '';\n  cardLinkInput.value = '';\n  openModal(cardPopup);\n};\nvar handleCardFormSubmit = function handleCardFormSubmit() {\n  var newCard = {\n    name: cardNameInput.value,\n    link: cardLinkInput.value\n  };\n  places.append(createCard(newCard));\n  closeModal(cardPopup);\n};\ncardButton.addEventListener('click', openCardModal);\ncardForm.addEventListener('submit', function (evt) {\n  return handleFormSubmit(evt, handleCardFormSubmit);\n});\nvar createCard = function createCard(_ref) {\n  var name = _ref.name,\n    link = _ref.link;\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);\n  var deleteButton = cardElement.querySelector('.card__delete-button');\n  var likeButton = cardElement.querySelector('.card__like-button');\n  var cardImage = cardElement.querySelector('.card__image');\n  var cardTitle = cardElement.querySelector('.card__description').querySelector('.card__title');\n  cardTitle.textContent = name;\n  cardImage.src = link;\n  cardImage.alt = name;\n  deleteButton.addEventListener('click', function (evt) {\n    return evt.target.closest('.card').remove();\n  });\n  likeButton.addEventListener('click', function (evt) {\n    return evt.target.classList.toggle('card__like-button_is-active');\n  });\n\n  //  Модальное окно картинки\n  cardImage.addEventListener('click', function () {\n    imagePopupPicture.src = cardImage.src;\n    imagePopupPicture.alt = cardImage.alt;\n    imageCaption.textContent = cardTitle.textContent;\n    openModal(imagePopup);\n  });\n  return cardElement;\n};\n\n//  Рендер карточек\n\n_cards__WEBPACK_IMPORTED_MODULE_1__.initialCards.forEach(function (initialCard) {\n  places.append(createCard(initialCard));\n});\n\n//# sourceURL=webpack://mesto-project/./src/scripts/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;