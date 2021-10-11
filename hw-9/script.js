function onBtnClick() {
    let usersText = document.getElementById('text');
    console.log(usersText.value);
    usersText.value = '';
}

document.getElementById('button').onclick = onBtnClick;