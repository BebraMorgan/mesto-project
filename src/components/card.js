const cardTemplate = document.querySelector("#card-template").content;
export const createCard = ({ name, link }) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement
        .querySelector(".card__description")
        .querySelector(".card__title");

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    deleteButton.addEventListener("click", (evt) =>
        evt.target.closest(".card").remove(),
    );
    likeButton.addEventListener("click", (evt) =>
        evt.target.classList.toggle("card__like-button_is-active"),
    );

    return cardElement;
};

export default createCard;
