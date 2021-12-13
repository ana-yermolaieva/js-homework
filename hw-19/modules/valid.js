function validLogin(login) {
    var test = /\S+@\S+\.\S+/;
    return test.test(login);
}

function checkInputValue (element, clause) {
    if (clause) {
        element.parentElement.classList.add('arror');
        element.classList.add('is-arror');
        element.value = '';
    } else {
        element.parentElement.classList.remove('arror');
        element.classList.remove('is-arror');
    }
}

function checkBtn (elem1, elem2, logBtn) {
    if (elem1.value && elem2.value) {
        logBtn.classList.replace('is-disabled', 'is-success');
    } else {
        logBtn.classList.replace('is-success', 'is-disabled');
    }
}

export {validLogin, checkInputValue, checkBtn};