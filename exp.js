const inputs = document.querySelectorAll('input');
const btnSubmit = document.querySelector('#submit');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const form = document.querySelector('#newUserForm');
const loader = document.querySelector('.lds-dual-ring')

const users = JSON.parse(localStorage.getItem('users')) || [];// на входе получаем массив. Либо если это новая сессия с пустым сторейджем, тогда приходит пустой массив. Если в хранилище что-то есть, то парсится массив объектов.

for(user of users){//сразу отрисовываются все юзеры
    renderShortInfo(user)}

form.addEventListener('submit', getUser); //по сабмиту вызываем функцию getUser

class User{ //конструктор класса User
    constructor(name, phone, email){
        this.name = name,
        this.phone = phone,
        this.email = email
        this.id = User.id++
    }

    static id = users.length //чтобы сохранялась нумерация при запуске новой сессии
}

function getUser(event){
    
    event.preventDefault();
    const name = form.querySelector('#name'),//инпут имя
        phone = form.querySelector('#phone'),//инпут телефон
        email = form.querySelector('#email');//инпут мыло 
    
    const user = new User(name.value, phone.value, email.value);// создаем нового юзера
    console.log(user)
    users.push(user);//добавляем юзера в массив
    localStorage.setItem('users' , JSON.stringify(users))//кладем массив в сторейдж
    renderShortInfo(user);//вызываем функцию отрисовки юзера
    this.reset();
    
    for(input of inputs){ //очищаем инпуты для последующего ввода
        input.value = '' 
    }    
    console.log(users)
}
function renderShortInfo(obj){ //функция отрисовки юзера. На вход подается объект из массива.Для него создаем див, присваиваем ему класс, id и внутреннее наполнение. 
    const div = document.createElement('div'); 
    div.classList.add('short-info');
    div.id = 'person_' + obj.id;
    div.innerHTML = `<h2>${obj.name}</h2><p>${obj.phone}</p><br><button id='${obj.id}'class='delete'>Delete</button>`;
    div.onclick = fullInfo; // по клику на отрисованный див вызывается функция, рисующая полную информацию.
    left.append(div);//добавляем див в уже имеющийся в разметке
}

function fullInfo(event){
    //console.log(event.currentTarget) //див, по которому был клик
    const id = +event.currentTarget.id.split('_')[1];//поле id
    if(!event.target.classList.contains('delete')){//если клик не был произведен по кнопке "удалить", то в массиве users ищется юзер с таким id.
        const contact = users.find(u => u.id === id);
        //console.log(contact)
        right.innerHTML = '';//вывод полной информации очищается
        const userWrapper = document.createElement('div');//создается новый див с классом и наполнением, который добавляется в вывод полной информации справа
        userWrapper.classList.add('user-wrapper');
        userWrapper.innerHTML = `<h3>${contact.name}</h3><h2>${contact.phone}</h2><p>${contact.email}</p>`;
        right.append(userWrapper);
    }
    
    else{
        removeUser(event.currentTarget)//если клик по кнопке "удалить", то запускаем функцию удаления
    }
}

function removeUser(element){//функция удаления. На вход приходит элемент див    
    const id = +element.id.split('_')[1]
    const toRemove = users.find(u => u.id === id)
    
    users.splice(users.indexOf(toRemove), 1) //убираем элемент из массива, содержащего все объекты
    
    localStorage.setItem('users' , JSON.stringify(users)) //обновляем массив в storage после удаления
    element.remove() //удаляем сам див, отрисовку
    right.innerHTML = ''

}
    



