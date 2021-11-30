function getPage (users, lestElemArr) {
    for (let i = 0; i < users.length; i++) {
        lestElemArr[i].innerHTML = `
        ${users[i].id}. <img src='${users[i].avatar}' width='60' height='60'> ${users[i].first_name} ${users[i].last_name}, e-mail: ${users[i].email}`;
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

function postRequest(method, url, body={}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

const liEl = document.getElementsByTagName('li');
const prevBtnEl = document.getElementById('prevBtn');
const nextBtnEl = document.getElementById('nextBtn');
const formEl = document.getElementById('form');
const emailEl = document.getElementById('inputEmail');
const firstNameEl = document.getElementById('inputFirstName');
const lastNameEl = document.getElementById('inputLastName');
const avatarEl = document.getElementById('inputAvatar');
const requestUrl = 'https://reqres.in/api/users';
let paginator = 1;

getPage(sentRequest('GET', requestUrl), liEl);

prevBtnEl.addEventListener('click', () => {
    paginator > 1 ? --paginator : paginator;  
    getPage(sentRequest('GET', requestUrl), liEl);
    console.log('pressed prev_btn');
})

nextBtnEl.addEventListener('click', () => {
    paginator < 2 ? ++paginator : paginator;  
    getPage(sentRequest('GET', requestUrl), liEl);
    console.log('pressed next_btn');
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    postRequest('POST', requestUrl, {
        email: `${emailEl.value}`,
        first_name: `${firstNameEl.value}`,
        last_name: `${lastNameEl.value}`,
        avatar: `${avatarEl.value}`
    })
})
