class Api {
    constructor (config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getInfo () {
        return fetch(this.url, {
            headers: this.headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    patchUserInfo (patchName, patchAbout) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify ({
                name: patchName,
                about: patchAbout
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}