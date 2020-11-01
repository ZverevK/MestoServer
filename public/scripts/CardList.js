class CardList {
    constructor (container) {
        this.container = container;
    }

    addCard (element) {
        this.container.appendChild(element);
    }

    render (card) {
        console.log(card);
        this.addCard(card);
    }
}