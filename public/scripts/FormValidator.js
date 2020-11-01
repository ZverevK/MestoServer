class FormValidator {
    constructor (form) {
        this.form = form;
    }
    checkInputValidity (input, error) {
        let inputIsValid = true;
        if (input.validity.valid) {
          error.textContent = '';
        } else {
          if (input.validity.valueMissing) {
          /*
            Можно лучше: сообщения об ошибках вынести в отдельный объект, а не хардкодить их в методе
            И передавать этот объект в конструктор класса
            Если понадобится перевести приложение на другой язык можно будет передавать классу другой объект
            errorMessages = {
              empty: 'Это обязательное поле',
              wrongLength: 'Должно быть от 2 до 30 символов'
              ......
            }

          */
          error.textContent = 'Это обязательное поле';
          }
          else if (input.validity.tooShort || input.validity.tooLong) {
            error.textContent = 'Должно быть от 2 до 30 символов';
          }
          else if (input.validity.typeMismatch) {
            error.textContent = 'Здесь должна быть ссылка';
          }
          inputIsValid = false;
        }
        return inputIsValid;
    }
    setSubmitButtonState (button, status) {
        if (status) {
            button.removeAttribute('disabled');
            button.classList.add(`popup__button_type-validated`);
        } else {
            button.setAttribute('disabled', true);
            button.classList.remove(`popup__button_type-validated`);
        }
      };
    setEventListeners () {
        this.form.addEventListener ('input', () =>{
            let formIsValid = true; 
            let inputs = Array.from(this.form.querySelectorAll('.popup__input'));
            inputs.forEach(input => {
              let error = input.nextElementSibling;
              const inputIsValid = this.checkInputValidity(input, error);
              if (!inputIsValid) {
                formIsValid = false;
              }
            });
            const button = this.form.querySelector('.button');
            this.setSubmitButtonState (button, formIsValid);
          });
    }
    resetErrors () {
      const errors = Array.from(this.form.querySelectorAll('.popup__input-error'));
      errors.forEach((error) => {error.textContent=''})
    }
}