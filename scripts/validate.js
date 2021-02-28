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

function onSubmit (activeInputErrorClass, errroElements, inputs) {
    return function (event) {
        let haveOneError = false;
        inputs.forEach(function(item, index) {
            if (event.target.value === '') {
                haveOneError = true;
                setVisibleError(activeInputErrorClass, errroElements[index], 'Поле не может быть пустым.');
            }
        });
        
        setDisabledAtribute(event.target)
    }
};

function enableValidation (configs) {
    const formList = document.querySelectorAll(configs.formSelector);

    formList.forEach(function (form) {
        const inputs = form.querySelectorAll(configs.inputSelector);
        const errorSpans = form.querySelectorAll(configs.inputErrorClass);
        const submitButton = form.querySelector(configs.submitButtonSelector);

        const activeInputErrorClass = configs.inputErrorClassActive.replace('.', '');

        submitButton.addEventListener('click', onSubmit(activeInputErrorClass, errorSpans, inputs ));

        inputs.forEach(function (input, index) {
            input.addEventListener(
                'input',
                onInput(
                    activeInputErrorClass,
                    errorSpans[index],
                    submitButton
                )
            );
        });

        
    });
};


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__admin',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: '.popup__errors',
    inputErrorClassActive: '.popup__errors-visible'
});

