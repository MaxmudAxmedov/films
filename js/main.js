let elSelect = document.querySelector('.form-select');
let elList = document.querySelector('.list-group');
let elInput = document.querySelector('.form-control')
let elForm = document.querySelector('form');

// function dateTime
function dateTime () {
    let get = new Date();
    let day = get.getDay().toLocaleString().padStart(2, '0');
    let moth = get.getMonth().toLocaleString().padStart(2, '0');
    let year = get.getFullYear();

    return `${day}. ${moth}. ${year}`;
}

// search function 
elInput.addEventListener('keypress', function (e) {
    let inputValue = e.target.value.toLowerCase();
    
    let searchFilm = films.filter(names => {
        return names.title.toLowerCase().includes(inputValue);
    })
    
    elList.innerHTML = '';
    searchFilm.forEach(a => {

        let elLi = document.createElement('li');
        elLi.classList.add('list-group-item', 'p-0')

        let result = 
        `
            <div class="card">
                <img class="card-img-top" src=${a.poster}>
                <div class="card-body">
                    <h5 class="card-title m-0 mb-3">${a.title}</h5>
                    <p class="card-text">${a.genres}</p>
                    <time>${dateTime(a.release_date)}</time>
                </div>
            </div>
        `
        elLi.innerHTML = result;
        elList.appendChild(elLi);
    })
})

// function filterFunc
let arrGenres = [];
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

// function renderFunc
function renderFunc (film) {

    film.forEach(render => {
        let elLi = document.createElement('li');
        elLi.classList.add('list-group-item', 'p-0')
        let title = render.title.split(" ", 3).join(' ');

        let result = 
            `
                <div class="card">
                    <img class="card-img-top" src=${render.poster}>
                    <div class="card-body">
                        <h5 class="card-title m-0 mb-3">${title}</h5>
                        <p class="card-text">${render.genres}</p>
                        <time>${dateTime(render.release_date)}</time>
                    </div>
                </div>
            `
    elLi.innerHTML = result;
    elList.appendChild(elLi);
    })

}
renderFunc(films)

// selected function
elForm.addEventListener('click', function () {

    let elSelectValue = elSelect.value;
    let filterFilm = elSelectValue == "All" ? films : films.filter(element => element.genres.includes(elSelectValue));

    elList.innerHTML = '';

    filterFilm.forEach(a => {

        let elLi = document.createElement('li');
        elLi.classList.add('list-group-item', 'p-0')

        let result = 
        `
            <div class="card">
                <img class="card-img-top" src=${a.poster}>
                <div class="card-body">
                    <h5 class="card-title m-0 mb-3">${a.title}</h5>
                    <p class="card-text">${a.genres}</p>
                    <time>${dateTime(a.release_date)}</time>
                </div>
            </div>
        `
        elLi.innerHTML = result;
        elList.appendChild(elLi);
    })
})



