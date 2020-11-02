class UserInfo {
    constructor (nameContainer, aboutContainer) {
        this.nameContainer = nameContainer;
        this.aboutContainer = aboutContainer;
    }

    setUserInfo (name, about) {
        this.name = name;
        this.about = about;
        this.updateUserInfo();
    }

    updateUserInfo () {
        this.nameContainer.textContent = this.name;
        this.aboutContainer.textContent = this.about;
    }
}