window.onload = init;
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
    axios.get(url + "/directory", headers)
        .then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        })
}

function displayDirectory(directory) {
    var body = document.querySelector("body");
    for (var i = 0; i < directory.length; i++){
        body.innerHTML += `<h3>${directory[i].lastName}</h3>`;
    }
}