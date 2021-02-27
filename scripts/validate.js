function getErrorFromElement (element) {
    if (element.validity.patternMismatch) {
        return 'Неправильно указана ссылка.';
    } else if (element.validity.tooLong) {
        return 'Tекст слишком длинный.';
    } else if (element.validity.tooShort) {
        return 'Tекст слишком короткий.';
    } else {
        return '';
    }
};

function setDisabledAtribute (element) {
    element.setAttribute('disabled', true);
};

function removeDisabledAtribute (element) {
    element.removeAttribute('disabled');
};

function setVisibleError (activeInputErrorClass, element, message) {
    element.innerText = message;
    element.classList.add(activeInputErrorClass);
};

function setUnVisibleError (activeInputErrorClass, element) {
    element.innerText = '';
    element.classList.remove(activeInputErrorClass);
};

function onInput (activeInputErrorClass, errroElement, submitButton) {
    return function (event) {
        const errorMessage = getErrorFromElement(event.target);
        if (errorMessage !== '') {
            setVisibleError(activeInputErrorClass, errroElement, errorMessage);
            setDisabledAtribute(submitButton)
        } else {
            setUnVisibleError(activeInputErrorClass, errroElement)
            removeDisabledAtribute(submitButton)
        }
    }
};


function enableValidation (configs) {

    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach(function (form) {
        const inputs = form.querySelectorAll(config.inputSelector);
        const errorSpans = form.querySelectorAll(config.inputErrorClass);
        const submitButton = form.querySelector(config.submitButtonSelector);

        inputs.forEach(function (input, index) {
            input.addEventListener(
                'input',
                onInput(
                    config.inputErrorClassActive.replace('.', ''),
                    errorSpans[index],
                    submitButton
                )
            );
        });
    });
};


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const config = {
    formSelector: '.popup__admin',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: '.popup__errors',
    inputErrorClassActive: '.popup__errors-visible'
}

enableValidation(config);

