function sentRequest(cardsEl, newUrl, page) {
    newUrl.searchParams.set(`page`, `${page}`);
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

export {sentRequest};