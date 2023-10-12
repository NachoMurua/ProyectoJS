const productos = [
    {
        item: "Cointreau",
        nombre: "licor Cointreau",
        imagen: "../img/cuantro.png",
        precio: 21000,
        cantidad: 1,
    },
    {
        item: "Absolut",
        nombre: "vodka Absolut",
        imagen: "../img/absolut.png",
        precio: 5000,
        cantidad: 1,
    },
    {
        item: "Bombay",
        nombre: "Gin Bombay",
        imagen: "../img/bombay.png",
        precio: 7500,
        cantidad: 1,
    },
    {
        item: "Heineken",
        nombre: "Cerveza Heineken",
        imagen: "../img/heineken.png",
        precio: 2500,
        cantidad: 1
    }
];



let productosCarrito = [];

const contenedorProductos = document.querySelector('#listaProductos');

let botonesAgregar = document.querySelectorAll('.btn')

const numeroProducto = document.querySelector('#numProd')

function cargarProductos (productosElegidos){


    productosElegidos.forEach (producto => {

        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
        <div class="tarjeta">
            <img src="${producto.imagen}" alt="">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button class="btn" id="${producto.item}">Agregar al carrito</button>
        </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar ();
}

cargarProductos(productos);

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll('.btn');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarCarrito);
    });
}

let carritoProductos;

let productosCarritoLS = localStorage.getItem("productosDelCarrito")

if (productosCarritoLS){
    carritoProductos = JSON.parse(productosCarritoLS);
    actualizarNumero ();
} else {
    carritoProductos = [];
}


function agregarCarrito (evt){

    const itemBoton = evt.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.item === itemBoton);

    if (productosCarrito.some(producto => producto.item === itemBoton)){
        const index = productosCarrito.findIndex(producto => producto.item === itemBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    actualizarNumero ();

    localStorage.setItem('productosDelCarrito', JSON.stringify(productosCarrito))
}

function actualizarNumero(){
    let nuevoNumero = productosCarrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    numeroProducto.innerText = nuevoNumero; 
} 