// $('.search-button').on('çlick', function() {
//     $.ajax({
//         url: 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + $('.input-keyword').val(),
//         success: results => {
//             const team = results.teams;
//             let cards = '';
//             team.forEach(t => {
//                 cards += showCards(t)
//             });
//             $('.team-container').html(cards);


//             // ketika tombol detail diklik
//             $('modal-detail-button').on('click', function() {

//             })
//         },
//         error: (e) => {
//             console.log(e.responseText)
//         }

//     })
// })

// fetch

const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', function() {

    const inputKeyword = document.querySelector('.input-keyword')
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=71a1d381&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const team = response.Search;
            let cards = '';
            team.forEach(t => cards += showCards(t));
            const teamContainer = document.querySelector('.team-container');
            teamContainer.innerHTML = cards;

            // ketika tombal dtail diklik
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => {
                
                btn.addEventListener('click', function() {
                    const imdbid = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=71a1d381&i=' + imdbid)
                        .then(response => response.json())
                        .then(t => {
                            const teamDetail = showDetails(t);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = teamDetail;
                        })
                })
            })
        })
})




function showCards(t) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${t.Poster}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${t.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${t.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#teamDetailModal" data-imdbid="${t.imdbID}">Show Details</a>
        </div>
    </div>
</div>`
}

function showDetails(t) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${t.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <h4>${t.Title} ${t.Year})</h4>
                </li>
                <li class="list-group-item"><strong>Director : </strong>${t.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${t.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong>${t.Writer}</li>
                </li>
                <li class="list-group-item"><strong>Plot : </strong> <br>${t.Plot}</li>
            </ul>
        </div>
    </div>
</div>`
}