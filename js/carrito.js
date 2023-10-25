let productosDelCarrito = localStorage.getItem("productosDelCarrito")

productosCarrito = JSON.parse(localStorage.getItem("productosDelCarrito"))

const carritoVacio = document.querySelector('#carritoVacioId')
const carritoDeProductos = document.querySelector('#productosCarritoId')
const carritoAccion = document.querySelector('#carritoAccionesId')
let botonesEliminar = document.querySelectorAll('#btnEliminarProductoId')
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if (productosCarrito && productosCarrito.length > 0){

        carritoVacio.classList.add("desaparecer");
        carritoDeProductos.classList.remove("desaparecer");
        carritoAccion.classList.remove("desaparecer");
    
        carritoDeProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("productoCarrito")
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.item}">
                <div class="nombreProducto">
                    <small>Item</small>
                    <h4>${producto.nombre}</h4>
                </div>
                <div class="cantidadProducto">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="precioProducto">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="subtotalProducto">
                    <small>subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                    <button class="btnEliminarProducto" id="${producto.item}" >X</button>
            `
            carritoDeProductos.append(div);
        })
    actualizarTotal();
    
    } else {
        carritoVacio.classList.remove("desaparecer");
        carritoProductos.classList.add("desaparecer");
        carritoAccion.classList.add("desaparecer");
    }

    actualizarBotonesEliminar();
}

cargarProductosCarrito();


function actualizarBotonesEliminar (){
    botonesEliminar = document.querySelectorAll('#btnEliminarProductoId');

    botonesEliminar.forEach(boton =>{
        boton.addEventListener('click', eliminarDelCarrito);
    });
}

function eliminarDelCarrito (e){
    const itemBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.item === itemBoton)
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosDelCarrito", JSON.stringify(productosCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito (){
    
}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productosDelCarrito", JSON.stringify(productosCarrito));
    carritoVacio.classList.add("desaparecer");
    carritoProductos.classList.remove("desaparecer");
    carritoAccion.classList.remove("desaparecer");
}






/*let productos = [];


const contenedorProductos = document.querySelector("#listaP");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".btn");
const numerito = document.querySelector("#numProd");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

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

    actualizarBotonesAgregar();
}


/* botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



/* NUEVO INTENTO DE CARRITO */

/* const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"))

const carritoVacio = document.querySelector('#carritoVacioId')
const carritoDeProductos = document.querySelector('#productosCarritoId')
const carritoAccion = document.querySelector('#carritoAccionesId')
let botonesEliminar = document.querySelectorAll('#btnEliminarProductoId')
const contenedorTotal = document.querySelector("#total");

if (productosCarrito){

    carritoVacio.classList.add("desaparecer");
    carritoDeProductos.classList.remove("desaparecer");
    carritoAccion.classList.remove("desaparecer");
    
    productosCarrito.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carritoProducto");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.item}">
        <div class="nombreProducto">
            <small>Item</small>
            <h4>${producto.nombre}</h4>
        </div>
        <div class="cantidadProducto">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="precioProducto">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="subtotalProducto">
            <small>subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
            <button class="btnEliminarProducto" id="${producto.item}" >X</button>
        `

    })
} else {

} */