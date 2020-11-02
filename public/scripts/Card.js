class Card {
    constructor (name, link, openImageCallback) {
        this.name = name;
        this.link = link;
        this.openImageCallback = openImageCallback;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.largePic = this.largePic.bind(this);
    }

    create () {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const placeCardImage = document.createElement('div');
        placeCardImage.classList.add('place-card__image');
        placeCardImage.style.backgroundImage = `url('${this.link}')`
        const deleteIcon = document.createElement('button');
        deleteIcon.classList.add('place-card__delete-icon');

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');
        const cardName = document.createElement('h3');
        cardName.textContent = this.name;
        cardName.classList.add('place-card__name');
        const likeIcon = document.createElement('button');
        likeIcon.classList.add('place-card__like-icon');

        placeCardImage.appendChild(deleteIcon);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeIcon);
        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(cardDescription);

        this.cardElement = placeCard;
        this.setEventListener();
        return placeCard;
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
      }

    largePic (event) {
        console.log(this.openImageCallback);
        this.openImageCallback(event.target.style.backgroundImage.slice(5, -2));
    }

    setEventListener () {
        this
        .cardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.like);

        this
        .cardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove);

        this
        .cardElement
        .querySelector('.place-card__image')
        .addEventListener('click', this.largePic)
        
    }

    remove () {
        this.removeEventListeners();
        this.cardElement.remove();
    }

    removeEventListeners () {
        this
        .cardElement
        .querySelector('.place-card__like-icon')
        .removeEventListener('click', this.like);

        this
        .cardElement
        .querySelector('.place-card__image')
        .removeEventListener('click', this.largePic);

        this
        .cardElement
        .querySelector('.place-card__delete-icon')
        .removeEventListener('click', this.remove);
    }
    
}