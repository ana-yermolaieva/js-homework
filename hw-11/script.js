// login : admin@domain.com , password : password123
 
(() => {
    const btnEl = document.getElementById('btn');
    const loginEl = document.getElementById('login');
    const passEl = document.getElementById('password');
    const formEl = document.getElementById('form');
    const arrorInfo = document.getElementById('arror-info');

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

    function checkBtn (elem1, elem2) {
        if (elem1.value && elem2.value) {
            btnEl.classList.replace('is-disabled', 'is-success');
        } else {
            btnEl.classList.replace('is-success', 'is-disabled');
        }
    }

    function checkData(input, data, message) {
        if (input.value !== data) {
            arrorInfo.textContent = message;
            console.log('incorrect data');
            return false;
        } else {
            return true;
        }
    }

    function submit () {
        if (checkData(loginEl, 'admin@domain.com', 'Please, enter the correct login!') && checkData(passEl, 'password123', 'Please, enter the correct password!')) {
            arrorInfo.classList.remove('arror--show');
            formEl.classList.add('form--close');
            formEl.nextElementSibling.classList.add('message--success');
        } else {
            arrorInfo.classList.add('arror--show');
            checkBtn (loginEl, passEl);
            passEl.value = '';
        }
    }

    loginEl.addEventListener('focusout', () => {
        checkInputValue(loginEl, !validLogin(loginEl.value));
        checkBtn(loginEl, passEl);
    });

    passEl.addEventListener('focusout', () => {
        checkInputValue(passEl, !passEl.value);
        checkBtn(loginEl, passEl);
    });

    formEl.addEventListener('submit', (event) => {
        event.preventDefault();

        if (loginEl.value && passEl.value) {
            submit();
        }
    });
})();
