// authorization
// "email": "eve.holt@reqres.in",
// "password": "cityslicka"}`

const boxListEl = document.getElementById('box-list');
const cardsListEl = document.getElementById('cards_list');
const cardsEl = document.getElementsByClassName('card-item');
const formEl = document.getElementById('form');
const loginEl = document.getElementById('login');
const passEl = document.getElementById('password');
const logBtnEl = document.getElementById('loginBtn');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const avatarEl = document.getElementById('avatar');
const formBtnEl = document.getElementById('formBtn');
const arrorInfo = document.getElementById('arror-info');
const prevBtnEl = document.getElementById('prevBtn');
const nextBtnEl = document.getElementById('nextBtn');
const changeBtnEl = document.getElementsByClassName('changeBtn');
const delBtnEl = document.getElementsByClassName('delBtn');
const requestUrl = 'https://reqres.in/api/users';
let newUrl = new URL(requestUrl);
let paginator = 1;

import {validLogin, checkInputValue, checkBtn} from './modules/valid.js';
import {authPostRequest} from './modules/authorization.js';
import {sentRequest} from './modules/template.js';
import {changeUser, deleteUser} from './modules/userchanger.js';


(() => {
    loginEl.addEventListener('focusout', () => {
        checkInputValue(loginEl, !validLogin(loginEl.value));
        checkBtn(loginEl, passEl, logBtnEl);
    });

    passEl.addEventListener('focusout', () => {
        checkInputValue(passEl, !passEl.value);
        checkBtn(loginEl, passEl, logBtnEl);
    });
    
    formEl.addEventListener('submit', (event) => {
        event.preventDefault();

        if(loginEl.value && passEl.value) {
            authPostRequest(`https://reqres.in/api/login`, loginEl, passEl, arrorInfo, formEl, boxListEl);
        } else {
            checkInputValue(loginEl, !validLogin(loginEl.value));
            checkInputValue(passEl, !passEl.value);
            passEl.value = '';
        }
    });

    sentRequest(cardsEl, newUrl, paginator);
   
    prevBtnEl.addEventListener('click', () => {
        paginator > 1 ? --paginator : paginator;  
        sentRequest(cardsEl, newUrl, paginator);
        console.log('pressed prev_btn');
        for (let index = 0; index < cardsEl.length; index++) {
            cardsEl[index].style.display = 'block';
            changeBtnEl[index].style.display = 'inline-flex';
            delBtnEl[index].style.display = 'inline-flex';
        }
        formEl.style.display = "none";
        formBtnEl.style.display = "none";
    })

    nextBtnEl.addEventListener('click', () => {
        paginator < 2 ? ++paginator : paginator;  
        sentRequest(cardsEl, newUrl, paginator);
        console.log('pressed next_btn');
        for (let index = 0; index < cardsEl.length; index++) {
            cardsEl[index].style.display = 'block';
            changeBtnEl[index].style.display = 'inline-flex';
            delBtnEl[index].style.display = 'inline-flex';
        }
        formEl.style.display = "none";
        formBtnEl.style.display = "none";
    })

    for (let i = 0; i < changeBtnEl.length; i++) {
        changeBtnEl[i].addEventListener('click', () => {
            if(confirm(`Do you really want to correct info?`)){
                formEl.style.display = "block";
                firstNameEl.parentElement.style.display = "block";
                lastNameEl.parentElement.style.display = "block";
                loginBtn.style.display = "none";
                formBtnEl.style.display = "block";
                changeUser(newUrl, i, paginator, loginEl, firstNameEl, lastNameEl, cardsEl, formEl, formBtnEl);
            }
        });
    }

    for (let i = 0; i < delBtnEl.length; i++) {
        delBtnEl[i].addEventListener('click', () => {
            console.log('pressed delBtnEl');
            formEl.style.display = "none";
            formBtnEl.style.display = "none";
            if(confirm(`Do you really want to delete profile?`)){
                deleteUser(newUrl, i, paginator, cardsEl, changeBtnEl, delBtnEl);
            }
        })
    }
})();