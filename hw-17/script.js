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

function sentRequest(method, url, callback) {
    newUrl = new URL(url);
    newUrl.searchParams.set(`page`, `${paginator}`);
    const xhr = new XMLHttpRequest();
    xhr.open(method, newUrl);
    xhr.send();
    xhr.onload = (e) => {
        const { data : users } = JSON.parse(e.currentTarget.responseText);
        callback(users, cardsEl);
    };
}

function patchRequest(url, body={}, callback) {
    let changedUser = {};
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    xhr.onload = (e) => {
        changedUser = JSON.parse(e.currentTarget.responseText);
        console.log(changedUser);
        callback(changedUser);
    }
}

function deleteRequest(url, body={}, callback) {
    let deletedUser = {};
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    xhr.onload = () => {
        callback(deletedUser);
    }
}

function authPostRequest(method, url, body={}, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(String(body));
    xhr.onload = (e) => {
        const { token : key } = JSON.parse(e.currentTarget.responseText);
        callback(key);
    }
}

(() => {
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
            ), (key) => {
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
            });
        } else {
            checkInputValue(loginEl, !validLogin(loginEl.value));
            checkInputValue(passEl, !passEl.value);
            passEl.value = '';
        }
    });

    sentRequest('GET', requestUrl, (users, cardsEl) => {
        for (let i = 0; i < users.length; i++) {
            cardsEl[i].data = `${users[i].id}`;
            cardsEl[i].innerHTML = `
            <img src='${users[i].avatar}' style="display: block" alt="user avatar" widht="100%" >
            <span class="userInfo">${users[i].first_name} ${users[i].last_name}</span>
            <p class="userEmail">Write me: ${users[i].email}</p>`;
        }
    });
   
    prevBtnEl.addEventListener('click', () => {
        paginator > 1 ? --paginator : paginator;  
        sentRequest('GET', requestUrl, (users, cardsEl) => {
            for (let i = 0; i < users.length; i++) {
                cardsEl[i].data = `${users[i].id}`;
                cardsEl[i].innerHTML = `
                <img src='${users[i].avatar}' style="display: block" alt="user avatar" widht="100%" >
                <span class="userInfo">${users[i].first_name} ${users[i].last_name}</span>
                <p class="userEmail">Write me: ${users[i].email}</p>`;
            }
        });
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
        sentRequest('GET', requestUrl, (users, cardsEl) => {
            for (let i = 0; i < users.length; i++) {
                cardsEl[i].data = `${users[i].id}`;
                cardsEl[i].innerHTML = `
                <img src='${users[i].avatar}' style="display: block" alt="user avatar" widht="100%" >
                <span class="userInfo">${users[i].first_name} ${users[i].last_name}</span>
                <p class="userEmail">Write me: ${users[i].email}</p>`;
            }
        });
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
                sentRequest('GET', requestUrl, (users, cardsEl) => {
                    console.log('pressed change_btn');
                    console.log(users); // реально выводит нам список, но вытащить его не можем
                    formEl.style.display = "block";
                    loginEl.value = `${users[i].email}`;
                    firstNameEl.parentElement.style.display = "block";
                    firstNameEl.value = `${users[i].first_name}`;
                    lastNameEl.parentElement.style.display = "block";
                    lastNameEl.value = `${users[i].last_name}`;
                    loginBtn.style.display = "none";
                    formBtnEl.style.display = "block";
                    cardsEl[i].id = users[i].id;

                    formBtnEl.addEventListener('click', (e) => {
                        patchRequest(`https://reqres.in/api/users/${users[i].id}`, {
                            email: `${loginEl.value}`,
                            first_name: `${firstNameEl.value}`,
                            last_name: `${lastNameEl.value}`
                        }, (changedUser) => {
                            console.log(changedUser);
                            console.log(changedUser.first_name);
                            console.log(changedUser.last_name);
                            const usersInfo = document.getElementsByClassName('userInfo');
                            const userLogin = document.getElementsByClassName('userEmail');
                        
                            usersInfo[i].innerText = `${changedUser.first_name} ${changedUser.last_name}`;
                            userLogin[i].innerText = `Write me: ${changedUser.email}`;
                        }); 

                        setTimeout(() => {
                            formEl.style.display = 'none';
                            formBtnEl.style.display = 'none';
                        }, 1000);
                    }, {'once': true})
                });
            }
        })
    }

    for (let i = 0; i < delBtnEl.length; i++) {
        delBtnEl[i].addEventListener('click', () => {
            console.log('pressed delBtnEl');
            formEl.style.display = "none";
            formBtnEl.style.display = "none";
            if(confirm(`Do you really want to delete profile?`)){
                sentRequest('GET', requestUrl, (users) => {
                    deleteRequest(`https://reqres.in/api/users/${users[i].id}`, {
                        email: `${users[i].email}`,
                        first_name: `${users[i].first_name}`,
                        last_name: `${users[i].last_name}`
                    }, () => {
                        for (let index = 0; index < cardsEl.length; index++) {
                            if(cardsEl[index].data == users[i].id ) {
                                cardsEl[index].style.display = 'none';
                                changeBtnEl[index].style.display = 'none';
                                delBtnEl[index].style.display = 'none';
                            }
                        }
                    });
                });
            }
        })
    }
})();