class Popup {
    constructor (popup) {
        this.popup = popup;
    }
    
    open () {
        this.popup.classList.add('popup_is-opened');
    }

    close (event) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
    }

    setEventListener () {
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}