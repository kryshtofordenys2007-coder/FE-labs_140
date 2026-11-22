const schemes = [
    { bg: '#ffeb3b', color: '#b71c1c' },
    { bg: '#1a237e', color: '#ffffff' } 
];

let clicks1 = 0;
let clicks2 = 0;

function applyScheme(el, count) {
    const s = schemes[count % schemes.length];
    el.style.backgroundColor = s.bg;
    el.style.color = s.color;
}

const element1 = document.getElementById('fio');
element1.addEventListener('click', function () {
    applyScheme(element1, clicks1);
    clicks1++;
});

const element2 = document.querySelector('p.birth');
element2.addEventListener('click', function () {
    applyScheme(element2, clicks2);
    clicks2++;
});

const gallery = document.getElementById('gallery');
const STEP = 50;    
const START_WIDTH = 400;

function currentImage() {
    const imgs = gallery.querySelectorAll('img');
    return imgs.length ? imgs[imgs.length - 1] : null;
}

document.getElementById('btn-add').addEventListener('click', function () {
    const img = document.createElement('img');
    img.src = 'images/city.jpg';
    img.alt = 'Фото міста Звенигородка';
    img.width = START_WIDTH;
    gallery.appendChild(img);
});

document.getElementById('btn-increase').addEventListener('click', function () {
    const img = currentImage();
    if (img) img.width = img.width + STEP;
});

document.getElementById('btn-decrease').addEventListener('click', function () {
    const img = currentImage();
    if (img && img.width > STEP * 2) img.width = img.width - STEP;
});

document.getElementById('btn-delete').addEventListener('click', function () {
    const img = currentImage();
    if (!img) return;
    const link = img.parentElement;
    (link.tagName === 'A' ? link : img).remove();
});
