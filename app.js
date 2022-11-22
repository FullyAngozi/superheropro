const statBody = document.querySelectorAll('.tab-body-single');
const tabButton = document.querySelectorAll('.button');
const searchForm = document.querySelector('.form');
let searchList = document.querySelector('.search-list');


let activeTab = 1;

let allData;
const start = () => {
    showActiveTabBody();
    showActiveTabHead();
}



const showActiveTabHead = () => tabButton[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    statBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => statBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => tabButton.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// event listeners
window.addEventListener('DOMContentLoaded', () => start());
// button event listeners
tabButton.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

searchForm.addEventListener('click', getInputValue);

const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
            console.log(allData);
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
    searchList.remove();
});

const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.thumbnail').innerHTML = `
        <img src = "${data[0].image.url}">
    `;

    document.querySelector('.hero-name').textContent = data[0].name;
    document.querySelector('.Powerstat').innerHTML = `
    <li>
        <i class="fa-solid fa-meteor"></i>
        <span>Intelligence</span>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <i class="fa-solid fa-meteor"></i>
        <span>Strength</span>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <i class="fa-solid fa-meteor"></i>
        <span>Speed</span>
        <span>${data[0].powerstats.speed}</span>
    </li>
    
    `;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name:</span>
         <span>${data[0].biography['full-name']}</span>
    </li>
   <li>
        <span>Publisher:</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
   <li>
      <span>place of birth:</span>
      <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li> 
        <span>first-apperance:</span>
        <span>${data[0].biography['first-apperance']}</span>
    </li>
    `;

    document.querySelector('.Appearance').innerHTML = `
    
    <li>
        <span><i class="fa-solid fa-eye"></i>Gender</span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span><i class="fa-solid fa-eye"></i>Race</span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span><i class="fa-solid fa-eye"></i>Height</span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span><i class="fa-solid fa-eye"></i>Weight</span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span><i class="fa-solid fa-eye"></i>Eye-color</span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li> 
        <span><i class="fa-solid fa-eye"></i>hair-color</span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>

    
    `;


}

