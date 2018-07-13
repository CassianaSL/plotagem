for (let i = 1996; i <= 2014; i++) {
    const url = `https://cors.io/?http://dados.fee.tche.br/ckan-download/fee-${i}-mun-internacoes-hospitalares-taxa-de-mortalidade-por-ano-102336.csv`;
    fetch(url).then(texto).then(processa).catch(console.error);
}

function texto(r) {
    return r.text();
}

const municipios = [];
const anos = [];
const select = document.querySelector('#select');
const guardaDados = {
    'ano96':[],
    'ano97':[],
    'ano98':[],
    'ano99':[],
    'ano00':[],
    'ano01':[],
    'ano02':[],
    'ano03':[],
    'ano04':[],
    'ano05':[],
    'ano06':[],
    'ano07':[],
    'ano08':[],
    'ano09':[],
    'ano10':[],
    'ano11':[],
    'ano12':[],
    'ano13':[],
    'ano14':[]
};

const numeros = [];

function processa(texto) {
    const linhas = texto.split('\n');
    const dados = [];
    const ano = (Number(texto[79]+texto[80]+texto[81]+texto[82]));
    for (let linha = 2; linha < linhas.length - 1; linha++) {
        const coluna = linhas[linha].split(',');
        const dado = {
            municipio: coluna[0].replace(/"/g, ''),
            taxa: Number(coluna[4].replace(/"/g, '').replace('.', ''))
        };
        if (!municipios.includes(dado.municipio)) {
            municipios.push(dado.municipio);
        }
        numeros.push(dado.taxa);
        dados.push(dado);
    }
    guardaDados[`ano${texto[81]+texto[82]}`] = dados;

    anos.push(ano);
    // console.table(dados);
    if (anos.length === 19) {
        for (const i of municipios) {
            const option = document.createElement('option');
            option.textContent = i;
            select.append(option);
        }
    }
}

// Até aqui leitura do fech

const cidadesSelecionadas = [];
const buttonSelect = document.querySelector('#enviarSelect');
const cidadeArea = document.querySelector('.nomeCidades');
const years = document.querySelectorAll('.years');

function colorRGB() {
    const cores = [];
    for (let i = 0; i < 3; i++) {
        cores[i] = parseFloat(Math.random() * 256);
    }
    return `rgb(${cores[0]}, ${cores[1]}, ${cores[2]})`;
}
function cor() {
    const cor = document.createElement('div');
    cor.style.width = '20px';
    cor.style.height = '20px';
    cor.style.backgroundColor = colorRGB();
    cor.style.border = '0.2px solid black';
    return cor;
}

function botaoTrash() {
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = 'trash.png';
    img.style.height = '15px';
    img.style.width = '15px';
    button.append(img);
    button.class = 'trash';
    button.style.width = '30px';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    return button;
}

function taxaMunicipio(municipio) {
    const taxas = [];
    for (let i = 1996; i < 2014; i++) {
        const perAno = guardaDados[`ano${(i+'')[2]}${(i+'')[3]}`];
        for (const ind of perAno) {
            if (ind.municipio === municipio) {
                taxas.push(`${(i+'')[2]}${(i+'')[3]}y${ind.taxas}`);
            }
        }
    }
    return taxas;
}

function createGraphic(taxa, className) {
    for (i of years) {
        const year = taxa.slice(0, taxa.indexOf('y'));
        const numero = Number(taxa.slice(taxa.indexOf('y')+1,));
        const div = document.createElement('div');
        div.className = `year ${className}`;
        div.height = `${i}%`;
        // l.slice(l.indexOf('y')+1,)
        if (years[0].parentElement)
    }
}

function createLegend(selectValue, className) {
    const div = document.createElement('div');
    div.className = className;
    const label = document.createElement('label');
    label.textContent = selectValue;
    div.append(cor());
    div.append(label);
    div.append(botaoTrash());
    cidadeArea.append(div);
    cidadesSelecionadas.push(selectValue);
}

buttonSelect.addEventListener('click', function(e) {
    e.preventDefault();
    if (!cidadesSelecionadas.includes(select.value)) {
        const className = select.value.replace(/\s+/g, '-').toLowerCase();
        createLegend(select.value, className);
    }
});

// move to Trash

cidadeArea.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') {
        const div = e.target.tagName === 'BUTTON' ? e.target.parentElement :
            e.target.parentElement.parentElement;
        const delet = document.querySelectorAll(`.${div.className}`);
        for (const i of delet) {
            i.remove();
        }
    }
});
