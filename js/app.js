'use strict';

const nombreProductos = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const allProductos = [];

function Producto(name, path) {
    this.name = name;
    this.path = path;
    this.click = 0;
    this.views = 0;
}

function listarProductos() {
    for (let i = 0; i < nombreProductos.length; i++) {
        if (nombreProductos[i] === 'sweep') {
            let producto = new Producto(nombreProductos[i], 'img/' + nombreProductos[i] + '.jpg');
            allProductos.push(producto);
        } else {
            let producto = new Producto(nombreProductos[i], 'img/' + nombreProductos[i] + '.jpg');
            allProductos.push(producto);
        }
    }
}

listarProductos();
console.log(allProductos);

const productRank = {
    totalClick: 0,
    votosRonda: 25,
    objetoIzq: null,
    objetoCent: null,
    objetoDer: null,

    elementoIzq: document.getElementById('img1'),
    elementoCent: document.getElementById('img2'),
    elementoDer: document.getElementById('img3'),

    contenedorImagenes: document.getElementById('imagenes'),
    elementosResultados: document.getElementById('resultados'),

    botonResultados: document.getElementById('mostrarResultados'),
    botonReiniciar: document.getElementById('reiniciar'),

    numeroAleatorio: function () {
        return Math.floor(Math.random() * nombreProductos.length);
    },

    mostrarImagenes: function () {
        productRank.objetoIzq = allProductos[productRank.numeroAleatorio()];
        productRank.objetoCent = allProductos[productRank.numeroAleatorio()];
        productRank.objetoDer = allProductos[productRank.numeroAleatorio()];

        //visualizaciones
        productRank.objetoIzq.views += 1;
        productRank.objetoCent.views += 1;
        productRank.objetoDer.views += 1;

        //imagen izquierda
        productRank.elementoIzq.src = productRank.objetoIzq.path;
        productRank.elementoIzq.src = productRank.objetoIzq.name;

        //imagen centro
        productRank.elementoCent.src = productRank.objetoCent.path;
        productRank.elementoCent.src = productRank.objetoCent.name;

        //imagen derecha    
        productRank.elementoDer.src = productRank.objetoDer.path;
        productRank.elementoDer.src = productRank.objetoDer.name;
    },

    contarClick: function (id) {
        for (let i = 0; i < allProductos.length; i++) {
            if (allProductos[i].name === id) {
                allProductos[i].click += 1;
                this.totalClick += 1;
                console.log(allProductos[i].name + 'tiene' + allProductos[i].click + 'clicks');
            }
        }
    },

    mostrarResultados: function () {
        const lista = document.createElement('ul');
        for (let i = 0; i < allProductos.length; i++) {
            const item = document.createElement('li');
            console.log(allProductos[i].name + 'tiene' + allProductos[i].click + 'clicks');
            item.textContent = contenido;
            lista.appendChild(item);
        }
        const itemFinal = document.createElement('li');
        itemFinal.textContent = 'total de clicks' + productRank.totalClick;
        lista.appendChild(itemFinal);
        this.elementosResultados.appendChild(lista);
    },
    mostrarBoton: function () {
        this.botonResultados.hidden = false;
        this.botonResultados.addEventListener('click', function () {
            productRank.botonReiniciar.hidden = false;
            productRank.botonResultados.hidden = true;
            productRank.mostrarResultados();

            productRank.botonReiniciar.addEventListener('click', function () {
                productRank.botonReiniciar.hidden = true;
            });
        });
    },
    onClick: function (event) {
        if (event.target.id === productRank.objetoIzq.name || event.target.id === productRank.objetoCent.name || event.target.id === productRank.objetoDer.name) {
            productRank.contarClick(event.target.id);
            if (productRank.totalClick % productRank.votosRonda === 0) {
                productRank.contenedorImagenes.removeEventListener('click', productRank.onClick);
                productRank.mostrarBoton();
            }
            productRank.mostrarImagenes();
        } else {
            alert('haz click en una imagen');
        }
        console.log(event);
    },

}

// console.log(productRank.numeroAleatorio())

productRank.contenedorImagenes.addEventListener('click', productRank.onClick);
productRank.mostrarImagenes();