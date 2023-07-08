// PRE ENTREGA 3 - FRASCA GIANINA
// Sitio de Compra de Entradas a Recitales


/// LOCAL STORAGE CARRITO///
const guardarCarrito = ()=> {
  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }
}

const recuperarCarrito = ()=> {
  return JSON.parse(localStorage.getItem("carrito")) || []
}


/// ARRAY PRODUCTOS ///
const entradas = [ {codigo: 1, nombre: "Taylor Swift", imagen: "taylorswift.jpg", fecha: "10 de noviembre", lugar:"River", precio: 80000},
                    {codigo: 2, nombre: "Bruno Mars", imagen: "brunomars.jpg", fecha: "27 de noviembre", lugar:"Estadio Único", precio: 85000},
                    {codigo: 3, nombre: "RHCP", imagen: "rhcp.jpg", fecha: "5 de octubre", lugar:"River", precio: 55000},
                    {codigo: 4, nombre: "Tan Biónica", imagen: "tanbionica.jpg", fecha: "4 de noviembre", lugar:"Estadio Único", precio: 30000},
                    {codigo: 5, nombre: "Evanescence", imagen: "evanescence.jpg", fecha: "20 de septiembre", lugar:"Movistar Arena", precio: 95000},
                    {codigo: 6, nombre: "Billie Eilish", imagen: "billieeilish.jpg", fecha: "16 de marzo", lugar:"Lollapalooza", precio: 55000}
]

/// ARRAY CARRITO ///
const carrito = recuperarCarrito()

/// TARJETAS DE PRODUCTO GENERADAS DINAMICAMENTE CON JS///
function generarTarjetaProducto(entrada) {
  return `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="images/${entrada.imagen}" alt="${entrada.nombre}" width="300" height="200">
      <div class="card-body">
        <h5 class="card-title text-center">${entrada.nombre}</h5>
        <p class="card-subtitle text-center my-1">$${entrada.precio}.-</p>
        <p class="card-subtitle text-center my-1">${entrada.fecha}</p>
        <p class="card-subtitle text-center my-1">${entrada.lugar}</p>
        <div class="d-flex justify-content-center text-center">
          <button id="btn-comprar-${entrada.codigo}" class="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
  `
}


/// MOSTRAR PRODUCTOS EN CARRITO Y TOTAL A PAGAR ///
const tbody = document.querySelector("tbody")

const actualizarCarrito = (entrada)=> {
  return `<tr>
            <td>${entrada.codigo}</td>
            <td>${entrada.nombre}</td>
            <td>${entrada.precio}</td>
          </tr>`
}

const mostrarCarrito = ()=> {
  if (carrito.length > 0) {
    carrito.forEach ((entrada)=> {
      tbody.innerHTML += actualizarCarrito(entrada)
    })
  }
  const totalColumna = document.getElementById('carrito-total')
  const total = carrito.reduce((acumulador, entrada) => acumulador + entrada.precio, 0)
  totalColumna.textContent = '$' + total.toFixed(2)
}

/// NOTIFICACION AL AGREGAR PRODUCTO AL CARRITO ///
function mostrarNotificacion(mensaje) {
  const notification = document.getElementById('notification');
  notification.textContent = mensaje;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}


/// EVENTO: CLICK EN BOTÓN COMPRAR ///
function agregarClickEnBotones() {
  const botonesComprar = document.querySelectorAll('button.btn.btn-primary')

  botonesComprar.forEach((boton)=> {
    boton.addEventListener("click", ()=> {
      let entrada = entradas.find((entrada)=> "btn-comprar-"+entrada.codigo === boton.id)
      carrito.push(entrada)
      mostrarNotificacion('✅ Entrada ' + entrada.nombre + ' se agregó al carrito.')
      mostrarCarrito()
      guardarCarrito()
    })
  })
}


/// FUNCIÓN CARGAR ENTRADA ///
function cargarEntrada() {
  entradas.forEach(function(entrada) {
    let tarjetaHTML = generarTarjetaProducto(entrada);
    document.querySelector(".tarjetaproducto").innerHTML += tarjetaHTML
    agregarClickEnBotones()
  })
}
cargarEntrada()

