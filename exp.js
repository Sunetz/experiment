const inputs = document.querySelectorAll('input');
const btnSubmit = document.querySelector('#submit');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const form = document.querySelector('#newUserForm');
const users = JSON.parse(localStorage.getItem('users')) || [];
for(user of users){
    renderShortInfo(user)}

form.addEventListener('submit', getUser);

class User{
    constructor(name, phone, email){
        this.name = name,
        this.phone = phone,
        this.email = email
        this.id = User.id++
    }

    static id = users.length
}

function getUser(event){
    event.preventDefault();
    const name = form.querySelector('#name'),
        phone = form.querySelector('#phone'),
        email = form.querySelector('#email');
    
    const user = new User(name.value, phone.value, email.value);
    console.log(user)

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users))
    renderShortInfo(user);
    this.reset();
    
    for(input of inputs){
        input.value = ''
    }    
}
function renderShortInfo(obj){
    const div = document.createElement('div');
    div.classList.add('short-info');
    div.id = 'person_' + obj.id;
    div.innerHTML = `<h2>${obj.name}</h2><p>${obj.phone}</p><br><button id='${obj.id}'class='delete'>Delete</button>`;
    div.onclick = fullInfo;
    left.append(div);
}

function fullInfo(event){

    const id = +event.currentTarget.id.split('_')[1];
    if(event.target.innerText !== 'Delete'){
    const contact = users.find(u => u.id === id);
    right.innerHTML = '';
    const userWrapper = document.createElement('div');
    userWrapper.classList.add('user-wrapper');
    userWrapper.innerHTML = `<h3>${contact.name}</h3><h2>${contact.phone}</h2><p>${contact.email}</p>`;
    right.append(userWrapper);
    }
    else{
        removeUser(event.currentTarget)
    }
}

function removeUser(element){
    element.remove()
    users.splice(element.id, 1)
    localStorage.removeItem('users'[element.id])
}






