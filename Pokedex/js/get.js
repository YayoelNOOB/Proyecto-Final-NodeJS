window.onload = init;

function init() {
    if (localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = 'directory.html'
        });

        document.querySelector('.btn-primary').addEventListener('click', obtener);
    }
}

function obtener() {
    var id = document.getElementById('input-id').value;

    axios({
        method: 'get',
        url: 'http://localhost:3000/directory/' + id,
    }).then(function (res) {
        console.log(res);
            displayDirectory(res.data.message);
        }).catch(function (err) {
            console.log(err);
        })
}

function displayDirectory(directory) {
    var body = document.querySelector("body");
    for (var i = 0; i < directory.length; i++){
        body.innerHTML += `<h3>${directory[i].name} ${directory[i].lastName} ${directory[i].phone} ${directory[i].mail} ${directory[i].country}</h3>`;
    }
}

/*indow.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadDirectory();
    } else {
        window.location = "index.html";
    }
}

function loadDirectory() {
    axios.get(url + "/directory" + id, headers)
        .then(function (res) {
            console.log(res);
            displayDirectory(res.data.message);
        }).catch(function (err) {
            console.log(err);
        })
}

function displayDirectory(directory) {
    var body = document.querySelector("body");
    for (var i = 0; i < directory.length; i++){
        body.innerHTML += `<h3>${directory[i].lastName}</h3>`;
    }
}*/