window.onload = init;

function init() {
    if (localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = 'directory.html'
        });

        document.querySelector('.btn-primary').addEventListener('click', cambiar);
    }
}

function cambiar() {
    var id = document.getElementById('input-id').value;
    var nombre = document.getElementById('input-name').value;
    var apellido = document.getElementById('input-lastName').value;
    var tel = document.getElementById('input-phone').value;
    var correo = document.getElementById('input-mail').value;
    var domicilio = document.getElementById('input-country').value;

    axios({
        method: 'put',
        url: 'http://localhost:3000/directory/' + id,
        data: {
            name: nombre,
            lastName: apellido,
            phone: tel,
            mail: correo,
            country: domicilio
        }
    }).then(function (res) {
        alert("Cambio realizado, sáquese!")
        window.location.href = "login.html"
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    })
}