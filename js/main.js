/* VARIABLES */

const bebida1 = "Vino"
const bebida2 = "Cerveza"
const bebida3 = "Gancia"
const bebida4 = "Vodka"
const precioVodka = 12000
const precioGancia = 1500
const precioCerveza = 350
const precioVino = 1900
const carrito = [];
let precio;
let respuesta;
let edad;
let cantidad;
let subtotal=0;
let bebida;

edad = prompt("¡Bienvenido a DrinkALot! Ingrese su edad:")

function ingresoTienda(){
    if (edad >= 18){
        function mostrarCatalogo() {
            console.log('--- Nuestras bebidas ---');
            catalogo.forEach(bebida => {
                console.log(`Producto: ${bebida.producto} \nBebida: ${bebida.bebida} \nNombre: ${bebida.marca} \nPrecio: $${bebida.precio} \nGraduacion alcoholica: ${bebida.graduacion}`);
        });
            console.log('------------------------------');
        }
        // Funcion bebidas
        function agregarAlCarrito() {
            const producto = parseInt(prompt('Ingrese el numero de producto que desea agregar al carrito'));
            const cantidad = parseInt(prompt('Ingrese la cantidad de unidades que desea comprar'));
            const bebidaSeleccionada = catalogo.find(bebida => bebida.producto === producto);
        
        if (bebidaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
            const subtotal = bebidaSeleccionada.precio * cantidad;
            carrito.push({ producto: bebidaSeleccionada, cantidad, subtotal });
            console.log(`"${bebidaSeleccionada.bebida}" (${cantidad} Unidad/es) se añadio a su orden`);
        } else {
            console.log('Error al agregar producto al carrito. Vuelva a intentarlo');
        }
        }
        
        // Contenido del carrito
        function mostrarCarrito() {
        console.log('--- Subtotal ---');
        let total = 0;
        
        carrito.forEach(item => {
            console.log(`${item.producto.bebida} (${item.cantidad} unidades) - Subtotal: $${item.subtotal}`);
            total += item.subtotal;
        });
        
        console.log('------------------------');
        console.log(`Total: $${total}`);
        }
        
        // Función filter
        function filtrarPorPrecio() {
            const precioLimite = parseFloat(prompt('Ingrese el precio máximo para filtrar:'));
            if (!isNaN(precioLimite)) {
            const productosFiltrados = carrito.filter(item => item.precio <= precioLimite);
        
            if (productosFiltrados.length > 0) {
            console.log(`Productos por debajo de $${precioLimite}:`);
            productosFiltrados.forEach(item => {
                console.log(`${item.producto.bebida} (${item.cantidad} unidades) - Subtotal: $${item.subtotal}`);
            });
            } else {
            console.log('No hay productos que cumplan con el filtro');
            }
        } else {
            console.log('Precio inválido.');
        }
        }
        // Interaccion del usuario
        while (true) {
            const opcion = parseInt(prompt('Elija una opción: \n1. Catalogo \n2. Agregar productos \n3. Mostrar carrito\n4. Filtrar por precios\n5. Salir de la tienda'));
            if (opcion === 1) {
            mostrarCatalogo();
            } else if (opcion === 2) {
            agregarAlCarrito();
            } else if (opcion === 3) {
            mostrarCarrito();
            } else if (opcion === 4) {
            filtrarPorPrecio();
            } else if (opcion === 5) {
            console.log('¡Gracias por visitar DrinkALot!');
            break;
            } else {
            alert('Opción no válida. Volver a intentarlo');
            }
        }
    } else {
        alert (`No podes pasar, volve en ${18-edad} años`)
    }
}

ingresoTienda();