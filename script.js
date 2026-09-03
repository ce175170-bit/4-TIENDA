
/* =========================================================
   TIENDA J.F.B. — SCRIPT.JS
   Colegio Juan Francisco Bohórquez
   ========================================================= */


/* =========================================================
   1. CONFIGURACIÓN
   ========================================================= */

// Número de WhatsApp del vendedor.
//
// Bolivia = 591 + número
//
// EJEMPLO:
// const SELLER_WHATSAPP = "59170000000";
//
// REEMPLAZAR POR EL NÚMERO REAL.

const SELLER_WHATSAPP = "59169621569";


/* =========================================================
   2. VARIABLES
   ========================================================= */

let carrito = [];


/* =========================================================
   3. ELEMENTOS DEL HTML
   ========================================================= */

const btnCarrito = document.getElementById("btnCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");

const carritoPanel = document.getElementById("carritoPanel");
const carritoProductos = document.getElementById("carritoProductos");
const carritoVacio = document.getElementById("carritoVacio");

const cantidadCarrito = document.getElementById("cantidadCarrito");
const totalCarrito = document.getElementById("totalCarrito");

const overlay = document.getElementById("overlay");

const btnRealizarPedido =
    document.getElementById("btnRealizarPedido");


/* FORMULARIO */

const modalPedido = document.getElementById("modalPedido");
const btnCerrarModal = document.getElementById("btnCerrarModal");

const formularioPedido =
    document.getElementById("formularioPedido");

const tipoPersona =
    document.getElementById("tipoPersona");

const campoCurso =
    document.getElementById("campoCurso");

const curso =
    document.getElementById("curso");


/* RESUMEN DEL FORMULARIO */

const resumenFormulario =
    document.getElementById("resumenFormulario");

const totalFormulario =
    document.getElementById("totalFormulario");


/* CONFIRMACIÓN */

const modalConfirmacion =
    document.getElementById("modalConfirmacion");

const btnCerrarConfirmacion =
    document.getElementById("btnCerrarConfirmacion");


/* BUSCADOR */

const buscadorProductos =
    document.getElementById("buscadorProductos");

const listaProductos =
    document.getElementById("listaProductos");

const sinResultados =
    document.getElementById("sinResultados");


/* =========================================================
   4. BOTONES "AGREGAR AL CARRITO"
   ========================================================= */

const botonesAgregar =
    document.querySelectorAll(".btn-agregar");


botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const nombre =
            boton.dataset.nombre;

        const precio =
            Number(boton.dataset.precio);

        agregarAlCarrito(nombre, precio);

    });

});


/* =========================================================
   5. AGREGAR PRODUCTO
   ========================================================= */

function agregarAlCarrito(nombre, precio) {

    const productoExistente =
        carrito.find(producto =>
            producto.nombre === nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }


    actualizarCarrito();

    abrirCarrito();

}


/* =========================================================
   6. ACTUALIZAR CARRITO
   ========================================================= */

function actualizarCarrito() {

    carritoProductos.innerHTML = "";


    /* SI ESTÁ VACÍO */

    if (carrito.length === 0) {

        carritoProductos.appendChild(crearCarritoVacio());

        btnRealizarPedido.disabled = true;

    } else {

        carrito.forEach((producto, indice) => {

            const elemento =
                crearProductoCarrito(producto, indice);

            carritoProductos.appendChild(elemento);

        });

        btnRealizarPedido.disabled = false;

    }


    /* CANTIDAD TOTAL */

    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    cantidadCarrito.textContent =
        cantidadTotal;


    /* TOTAL */

    const total =
        calcularTotal();


    totalCarrito.textContent =
        total.toFixed(2);


    /* ACTUALIZAR RESUMEN */

    actualizarResumenFormulario();

}


/* =========================================================
   7. CREAR MENSAJE DE CARRITO VACÍO
   ========================================================= */

function crearCarritoVacio() {

    const contenedor =
        document.createElement("div");

    contenedor.className =
        "carrito-vacio";


    const icono =
        document.createElement("span");

    icono.textContent = "🛒";


    const titulo =
        document.createElement("h3");

    titulo.textContent =
        "Tu carrito está vacío";


    const texto =
        document.createElement("p");

    texto.textContent =
        "Agrega productos para comenzar tu pedido.";


    contenedor.appendChild(icono);
    contenedor.appendChild(titulo);
    contenedor.appendChild(texto);


    return contenedor;

}


/* =========================================================
   8. CREAR PRODUCTO DENTRO DEL CARRITO
   ========================================================= */

function crearProductoCarrito(producto, indice) {

    const elemento =
        document.createElement("div");

    elemento.className =
        "carrito-item";


    elemento.style.cssText = `
        padding: 15px 0;
        border-bottom: 1px solid #dddddd;
    `;


    /* NOMBRE */

    const nombre =
        document.createElement("h3");

    nombre.textContent =
        producto.nombre;


    nombre.style.cssText = `
        font-size: 16px;
        margin-bottom: 6px;
    `;


    /* PRECIO */

    const precio =
        document.createElement("p");

    precio.textContent =
        "Bs. " +
        producto.precio.toFixed(2);


    precio.style.cssText = `
        color: #0a3d1e;
        font-weight: 700;
        margin-bottom: 10px;
    `;


    /* CONTROLES */

    const controles =
        document.createElement("div");


    controles.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    `;


    /* CONTENEDOR CANTIDAD */

    const cantidadContenedor =
        document.createElement("div");


    cantidadContenedor.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
    `;


    /* BOTÓN MENOS */

    const btnMenos =
        document.createElement("button");

    btnMenos.type = "button";

    btnMenos.textContent = "−";

    btnMenos.setAttribute(
        "aria-label",
        "Disminuir cantidad"
    );


    btnMenos.style.cssText = `
        width: 34px;
        height: 34px;
        border: none;
        border-radius: 7px;
        background: #0a3d1e;
        color: white;
        font-size: 20px;
        cursor: pointer;
    `;


    btnMenos.addEventListener(
        "click",
        () => {

            if (producto.cantidad > 1) {

                producto.cantidad--;

            } else {

                carrito.splice(indice, 1);

            }

            actualizarCarrito();

        }
    );


    /* CANTIDAD */

    const cantidad =
        document.createElement("strong");

    cantidad.textContent =
        producto.cantidad;

    cantidad.style.minWidth =
        "25px";

    cantidad.style.textAlign =
        "center";


    /* BOTÓN MÁS */

    const btnMas =
        document.createElement("button");

    btnMas.type = "button";

    btnMas.textContent = "+";

    btnMas.setAttribute(
        "aria-label",
        "Aumentar cantidad"
    );


    btnMas.style.cssText = `
        width: 34px;
        height: 34px;
        border: none;
        border-radius: 7px;
        background: #0a3d1e;
        color: white;
        font-size: 20px;
        cursor: pointer;
    `;


    btnMas.addEventListener(
        "click",
        () => {

            producto.cantidad++;

            actualizarCarrito();

        }
    );


    /* BOTÓN ELIMINAR */

    const btnEliminar =
        document.createElement("button");

    btnEliminar.type = "button";

    btnEliminar.textContent =
        "🗑️ Eliminar";


    btnEliminar.style.cssText = `
        border: none;
        background: transparent;
        color: #b00020;
        font-weight: 700;
        cursor: pointer;
        padding: 8px;
    `;


    btnEliminar.addEventListener(
        "click",
        () => {

            carrito.splice(indice, 1);

            actualizarCarrito();

        }
    );


    cantidadContenedor.appendChild(btnMenos);
    cantidadContenedor.appendChild(cantidad);
    cantidadContenedor.appendChild(btnMas);


    controles.appendChild(cantidadContenedor);
    controles.appendChild(btnEliminar);


    elemento.appendChild(nombre);
    elemento.appendChild(precio);
    elemento.appendChild(controles);


    return elemento;

}


/* =========================================================
   9. CALCULAR TOTAL
   ========================================================= */

function calcularTotal() {

    return carrito.reduce(
        (total, producto) => {

            return total +
                producto.precio *
                producto.cantidad;

        },
        0
    );

}


/* =========================================================
   10. ABRIR CARRITO
   ========================================================= */

function abrirCarrito() {

    carritoPanel.classList.add("abierto");

    carritoPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    overlay.hidden = false;

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   11. CERRAR CARRITO
   ========================================================= */

function cerrarCarrito() {

    carritoPanel.classList.remove(
        "abierto"
    );

    carritoPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    overlay.hidden = true;

    document.body.style.overflow =
        "";

}


/* BOTÓN CARRITO */

btnCarrito.addEventListener(
    "click",
    abrirCarrito
);


/* BOTÓN CERRAR */

btnCerrarCarrito.addEventListener(
    "click",
    cerrarCarrito
);


/* OVERLAY */

overlay.addEventListener(
    "click",
    cerrarCarrito
);


/* =========================================================
   12. ABRIR FORMULARIO
   ========================================================= */

btnRealizarPedido.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {
            return;
        }


        actualizarResumenFormulario();

        cerrarCarrito();

        modalPedido.classList.add(
            "abierto"
        );

        modalPedido.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }
);


/* =========================================================
   13. CERRAR FORMULARIO
   ========================================================= */

function cerrarModalPedido() {

    modalPedido.classList.remove(
        "abierto"
    );

    modalPedido.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


btnCerrarModal.addEventListener(
    "click",
    cerrarModalPedido
);


/* CERRAR HACIENDO CLIC FUERA */

modalPedido.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target === modalPedido
        ) {

            cerrarModalPedido();

        }

    }
);


/* =========================================================
   14. MOSTRAR / OCULTAR CURSO
   ========================================================= */

tipoPersona.addEventListener(
    "change",
    actualizarCampoCurso
);


function actualizarCampoCurso() {

    if (
        tipoPersona.value ===
        "Alumno actual"
    ) {

        campoCurso.hidden = false;

        curso.required = true;

    } else {

        campoCurso.hidden = true;

        curso.required = false;

        curso.value = "";

    }

}


/* =========================================================
   15. RESUMEN DEL PEDIDO EN FORMULARIO
   ========================================================= */

function actualizarResumenFormulario() {

    resumenFormulario.innerHTML = "";


    if (carrito.length === 0) {

        resumenFormulario.textContent =
            "No hay productos.";

        totalFormulario.textContent =
            "0.00";

        return;

    }


    carrito.forEach((producto) => {

        const fila =
            document.createElement("div");


        fila.style.cssText = `
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 8px;
            font-size: 14px;
        `;


        const nombre =
            document.createElement("span");


        nombre.textContent =
            `${producto.nombre} x${producto.cantidad}`;


        const subtotal =
            document.createElement("strong");


        subtotal.textContent =
            "Bs. " +
            (
                producto.precio *
                producto.cantidad
            ).toFixed(2);


        fila.appendChild(nombre);
        fila.appendChild(subtotal);


        resumenFormulario.appendChild(
            fila
        );

    });


    totalFormulario.textContent =
        calcularTotal().toFixed(2);

}


/* =========================================================
   16. FORMULARIO — ENVIAR PEDIDO
   ========================================================= */

formularioPedido.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        /* VERIFICAR CARRITO */

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            cerrarModalPedido();

            return;

        }


        /* DATOS */

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();


        const tipo =
            tipoPersona.value;


        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();


        const descripcion =
            document
                .getElementById("descripcion")
                .value
                .trim();


        const entrega =
            document
                .getElementById("entrega")
                .value;


        /* CURSO */

        let cursoSeleccionado = "";


        if (
            tipo === "Alumno actual"
        ) {

            cursoSeleccionado =
                curso.value;

        }


        /* VALIDACIONES */

        if (!nombre) {

            alert(
                "Por favor, escribe tu nombre completo."
            );

            document
                .getElementById("nombre")
                .focus();

            return;

        }


        if (!tipo) {

            alert(
                "Por favor, selecciona quién eres."
            );

            tipoPersona.focus();

            return;

        }


        if (
            tipo === "Alumno actual" &&
            !cursoSeleccionado
        ) {

            alert(
                "Por favor, selecciona tu curso."
            );

            curso.focus();

            return;

        }


        if (!telefono) {

            alert(
                "Por favor, escribe tu número de teléfono."
            );

            document
                .getElementById("telefono")
                .focus();

            return;

        }


        if (!entrega) {

            alert(
                "Por favor, selecciona la forma de entrega."
            );

            document
                .getElementById("entrega")
                .focus();

            return;

        }


        /* =================================================
           CREAR MENSAJE DE WHATSAPP
           ================================================= */

        let mensaje =
            "🛒 *PEDIDO — TIENDA J.F.B.*\n\n";


        mensaje +=
            "👤 *Datos del cliente*\n";

        mensaje +=
            `Nombre: ${nombre}\n`;

        mensaje +=
            `Tipo: ${tipo}\n`;


        if (
            tipo === "Alumno actual"
        ) {

            mensaje +=
                `Curso: ${cursoSeleccionado}\n`;

        }


        mensaje +=
            `Teléfono: ${telefono}\n`;


        mensaje +=
            `Entrega: ${entrega}\n`;


        /* PRODUCTOS */

        mensaje +=
            "\n🛍️ *Productos*\n";


        carrito.forEach(
            (producto) => {

                const subtotal =
                    producto.precio *
                    producto.cantidad;


                mensaje +=
                    `• ${producto.nombre} x${producto.cantidad} — Bs. ${subtotal.toFixed(2)}\n`;

            }
        );


        /* TOTAL */

        mensaje +=
            `\n💰 *TOTAL: Bs. ${calcularTotal().toFixed(2)}*\n`;


        /* DESCRIPCIÓN */

        if (descripcion) {

            mensaje +=
                "\n📝 *Detalles del pedido*\n";

            mensaje +=
                `${descripcion}\n`;

        }


        mensaje +=
            "\nGracias por realizar tu pedido en la Tienda J.F.B.";


        /* =================================================
           ABRIR WHATSAPP
           ================================================= */

        const mensajeCodificado =
            encodeURIComponent(mensaje);


        const urlWhatsApp =
            `https://wa.me/${SELLER_WHATSAPP}?text=${mensajeCodificado}`;


        /*
         * Abrimos WhatsApp en una nueva pestaña.
         */

        window.open(
            urlWhatsApp,
            "_blank"
        );


        /* =================================================
           LIMPIAR Y MOSTRAR CONFIRMACIÓN
           ================================================= */

        carrito = [];

        actualizarCarrito();

        formularioPedido.reset();

        campoCurso.hidden = true;

        curso.required = false;


        cerrarModalPedido();


        modalConfirmacion.hidden =
            false;


        document.body.style.overflow =
            "hidden";

    }
);


/* =========================================================
   17. CERRAR CONFIRMACIÓN
   ========================================================= */

btnCerrarConfirmacion.addEventListener(
    "click",
    () => {

        modalConfirmacion.hidden =
            true;

        document.body.style.overflow =
            "";

    }
);


/* =========================================================
   18. CERRAR CON ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape"
        ) {

            if (
                modalConfirmacion.hidden ===
                false
            ) {

                modalConfirmacion.hidden =
                    true;

                document.body.style.overflow =
                    "";

            } else if (
                modalPedido.classList.contains(
                    "abierto"
                )
            ) {

                cerrarModalPedido();

            } else if (
                carritoPanel.classList.contains(
                    "abierto"
                )
            ) {

                cerrarCarrito();

            }

        }

    }
);


/* =========================================================
   19. BUSCADOR DE PRODUCTOS
   ========================================================= */

buscadorProductos.addEventListener(
    "input",
    () => {

        const texto =
            buscadorProductos.value
                .trim()
                .toLowerCase();


        const productos =
            listaProductos.querySelectorAll(
                ".producto-card"
            );


        let encontrados = 0;


        productos.forEach(
            (producto) => {

                const nombre =
                    producto
                        .querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";


                const descripcion =
                    producto
                        .querySelector(
                            ".producto-descripcion"
                        )
                        ?.textContent
                        .toLowerCase() || "";


                const coincide =
                    nombre.includes(texto) ||
                    descripcion.includes(texto);


                if (coincide) {

                    producto.style.display =
                        "";

                    encontrados++;

                } else {

                    producto.style.display =
                        "none";

                }

            }
        );


        if (encontrados === 0) {

            sinResultados.hidden =
                false;

        } else {

            sinResultados.hidden =
                true;

        }

    }
);


/* =========================================================
   20. INICIO
   ========================================================= */

actualizarCarrito();

actualizarCampoCurso();


