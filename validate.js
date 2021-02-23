function validate (value) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const conveyor = {
        emptyString: function () {
            if (value === '') {
                throw {
                    message: 'Вы пропустили это поле.',
                    isValidtionError: true
                };
            } else {
                return conveyor;
            }
        },
        minString: function (minLength) {
            if (value.length < minLength) {
                throw {
                    message: 'Tекст должен быть не короче ' + minLength + ' симв. Длина текста сейчас: ' + value.length + ' символ.',
                    isValidtionError: true
                };
            } else {
                return conveyor;
            }
        },
        maxString: function (maxlength) {
            if (value.length > maxlength) {
                throw {
                    message: 'Tекст должен быть не длинее ' + maxlength + ' симв. Длина текста сейчас: ' + value.length + ' символ.',
                    isValidtionError: true
                };
            } else {
                return conveyor;
            }
        },
        url: function () {
            if (!urlRegex.test(value)) {
                throw {
                    message: 'Указан не правильный адресс.',
                    isValidtionError: true
                };
            } else {
                return conveyor;
            }
        }
    }
    return conveyor;
}

function hasErrorInErrors (errorsObject) {
    const keys = Object.keys(errorsObject);
    const error = keys.find(function (item) {
        if (errorsObject[item]) {
            return true;
        }
    });
    return Boolean(error);
}

function setVisibleError (element, message) {
    element.innerText = message;
    element.classList.add('popup__errors-visible');
}

function setUnVisibleError (element) {
    element.innerText = '';
    element.classList.remove('popup__errors-visible');
}

function changeButtonState (element, error) {
    if (error) {
        element.setAttribute('disabled', true);
        return;
    }
    element.removeAttribute('disabled');
}

function firstPopUpInit (name, nameError, description, descriptionError, submit) {
    console.log(submit)
    const fieldsErrors = {
        name: false,
        description: false
    };

    function nameHandler () {
        try {
            const errorMessage = validate(name.value)
                .emptyString()
                .minString(2)
                .maxString(40);
            
            setUnVisibleError(nameError);
            fieldsErrors.name = false;
        } catch (error) {
            if (error.isValidtionError) {
                setVisibleError(nameError, error.message);
                fieldsErrors.name = true;
            }
        } finally {
            const error = hasErrorInErrors(fieldsErrors);
            changeButtonState(submit, error);
        }
    };
    function descriptionHandler () {
        try {
            const errorMessage = validate(description.value)
                .emptyString()
                .minString(2)
                .maxString(200);

            setUnVisibleError(nameError);
            fieldsErrors.description = false;
        } catch (error) {
            if (error.isValidtionError) {
                setVisibleError(descriptionError, error.message);
                fieldsErrors.description = true;
            }
        } finally {
            const error = hasErrorInErrors(fieldsErrors);
            changeButtonState(submit, error);
        }
    };
    function onSubmit (event) {
        nameHandler();
        descriptionHandler();
        const error = hasErrorInErrors(fieldsErrors);
        if (error) {
            changeButtonState(error);
            event.preventDefault();
        }
    };

    name.addEventListener('input', nameHandler);
    description.addEventListener('input', descriptionHandler);
    submit.addEventListener('click', onSubmit);
}

function secondPopUpInit (name, nameError, link, linkError, submit) {
    console.log(submit)
    const fieldsErrors = {
        name: false,
        link: false
    };

    function nameHandler () {
        try {
            const errorMessage = validate(name.value)
                .emptyString()
                .minString(2)
                .maxString(40);

            setUnVisibleError(nameError);
            fieldsErrors.name = false;
        } catch (error) {
            if (error.isValidtionError) {
                setVisibleError(nameError, error.message);
                fieldsErrors.name = true;
            }
        } finally {
            const error = hasErrorInErrors(fieldsErrors);
            changeButtonState(submit, error);
        }
    };
    function linkHandler () {
        try {
            const errorMessage = validate(link.value).emptyString().url();

            setUnVisibleError(linkError);
            fieldsErrors.link = false;
        } catch (error) {
            if (error.isValidtionError) {
                setVisibleError(linkError, error.message);
                fieldsErrors.link = true;
            }
        } finally {
            const error = hasErrorInErrors(fieldsErrors);
            changeButtonState(submit, error);
        }
    };
    function onSubmit (event) {
        nameHandler();
        linkHandler();
        const error = hasErrorInErrors(fieldsErrors);
        if (error) {
            changeButtonState(error);
            event.preventDefault();
        }
    };

    name.addEventListener('input', nameHandler);
    link.addEventListener('input', linkHandler);
    submit.addEventListener('click', onSubmit)
}


function enableValidation (config) {
    console.log(document.querySelector(config.profileName));
    firstPopUpInit(
        document.querySelector(config.profileName),
        document.querySelector(config.profileNameError),
        document.querySelector(config.profileJob),
        document.querySelector(config.profileJobError),
        document.querySelector(config.profileSubmit),
    );
    secondPopUpInit(
        document.querySelector(config.newPlaceName),
        document.querySelector(config.newPlaceNameError),
        document.querySelector(config.newPlaceLink),
        document.querySelector(config.newPlaceLinkError),
        document.querySelector(config.newPlaceSubmit),
    )
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    profileName: '.popup__input_type_name',
    profileNameError: '.popup__admin_name-error',
    profileJob: '.popup__input_type_job',
    profileJobError: '.popup__admin-job-error',
    profileSubmit: '.popup__formsubmit-text',

    newPlaceName: '.popup__input_picture',
    newPlaceNameError: '.popup__admin-picture-name-error',
    newPlaceLink: '.popup__input_pic',
    newPlaceLinkError: '.popup__admin-picture-link-error',
    newPlaceSubmit: '.popup__admin-picture-submit',

});

