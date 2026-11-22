const API_URL = 'https://randomuser.me/api';

function loadUser() {
    const errorBox = document.getElementById('error');
    errorBox.textContent = '';

    fetch(API_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            render(data.results[0]);
        })
        .catch(function (err) {
            errorBox.textContent = 'Не вдалося отримати дані: ' + err.message;
        });
}

function render(user) {
    document.getElementById('picture').src = user.picture.large;
    document.getElementById('postcode').textContent = user.location.postcode;
    document.getElementById('coordinates').textContent =
        user.location.coordinates.latitude + ', ' + user.location.coordinates.longitude;
    document.getElementById('email').textContent = user.email;
    document.getElementById('city').textContent = user.location.city;
    document.getElementById('card').hidden = false;
}

document.getElementById('load').addEventListener('click', loadUser);
