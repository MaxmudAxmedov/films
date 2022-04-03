let elHeader = document.getElementById('header');
let elSelect = document.querySelector('.form-select');
let elList = document.querySelector('.films-list');
let elSelectList = document.querySelector('.select-list');
let elInput = document.querySelector('.form-control')
let elForm = document.querySelector('form');
let elSortBtn = document.querySelector('.sort-btn');
let elModal = document.querySelector('.modals');

let localStorage = JSON.parse(window.localStorage.getItem('bookmark')); 
let bookmark = [];

function bookmarkFunc(film, list) {

    list.innerHTML = '';
    film.forEach(render => {
        let title = render.title.split(" ", 3).join(' ');

        let elLi = document.createElement('li');
        let elCard = document.createElement('div');
        let elCardBody = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elBtnDelete = document.createElement('button');

        elLi.classList.add('list-group-item', 'p-0')
        elCard.classList.add('card');
        elCardBody.classList.add('card-body','d-flex','p-0', 'px-3', 'justify-content-between', 'align-items-center')
        elTitle.classList.add('card-title', 'm-0');
        elBtnDelete.classList.add('btn','btn-danger');

        elLi.dataset.idNumber = render.id;
        elTitle.textContent = title;
        elBtnDelete.textContent = 'Delete';
        elBtnDelete.dataset.idNumber = render.id;

        elCard.appendChild(elCardBody);
        elCardBody.appendChild(elTitle);
        elCardBody.appendChild(elBtnDelete);
        elLi.appendChild(elCard);
        list.appendChild(elLi);
    })
}


let arrGenres = [];
// filter function
function filterFunc (film) {
    film.forEach(element => {
        element.genres.forEach(type => {
            if(!arrGenres.includes(type)){
                arrGenres.push(type);
            }
        })
    })
    
    arrGenres.forEach(genre => {
        let elOption = document.createElement('option');
        elOption.value = genre;
        elOption.textContent = genre;
        elSelect.appendChild(elOption);
    })  

}
filterFunc(films);

elHeader.addEventListener('click', function (e) {
    if(e.target.matches('.sort-btn')){
        elList.innerHTML = '';
        let filmSort = films.sort((a, b) => {
            if(a.title < b.title){
                return -1;
            }
        })
        renderFunc(filmSort, elList)
    }
})

// function renderFunc
function renderFunc (film, list) {

    film.forEach(render => {
        let title = render.title.split(" ", 3).join(' ');

        let elLi = document.createElement('li');
        let elCard = document.createElement('div');
        let elImg = document.createElement('img');
        let elCardBody = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elBtnBox = document.createElement('div');
        let elBtnInfo = document.createElement('button');
        let elBtnSuccess = document.createElement('button');

        elLi.classList.add('list-group-item', 'p-0')
        elCard.classList.add('card');
        elImg.classList.add('card-img-top');
        elCardBody.classList.add('card-body',)
        elTitle.classList.add('card-title', 'm-0', 'mb-3');
        elBtnBox.classList.add('d-flex', 'mt-5');
        elBtnSuccess.classList.add('btn','btn-success');
        elBtnInfo.classList.add('btn','btn-info');

        elLi.dataset.idNumber = render.id;
        elImg.src = render.poster;
        elTitle.textContent = title;
        elBtnSuccess.textContent = 'Bookmark';
        elBtnSuccess.dataset.idNumber = render.id;
        elBtnInfo.textContent = 'More'
        elBtnInfo.dataset.idNumber = render.id;

        elCard.appendChild(elImg);
        elCard.appendChild(elCardBody);
        elCardBody.appendChild(elTitle);
        elBtnBox.appendChild(elBtnInfo);
        elBtnBox.appendChild(elBtnSuccess);
        elCardBody.appendChild(elBtnBox);
        elLi.appendChild(elCard);
        list.appendChild(elLi);
    })

}
renderFunc(films, elList);

// search function 
elInput.addEventListener('keypress', function (e) {
    let inputValue = e.target.value.toLowerCase();
    
    let searchFilm = films.filter(names => {
        return names.title.toLowerCase().includes(inputValue);
    })
    
    elList.innerHTML = '';
    window.localStorage.setItem('list', JSON.stringify(searchFilm));
    renderFunc(searchFilm, elList);
})

// selected function
elForm.addEventListener('click', function () {
    let elSelectValue = elSelect.value;
    let filterFilm = elSelectValue == "All" ? films : films.filter(element => element.genres.includes(elSelectValue));

    elList.innerHTML = '';
    window.localStorage.setItem('filter', JSON.stringify(filterFilm));
    renderFunc(filterFilm, elList);
})


elSelectList.addEventListener('click', function (e) {

    let elBtnId = e.target.matches('.btn-danger');

    if(elBtnId){
        let btnDelId = e.target.dataset.idNumber;
        let idNum = bookmark.findIndex(a => a.id == btnDelId);
        bookmark.splice(idNum, 1);
        bookmarkFunc(bookmark, elSelectList);
    }
})

let modal = [];
function modalFunc (film, element){
    element.innerHTML = "";
    film.forEach(render => {
        let title = render.title.split(" ", 3).join(' ');
        let elCard = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elText = document.createElement('p');
        let elBtnClose = document.createElement('button');

        elCard.classList.add('card');
        elTitle.classList.add('card-title', 'm-0', 'mb-3');
        elText.classList.add('card-text');
        elBtnClose.classList.add('btn', 'btn-danger');

        elBtnClose.textContent = 'X';
        elBtnClose.dataset.idNumber = render.id;
        elTitle.textContent = title;
        elText.textContent = render.overview;

        elCard.appendChild(elBtnClose);
        elCard.appendChild(elTitle);
        elCard.appendChild(elText);
        element.appendChild(elCard);
    })
}


elList.addEventListener('click', function (e) {
    let btnBookmark = e.target.matches('.btn-success');
    if(btnBookmark){
        let btnId = e.target.dataset.idNumber;
        let idNum = films.find(a => a.id == btnId);
        if(!bookmark.includes(idNum)){
            bookmark.push(idNum);
            window.localStorage.setItem('bookmark', JSON.stringify(bookmark));
            bookmarkFunc(bookmark, elSelectList);
        }
    }
})


// modal add function
elList.addEventListener('click', function (e) {
    let btnMore = e.target.matches('.btn-info');
    if(btnMore){
        let btnId = e.target.dataset.idNumber;
        let idNum = films.find(a => a.id == btnId);
        if(!modal.includes(idNum)){
            modal.push(idNum);
            modalFunc(modal, elModal);
        }  
    }
})

//modal close function
document.body.addEventListener('click', function (e) {
    let btnDelete = e.target.matches('.btn-danger');    
    if(btnDelete){
        let btnId = e.target.dataset.idNumber;
        let btnClose = bookmark.findIndex(a => a.id == btnId);
        modal.splice(btnClose, 1);
        modalFunc(modal, elModal);
    }
    else if (!e.target.matches('.btn-info')){
        let btnId = e.target.dataset.idNumber;
        let btnClose = bookmark.findIndex(a => a.id == btnId);
        modal.splice(btnClose, 1);
        modalFunc(modal, elModal);
    }
})


