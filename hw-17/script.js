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
let paginator = 1;

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
        logBtnEl.classList.replace('is-disabled', 'is-success');
    } else {
        logBtnEl.classList.replace('is-success', 'is-disabled');
    }
}

function getPage (users, listElemArr) {
    for (let i = 0; i < users.length; i++) {
        listElemArr[i].data = `${users[i].id}`;
        listElemArr[i].innerHTML = `
        <img src='${users[i].avatar}' style="display: block" alt="user avatar" widht="100%" >
        <span class="userInfo">${users[i].first_name} ${users[i].last_name}</span>
        <p class="userEmail">Write me: ${users[i].email}</p>`;
    }
}

function sentRequest(method, url) {
    newUrl = new URL(url);
    newUrl.searchParams.set(`page`, `${paginator}`);
    const xhr = new XMLHttpRequest();
    xhr.open(method, newUrl, false);
    xhr.send();
    const { data : users } = JSON.parse(xhr.response);
    return users;
}

function patchRequest(url, body={}) {
    let changedUser = {};
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    console.log(xhr.status);
    changedUser = JSON.parse(xhr.response);
    console.log(changedUser);
    return changedUser;
}

function deleteRequest(url, body={}) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

function authPostRequest(method, url, body={}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(String(body));
    const { token : key } = JSON.parse(xhr.response);
    if (key == `QpwL5tke4Pnpja7X4`) {
        arrorInfo.classList.add("arror--show");
        arrorInfo.innerText = "Authorization is successful";
        setTimeout(() => {
            formEl.style.display = 'none';
            passEl.style.display = 'none';
            arrorInfo.classList.remove("arror--show");
            boxListEl.style.display = 'block';
        }, 2000);
    } else {
        arrorInfo.classList.add("arror--show");
        arrorInfo.innerText = "Incorrect info!! Try again";
    }
}

(() => {
    let usersList = sentRequest('GET', requestUrl);
    console.log(usersList);

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

        if(loginEl.value && passEl.value) {
            authPostRequest(`POST`, `https://reqres.in/api/login`, (`{
                "email": "${loginEl.value}",
                "password": "${passEl.value}"}`
            ));
        } else {
            checkInputValue(loginEl, !validLogin(loginEl.value));
            checkInputValue(passEl, !passEl.value);
            passEl.value = '';
        }
    });

    getPage(sentRequest('GET', requestUrl), cardsEl);
    const usersInfo = document.getElementsByClassName('userInfo');
    const userLogin = document.getElementsByClassName('userEmail');

    prevBtnEl.addEventListener('click', () => {
        paginator > 1 ? --paginator : paginator;  
        getPage(sentRequest('GET', requestUrl), cardsEl);
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
        getPage(sentRequest('GET', requestUrl), cardsEl);
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
                usersList = sentRequest('GET', requestUrl);
                console.log('pressed change_btn');
                formEl.style.display = "block";
                loginEl.value = `${usersList[i].email}`;
                firstNameEl.parentElement.style.display = "block";
                firstNameEl.value = `${usersList[i].first_name}`;
                lastNameEl.parentElement.style.display = "block";
                lastNameEl.value = `${usersList[i].last_name}`;
                loginBtn.style.display = "none";
                formBtnEl.style.display = "block";
                cardsEl[i].id = usersList[i].id;

                formBtnEl.addEventListener('click', (event) => {
                    let changedUserInfo = patchRequest(`https://reqres.in/api/users/${usersList[i].id}`, {
                        email: `${loginEl.value}`,
                        first_name: `${firstNameEl.value}`,
                        last_name: `${lastNameEl.value}`
                    }); 

                    usersInfo[i].innerText = `${changedUserInfo.first_name} ${changedUserInfo.last_name}`;
                    userLogin[i].innerText = `Write me: ${changedUserInfo.email}`;

                    setTimeout(() => {
                        formEl.style.display = 'none';
                        formBtnEl.style.display = 'none';
                    }, 1000);
                }, {'once': true})
            }
        })
    }

    for (let i = 0; i < delBtnEl.length; i++) {
        delBtnEl[i].addEventListener('click', () => {
            console.log('pressed delBtnEl');
            formEl.style.display = "none";
            formBtnEl.style.display = "none";
            if(confirm(`Do you really want to delete profile?`)){
                users = sentRequest('GET', requestUrl);
                deleteRequest(`https://reqres.in/api/users/${users[i].id}`, {
                    email: `${users[i].email}`,
                    first_name: `${users[i].first_name}`,
                    last_name: `${users[i].last_name}`
                });
                for (let index = 0; index < cardsEl.length; index++) {
                    if(cardsEl[index].data == users[i].id ) {
                        cardsEl[index].style.display = 'none';
                        changeBtnEl[index].style.display = 'none';
                        delBtnEl[index].style.display = 'none';
                    }
                }
            }
        })
    }
})();