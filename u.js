const search = document.getElementById('searchInput');
const button = document.getElementById('submit');
const resultsContainer = document.getElementById('List');

button.addEventListener('click', function () {
    let inputText = search.value;
    searchMovies(inputText);
});

const searchMovies = async (query) => {
    try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=62a4b8ec&s=${query}`);
        renderData(res.data.Search);
    } catch (err) {
        console.log(err);
    }
};

const renderData = (movies) => {
    resultsContainer.innerHTML = '';

    if (!movies || movies.length === 0) {
        const message = document.createElement('p');
        message.innerHTML = 'ไม่สามารถหาหนังที่คุณต้องการได้';
        resultsContainer.appendChild(message);
        return;
    }

    movies.forEach((movie) => {
        const movieContainer = document.createElement('div');
        const title = document.createElement('h2');
        title.innerHTML = movie.Title;

        const detail = document.createElement('button');
        detail.innerHTML = 'DETAIL'

        const year = document.createElement('h3');
        year.innerHTML = movie.Year;

        const t = document.createElement('h5');
        t.innerHTML = movie.Type;
        
        movieContainer.appendChild(title)
        movieContainer.appendChild(year)
        movieContainer.appendChild(t)
        movieContainer.appendChild(detail)
        ;
        if (movie.Poster) {
            const img = document.createElement('img');
            img.src = movie.Poster;
            movieContainer.appendChild(img);
        } else {
            console.log('no poster')
        }
        resultsContainer.appendChild(movieContainer);
    });
};