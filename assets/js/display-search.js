const resultTextEl = document.querySelector('#result-text');
const resultContentEl = document.querySelector('#result-content');
const searchFormEl = document.querySelector('#search-form');

function getParams() {
    const searchParamsArr = document.location.search.split('&');

    const query = searchParamsArr[0].split('=').pop();
    const format = searchParamsArr[1].split('=').pop();

    searchApi(query, format);
}

function printResults(resultObj) {
    console.log(resultObj);

    let resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    let resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    let titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    let bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = `<strong>Date:</strong> ${resultObj.date}<br />`;

    if (resultObj.subject) {
        bodyContentEl.innerHTML += `<strong>Subjects:</strong> ${resultObj.subject.join(', ')}<br />`;
    } else {
        bodyContentEl.innerHTML += `<strong>Subjects:</strong> No subject for this entry.`;
    }

    if (resultObj.description) {
        bodyContentEl.innerHTML += `<strong>Description:</strong> ${resultObj.description[0]}`;
    } else {
        bodyContentEl.innerHTML += `<strong>Description:</strong> No description for this entry.`;
    }

    let linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleEl, bodyContentEl, linkButtonEl);

    resultContentEl.append(resultCard);
}

function searchApi(query, format) {
    let locQueryUrl = `https://www.loc.gov/search/?fo=json`;

    if (format) {
        locQueryUrl = `https://www.loc.gov/${format}/?fo=json`;
    }

    locQueryUrl = `${locQueryUrl}&q=${query}`;

    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            resultTextEl.textContent = locRes.search.query;

            console.log(locRes);

            if (!locRes.results.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = `<h3>No results found, search again!</h3>`;
            } else {
                resultContentEl.textContent = '';
                for (let i = 0; i < locRes.results.length; i++) {
                    printResults(locRes.results[i]);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input').value.trim();
    let formatInputVal = document.querySelector('#format-input').value.trim();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    searchApi(searchInputVal, formatInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();