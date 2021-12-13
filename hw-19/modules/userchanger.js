function patchRequest(url, i, login, firstname, lastname) {
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            email: `${login.value}`,
            first_name: `${firstname.value}`,
            last_name: `${lastname.value}`
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

function changeUser(newUrl, i, page, login, firstname, lastname, cards, form, formbtn){
    newUrl.searchParams.set(`page`, `${page}`);
    fetch(newUrl)
    .then(users => {
        return users.json();
    })
    .then(users => {
        users = users.data;
        login.value = `${users[i].email}`;
        firstname.value = `${users[i].first_name}`;
        lastname.value = `${users[i].last_name}`;
        cards[i].id = users[i].id;

        formbtn.addEventListener('click', () => {
            patchRequest(`https://reqres.in/api/users/${users[i].id}`, i, login, firstname, lastname);
            setTimeout(() => {
                form.style.display = 'none';
                formbtn.style.display = 'none';
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

function deleteUser(newUrl, i, page, cards, changebtn, delbtn){
    newUrl.searchParams.set(`page`, `${page}`);
    fetch(newUrl)
    .then(users => {
        return users.json();
    })
    .then(users => {
        users = users.data;
        deleteRequest(`https://reqres.in/api/users/${users[i].id}`, i, users);
        for (let index = 0; index < cards.length; index++) {
            if(cards[index].data == users[i].id ) {
                cards[index].style.display = 'none';
                changebtn[index].style.display = 'none';
                delbtn[index].style.display = 'none';
            }
        }
    })
}

export {changeUser, deleteUser};