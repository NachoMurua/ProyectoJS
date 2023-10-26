let productosDelCarrito = localStorage.getItem("productosDelCarrito");

productosCarrito = JSON.parse(localStorage.getItem("productosDelCarrito"));

const carritoVacio = document.querySelector('#carritoVacioId');
const carritoDeProductos = document.querySelector('#productosCarritoId');
const carritoAccion = document.querySelector('#carritoAccionesId');
let botonesEliminar = document.querySelectorAll('#btnEliminarProductoId');
const botonVaciar = document.querySelector("#vaciarCarritoId");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if (productosCarrito && productosCarrito.length > 0){

        carritoVacio.classList.add("desaparecer");
        carritoDeProductos.classList.remove("desaparecer");
        carritoAccion.classList.remove("desaparecer");
    
        carritoDeProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("productoCarrito");
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
                    <button class="btnEliminarProducto" id="${producto.item}">X</button>
            `;
            carritoDeProductos.append(div);
        })

    actualizarBotonesEliminar();
    actualizarTotal();
    
    } else {
        carritoVacio.classList.remove("desaparecer");
        carritoDeProductos.classList.add("desaparecer");
        carritoAccion.classList.add("desaparecer");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar (){
    botonesEliminar = document.querySelectorAll('.btnEliminarProducto');
    botonesEliminar.forEach(boton =>{
        boton.addEventListener('click', eliminarDelCarrito);
    });
}

function eliminarDelCarrito (e){
    const itemBoton = e.currentTarget.item;
    const index = productosCarrito.findIndex(producto => producto.item === itemBoton);

    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosDelCarrito", JSON.stringify(productosCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    productosCarrito.length = 0;
    localStorage.setItem("productosDelCarrito", JSON.stringify(productosCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}