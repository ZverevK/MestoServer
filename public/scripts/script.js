
( function () {
const userCardPopupOnBtn = document.querySelector('.user-info__add-button');
const userCardPopupWindow = document.querySelector('.popup__add-card');
const userCardPopupAddBtn = document.querySelector('.popup__button_type-add');
const addForm = document.forms.new;
const userCardName = addForm.one;
const userCardLink = addForm.two;

const editInfoPopupOnBtn = document.querySelector('.user-info__edit-button');
const editInfoPopupWindow = document.querySelector('.popup__edit-info');
const editForm = document.forms.edit;
const editUserName = editForm.one;
const editUserAbout = editForm.two;
const userInfoName = document.querySelector('.user-info__name');
const userInfoAbout = document.querySelector('.user-info__job');
const editInfoPopupAddBtn = document.querySelector('.popup__button_type-edit');

const popupImage = document.querySelector('.popup__image');
const placesList = document.querySelector('.places-list');
const cardList = new CardList (placesList);

const largeImage = new Popup (popupImage);
largeImage.setEventListener();
const userPopup = new Popup (editInfoPopupWindow);
userPopup.setEventListener();
const addPopup = new Popup (userCardPopupWindow);
addPopup.setEventListener();
const addFormValidator = new FormValidator (addForm);
addFormValidator.setEventListeners();
const userFormValidator = new FormValidator (editForm);
userFormValidator.setEventListeners();
const userInfo = new UserInfo (userInfoName, userInfoAbout);
const userInfoApi = new Api ({url: "https://nomoreparties.co/cohort12/users/me", headers: {
    authorization: "b3ec17e0-d80d-4f49-8739-48095f51ad24",
    'Content-type': 'application/json'
}})

const cardsApi = new Api ({url: "https://nomoreparties.co/cohort12/cards", headers: {
    authorization: "b3ec17e0-d80d-4f49-8739-48095f51ad24"
}})

userCardPopupOnBtn.addEventListener('click', () => {
    userCardPopupAddBtn.setAttribute('disabled', true);
    userCardPopupAddBtn.classList.remove('popup__button_type-validated');
    addPopup.open();
    addFormValidator.resetErrors();
});

editInfoPopupOnBtn.addEventListener('click', () => {
    editUserName.value = userInfoName.textContent;
    editUserAbout.value = userInfoAbout.textContent;
    editInfoPopupAddBtn.removeAttribute('disabled');
    editInfoPopupAddBtn.classList.add('popup__button_type-validated')
    userPopup.open();
    userFormValidator.resetErrors();
})

userCardPopupWindow.addEventListener('submit', () => {
    event.preventDefault();
    const newCard = new Card (userCardName.value, userCardLink.value, largeImageOpen);
    cardList.addCard(newCard.create());
    addForm.reset();
    addPopup.close(event);
})

editInfoPopupWindow.addEventListener('submit', () => {
    event.preventDefault();
    userInfoApi.patchUserInfo(editUserName.value, editUserAbout.value)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about)  
    })
    .catch((error) => {
        console.log(error);
    })
    userPopup.close(event);
})

function largeImageOpen (imageUrl) {
    const imagePopupContent = document.querySelector('.popup__big-image');
    imagePopupContent.src = imageUrl;
    largeImage.open();
}

userInfoApi.getInfo()
.then((result) => {
    userInfo.setUserInfo(result.name, result.about);
})
.catch(error => console.log(error));

cardsApi.getInfo()
.then((result) => {
    result.forEach(element => {
        const newCard = new Card(element.name, element.link, largeImageOpen);
        return cardList.render(newCard.create());
    })
})
.catch(error => console.log(error));


})();

