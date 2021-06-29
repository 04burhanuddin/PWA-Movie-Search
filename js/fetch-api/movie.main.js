// dd5cb627 adalah kode api key yang bisa di dapatkan melalui email
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

        // jika sukses mengambil data
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                // console.log(movies);

                // response jika berhasil/jika data di temukan
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

// fungsi ini akan menampilkan dari detail film dengan click detail yang ada pada element movie list yang di amil dengan menggunakan
// jquery
$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'dd5cb627',
            'i': $(this).data('id')
        },

        // jika sukses
        success: function (movie) {
            if (movie.Response === "True") {
                //ini berfungsi untuk mengisi element html yagn afa pada halam index denhgan id modal-body
                //untuk mengisi detail dari film
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

// fungsi ini di jalankan  ketika search button di tekan dengan fungsi yang sufah di buat paling atas yaitu moviesearch
$('#search-bottom').on('click', function () {
    movieSearch();
});

// add tombol keyboar, ini berfunsi untuk pencarian dengan mengguankan tombol enter
$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        movieSearch();
    }
});