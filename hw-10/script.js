(() => {
    const btnEl = document.getElementById('button');
    const usersTask = document.getElementById('task');
    const list = document.getElementById('list');

    btnEl.addEventListener('click', () => {
        const newTask = document.createElement(`li`);
        const checkbox = document.createElement(`input`);
        const deleteBtn = document.createElement(`button`);

        newTask.innerText = `${usersTask.value}`;
        list.appendChild(newTask);
        usersTask.value = '';

        newTask.appendChild(checkbox);
        newTask.appendChild(deleteBtn);
        checkbox.setAttribute('type', 'checkbox');

        checkbox.addEventListener('click', () => {
            newTask.classList.toggle('line');
        })

        deleteBtn.innerText = 'delete';
        deleteBtn.addEventListener('click', () => {
            newTask.remove();
        })
    })
})();