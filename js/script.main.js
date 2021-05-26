// dd5cb627
function movieSearch() {
    // untuk mengosongkan beranda saat request selanjutnya
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'dd5cb627',
            's': $('#search-input').val()
        },

        // jika sukses
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
                                    <a href="#" class="card-link">See Deatils</a>
                                </div>
                            </div>
                        <div>
                    `);
                });

                // untuk mengosongkan inputan
                $('#search-input').val('');

                // jika gagal
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

$('#search-button').on('click', function () {
    movieSearch();
});

// add tombol keyboar
$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        movieSearch();
    }
});