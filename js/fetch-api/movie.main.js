// dd5cb627 adalah kode api key yang bisa di dapatkan melalui email
function movieSearch() {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'dd5cb627',
            's': $('#search-input').val()
        },

        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                // console.log(movies);
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img class="card-img-top" src="` + data.Poster + `"alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#detail"
                                    data-id="`+ data.imdbID + `">See Deatils</a>
                                </div>
                            </div>
                        <div>
                    `);
                });

                // untuk mengosongkan inputan
                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
}

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'dd5cb627',
            'i': $(this).data('id')
        },

        success: function (movie) {
            if (movie.Response === "True") {
                $('#modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">`+ movie.Title + `</li>
                                    <li class="list-group-item">`+ movie.Released + `</li>
                                    <li class="list-group-item">`+ movie.Runtime + `</li>
                                    <li class="list-group-item">`+ movie.Director + `</li>
                                    <li class="list-group-item">`+ movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    });
});

$('#search-bottom').on('click', function () {
    movieSearch();
});

$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        movieSearch();
    }
});