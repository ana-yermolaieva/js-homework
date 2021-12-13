function authPostRequest(url, login, pass, arror, form, boxlist) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: `${login.value}`,
            password: `${pass.value}`
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
            arror.classList.add("arror--show");
            arror.innerText = "Authorization is successful";
            setTimeout(() => {
                form.style.display = 'none';
                pass.style.display = 'none';
                arror.classList.remove("arror--show");
                boxlist.style.display = 'block';
            }, 2000);
        } else {
            arror.classList.add("arror--show");
            arror.innerText = "Incorrect info!! Try again";
        }
    })
}

export {authPostRequest};