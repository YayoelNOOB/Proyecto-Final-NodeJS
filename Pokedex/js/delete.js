window.onload = init;

function init() {
    if (localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = 'directory.html'
        });

        document.querySelector('.btn-primary').addEventListener('click', borrar);
    }
}

function borrar() {
    var id = document.getElementById('input-id').value;

    axios({
        method: 'delete',
        url: 'http://localhost:3000/directory/' + id
    }).then(function (res) {
        alert("Despido completado, ve por tu finiquito!")
        window.location.href = "login.html"
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    })
}