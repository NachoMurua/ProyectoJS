let productos = [];

fetch("./js/productos.json")
    .then (Response => Response.json())
    .then (datos => {
        productos = datos;
        cargarProductos(productos)
    })

let productosCarrito = [];

const contenedorProductos = document.querySelector('#listaProductos');

let botonesAgregar = document.querySelectorAll('.btn');

const numeroProducto = document.querySelector('.numeroProd');

function cargarProductos (productosElegidos){
    
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="tarjeta">
            <img src="${producto.imagen}" alt="${producto.item}">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button class="btn" id="${producto.item}">Agregar al carrito</button>
        </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar ();
}

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll('.btn');
    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarCarrito);
    });
}

let carritoProductos;

let productosCarritoLS = localStorage.getItem("productosDelCarrito");

if (productosCarritoLS){
    productosCarrito  = JSON.parse(productosCarritoLS);
    actualizarNumerito ();
} else {
    productosCarrito  = [];
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
    actualizarNumerito ();

    localStorage.setItem('productosDelCarrito', JSON.stringify(productosCarrito));
}

function actualizarNumerito (){
    let nuevoNumerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroProducto.innerHTML = nuevoNumerito;
}