import { userData } from ".";
import { likeCardApi, unlikeCardApi, delCardApi } from "../api";
const cardTemplate = document.querySelector("#card-template").content;

export const createCard = ({ name, link, _id, likes = [], owner }) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(
        ".card__description .card__title",
    );
    const likeCount = cardElement.querySelector(".card__like-count");

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    likeCount.textContent = likes.length;

    if (owner._id === userData._id) {
        deleteButton.addEventListener("click", () => {
            delCardApi(_id)
                .then(() => {
                    cardElement.remove();
                })
                .catch((err) => {
                    console.error("Ошибка удаления карточки:", err);
                });
        });
    } else {
        deleteButton.remove();
    }

    const isLiked = likes.some((like) => like._id === userData._id);
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", () => {
        if (likeButton.classList.contains("card__like-button_is-active")) {
            unlikeCardApi(_id)
                .then((updatedCard) => {
                    likeButton.classList.remove("card__like-button_is-active");
                    likeCount.textContent = updatedCard.likes.length;
                })
                .catch((err) => {
                    console.error("Ошибка снятия лайка:", err);
                });
        } else {
            likeCardApi(_id)
                .then((updatedCard) => {
                    likeButton.classList.add("card__like-button_is-active");
                    likeCount.textContent = updatedCard.likes.length;
                })
                .catch((err) => {
                    console.error("Ошибка лайка:", err);
                });
        }
    });

    return cardElement;
};

export default createCard;
