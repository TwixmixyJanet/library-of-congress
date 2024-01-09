const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value.trim();
    const formatInputVal = document.querySelector('#format-input').value.trim();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    let queryString = `./search-results.html?q=${searchInputVal}&format=${formatInputVal}`;

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);