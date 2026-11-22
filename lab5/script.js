/* ===================== Завдання 1 ===================== */
// Т — текст, Ч — число (див. табл. 2 методички)
const rules = {
    // Прізвище І. І. (допустимі пробіл між ініціалами або без нього)
    fio: {
        regex: /^[А-ЯІЇЄҐ][а-яіїєґ'’-]{1,}\s[А-ЯІЇЄҐ]\.\s?[А-ЯІЇЄҐ]\.$/,
        label: 'ПІБ',
        hint: 'Формат: Іванов І. І.'
    },
    // ТТТТ
    faculty: {
        regex: /^[А-ЯІЇЄҐA-Zа-яіїєґa-z]{2,10}$/,
        label: 'Факультет',
        hint: 'Лише літери, 2–10 символів, напр. ФІОТ'
    },
    // ЧЧ.ЧЧ.ЧЧЧЧ  (додатково перевіряється існування дати)
    birth: {
        regex: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,
        label: 'Дата народження',
        hint: 'Формат: ДД.ММ.РРРР (існуюча дата), напр. 01.01.2000',
        extra: isRealDate
    },
    // м. Т
    address: {
        regex: /^м\.\s?[А-ЯІЇЄҐ][а-яіїєґ'’-]+(\s[А-ЯІЇЄҐа-яіїєґ'’-]+)*$/,
        label: 'Адреса',
        hint: 'Формат: м. Назва міста (спочатку «м.», потім назва міста)'
    },
    // тттттт@ттттт.com
    email: {
        regex: /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+(-[A-Za-z0-9]+)*\.[a-z]{2,}$/,
        label: 'e-mail',
        hint: 'Формат: xxx@gmail.com'
    }
};

function isRealDate(value) {
    const [d, m, y] = value.split('.').map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
        && date <= new Date();
}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let ok = true;
    const result = [];

    for (const id in rules) {
        const input = document.getElementById(id);
        const row = document.getElementById('row-' + id);
        const value = input.value.trim();
        const rule = rules[id];
        const valid = rule.regex.test(value) && (!rule.extra || rule.extra(value));

        row.classList.toggle('error', !valid);
        row.querySelector('.msg').textContent = valid ? '' : rule.hint;
        if (!valid) ok = false;
        result.push([rule.label, value]);
    }

    const box = document.getElementById('result');
    box.hidden = true;
    if (ok) showInWindow(result);
});

document.querySelectorAll('#form input').forEach(function (inp) {
    inp.addEventListener('input', function () {
        inp.closest('.row').classList.remove('error');
    });
});

function showInWindow(data) {
    const w = window.open('', '_blank', 'width=420,height=320');
    if (!w) {
        const box = document.getElementById('result');
        box.innerHTML = '<b>Введена інформація</b><br>' +
            data.map(function (p) { return esc(p[0]) + ': ' + esc(p[1]); }).join('<br>');
        box.hidden = false;
        return;
    }
    let html = '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><title>Введені дані</title></head>'
        + '<body style="font-family:Arial;margin:20px"><h3>Введена інформація</h3><table border="1" cellpadding="6" style="border-collapse:collapse">';
    data.forEach(function (p) {
        html += '<tr><td><b>' + esc(p[0]) + '</b></td><td>' + esc(p[1]) + '</td></tr>';
    });
    html += '</table></body></html>';
    w.document.write(html);
    w.document.close();
}

function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

const VARIANT = 10;
const SIZE = 6;
const grid = document.getElementById('grid');
const picker = document.getElementById('picker');

for (let r = 0; r < SIZE; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < SIZE; c++) {
        const td = document.createElement('td');
        td.textContent = r * SIZE + c + 1;
        tr.appendChild(td);
    }
    grid.appendChild(tr);
}

const cell = grid.rows[Math.floor((VARIANT - 1) / SIZE)].cells[(VARIANT - 1) % SIZE];
cell.classList.add('target');

function randomColor() {
    return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}

// colour, який "закріплений" кліком/подвійним кліком (початково — без кольору)
let fixedColor = '';

// наведення — тимчасовий випадковий колір
cell.addEventListener('mouseover', function () {
    cell.style.backgroundColor = randomColor();
});

// курсор пішов — повертаємо закріплений колір (його не перезаписує наведення)
cell.addEventListener('mouseout', function () {
    cell.style.backgroundColor = fixedColor;
});

// клік — колір з палітри
cell.addEventListener('click', function () {
    fixedColor = picker.value;
    cell.style.backgroundColor = fixedColor;
});

// подвійний клік — клітинки рядка, починаючи з обраної, через одну
cell.addEventListener('dblclick', function () {
    fixedColor = picker.value;
    const row = cell.parentElement;
    for (let i = cell.cellIndex; i < row.cells.length; i += 2) {
        row.cells[i].style.backgroundColor = picker.value;
    }
});
