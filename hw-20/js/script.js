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

function authPostRequest(url) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: `${loginEl.value}`,
            password: `${passEl.value}`
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(key => {
        return key.json();
    })
    .then(key => {
        key = key.token;
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
    })
}

function sentRequest(url, cardsEl) {
    newUrl = new URL(url);
    newUrl.searchParams.set(`page`, `${paginator}`);
    fetch(newUrl)
    .then(users => {
        return users.json();
    })
    .then(users => {
        users = users.data;
        for (let i = 0; i < users.length; i++) {
            cardsEl[i].data = `${users[i].id}`;
            cardsEl[i].innerHTML = `
            <img src='${users[i].avatar}' style="display: block" alt="user avatar" widht="100%" >
            <span class="userInfo">${users[i].first_name} ${users[i].last_name}</span>
            <p class="userEmail">Write me: ${users[i].email}</p>`;
        }
    })
}

function patchRequest(url, i) {
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            email: `${loginEl.value}`,
            first_name: `${firstNameEl.value}`,
            last_name: `${lastNameEl.value}`
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(changedUser => {
        return changedUser.json();
    })
    .then(changedUser => {
        console.log(changedUser);
        console.log(changedUser.first_name);
        console.log(changedUser.last_name);
        const usersInfo = document.getElementsByClassName('userInfo');
        const userLogin = document.getElementsByClassName('userEmail');
    
        usersInfo[i].innerText = `${changedUser.first_name} ${changedUser.last_name}`;
        userLogin[i].innerText = `Write me: ${changedUser.email}`;
    })
}

function changeUser(url, i){
    newUrl = new URL(url);
    newUrl.searchParams.set(`page`, `${paginator}`);
    fetch(newUrl)
    .then(users => {
        return users.json();
    })
    .then(users => {
        users = users.data;
        loginEl.value = `${users[i].email}`;
        firstNameEl.value = `${users[i].first_name}`;
        lastNameEl.value = `${users[i].last_name}`;
        cardsEl[i].id = users[i].id;

        formBtnEl.addEventListener('click', () => {
            patchRequest(`https://reqres.in/api/users/${users[i].id}`, i);
            setTimeout(() => {
                formEl.style.display = 'none';
                formBtnEl.style.display = 'none';
            }, 1000);
        }, {'once': true});
    })
}

function deleteRequest(url, i, users) {
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({
            email: `${users[i].email}`,
            first_name: `${users[i].first_name}`,
            last_name: `${users[i].last_name}`
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

function deleteUser(url, i){
    newUrl = new URL(url);
    newUrl.searchParams.set(`page`, `${paginator}`);
    fetch(newUrl)
    .then(users => {
        return users.json();
    })
    .then(users => {
        users = users.data;
        deleteRequest(`https://reqres.in/api/users/${users[i].id}`, i, users);
        for (let index = 0; index < cardsEl.length; index++) {
            if(cardsEl[index].data == users[i].id ) {
                cardsEl[index].style.display = 'none';
                changeBtnEl[index].style.display = 'none';
                delBtnEl[index].style.display = 'none';
            }
        }
    })
}

