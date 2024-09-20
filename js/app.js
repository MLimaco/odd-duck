'use strict';

const nombreProductos = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const allProductos = [];

const elementoIzq = document.getElementById('img1');
const elementoCent = document.getElementById('img2');
const elementoDer = document.getElementById('img3');
const contenedorImagenes = document.getElementById('imagenes');
const elementosResultados = document.getElementById('resultados');
const botonResultados = document.getElementById('mostrarResultados');
const botonReiniciar = document.getElementById('reiniciar');

function Producto(name, path) {
    this.name = name;
    this.path = path;
    this.click = 0;
    this.views = 0;
}

function listarProductos() {
    for (let i = 0; i < nombreProductos.length; i++) {
        let pathImage = 'img/' + nombreProductos[i] + '.jpg';

        if (nombreProductos[i] === 'sweep') {
            pathImage = 'img/' + nombreProductos[i] + '.png';
        }

        let producto = new Producto(nombreProductos[i], pathImage);
        allProductos.push(producto);
    }
}

function tresNumerosAleatorios() {
    const numeros = [];
    while (numeros.length < 3) {
        const nuevoNumero = Math.floor(Math.random() * nombreProductos.length);
        if (numeros.includes(nuevoNumero) === false) {
            numeros.push(nuevoNumero);
        }
    }
    console.log(numeros);
    return numeros;
}

const productRank = {
    totalClick: 0,
    votosRonda: 25,
    objetoIzq: null,
    objetoCent: null,
    objetoDer: null,

    mostrarImagenes: function () {
        const index = tresNumerosAleatorios();
        productRank.objetoIzq = allProductos[index[0]];
        productRank.objetoCent = allProductos[index[1]];
        productRank.objetoDer = allProductos[index[2]];

        //visualizaciones
        productRank.objetoIzq.views += 1;
        productRank.objetoCent.views += 1;
        productRank.objetoDer.views += 1;

        //imagen izquierda
        elementoIzq.src = productRank.objetoIzq.path;
        elementoIzq.name = productRank.objetoIzq.name;

        //imagen centro
        elementoCent.src = productRank.objetoCent.path;
        elementoCent.name = productRank.objetoCent.name;

        //imagen derecha    
        elementoDer.src = productRank.objetoDer.path;
        elementoDer.name = productRank.objetoDer.name;
    },

    contarClick: function (id) {
        for (let i = 0; i < allProductos.length; i++) {
            if (allProductos[i].name === id) {
                allProductos[i].click += 1;
                this.totalClick += 1;
                console.log(allProductos[i].name + 'tiene ' + allProductos[i].click + ' clicks');
            }
        }
    },

    mostrarResultados: function () {
        const lista = document.createElement('ul');
        for (let i = 0; i < allProductos.length; i++) {
            const item = document.createElement('li');
            const contenido = allProductos[i].name + ':  ' + 'tiene ' + allProductos[i].click + ' ' + '  clicks';
            item.textContent = contenido;
            lista.appendChild(item);
        }
        const itemFinal = document.createElement('li');
        itemFinal.textContent = 'total de clicks: ' + productRank.totalClick;
        lista.appendChild(itemFinal);
        elementosResultados.appendChild(lista);
    },
    mostrarBoton: function () {
        botonResultados.hidden = false;
        botonResultados.addEventListener('click', function () {
            botonReiniciar.hidden = false;
            botonResultados.hidden = true;
            productRank.mostrarResultados();
            renderChart();
            saveLocalStorage();
        });
        botonReiniciar.addEventListener('click', function () {
            // botonReiniciar.hidden = true;
            location.reload();
        });
    },
    onClick: function (event) {
        if (event.target.name === productRank.objetoIzq.name || event.target.name === productRank.objetoCent.name || event.target.name === productRank.objetoDer.name) {
            productRank.contarClick(event.target.name);
            if (productRank.totalClick % productRank.votosRonda === 0) {
                contenedorImagenes.removeEventListener('click', productRank.onClick);
                productRank.mostrarBoton();
            }
            productRank.mostrarImagenes();
            console.log(event);
        } else {
            alert('haz click en una imagen');
        }
        console.log(event);
    },

}

function renderChart() {
    const ctx = document.getElementById('canvas').getContext('2d');
    const productVotes = [];
    const productTitle = [];
    const productViews = [];

    for (let i = 0; i < allProductos.length; i++) {
        const elemento = allProductos[i];
        productVotes.push(elemento.click);
        productTitle.push(elemento.name);
        productViews.push(elemento.views);
    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productTitle,
            datasets: [
                {
                    label: '# de click',
                    data: productVotes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# de views',
                    data: productViews,
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        display: false,
                    },

                }
            }
        },
    })

}
// console.log(productRank.numeroAleatorio())

function saveLocalStorage() {
    const productosJSON = JSON.stringify(allProductos);
    localStorage.setItem('productos', productosJSON);
}
function getDataLocalStorage() {
    let productosRecuperados = localStorage.getItem('productos');
    if (productosRecuperados !== null) {
        let conversion = JSON.parse(localStorage.getItem('productos'));
        console.log(conversion);
        for (let i = 0; i < conversion.length; i++) {
            let index = conversion[i];
            let construccion = new Producto(index.name, index.path);
            construccion.click = index.click;
            construccion.view = index.view;
            allProductos.push(construccion);
        }
    } else {
        listarProductos();
    }
}
function start() {
    getDataLocalStorage();
    contenedorImagenes.addEventListener('click', productRank.onClick);
    productRank.mostrarImagenes();
}
start();