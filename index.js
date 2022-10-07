class Producto {
  constructor(codigo, nombre, cantidad, costo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.costo = costo;
  }
}

class Inventario {
  constructor() {
    this._productos = new Array();
  }
  
  buscarProducto(codigoProducto) {
    let ini = 0;
    let fin = this._productos.length -1;

    while (ini <= fin) {
      let mid = Math.floor((ini + fin) / 2);
      let element = this._productos[mid];

      if (element.codigo == codigoProducto) {
        return this.productosInverso[mid];
      }

      if(element.codigo > codigoProducto) {
        fin = mid -1;
      } else {
        ini = mid +1;
        return element;
      }
    }
    return null;
  }

  // index(codigoProducto) {
  //   for (let i = 0; i < this._productos.length; i++) {
  //     if (codigoProducto === this._productos[i].codigoProducto) {
  //       return this._productos[i];
  //     }
  //   }
  //   return null;
  // }

  agregarProducto(producto) {
    if (this.buscarProducto(producto.codigo)) {
      return false;
    } else {
      this._productos.push(producto);
      this.#ordenador();
      return true;
    }
  }

  #ordenador() {
    for (let i = 0; i < this._productos.length; i++) {
      for (let j = 0; j < this._productos.length; j++) {
        if (Number(this._productos[i].codigo) < Number(this._productos[j].codigo)) {
          let aux = this._productos[i];
          this._productos[i] = this._productos[j];
          this._productos[j] = aux
        }
      }
    }
  }

  eliminarProducto(codigoProducto) {
    let producto = false;
    for (let i = 0; i <= this._productos.length; i++) {
      if (this._productos[i])
      if (codigoProducto === this._productos[i].codigo) {
        for (let j = i; j < this._productos.length -1; j++)
        this._productos[j] = this._productos[ j + 1];
        this._productos[this._productos.lastIndexOf -1] = 0;
        this._productos.pop();
        producto = true
      }
      
    }
    return producto;
    
  }

  listado() {
    let string = '';

    if (this._productos.length > 0) {
      for (let i = 0; i < this._productos.length; i++) {
        const element = this._productos[i];
        string += this._productos[i] + `\ncodigo: ${element.codigo}\nnombre: ${element.nombre}\ncosto: ${element.cantidad}\ncosto: ${element.costo}\n`;
      } 
    } else {
      return false;
    }
    return string;
  }

  listadoInverso() {
    let string = '';
    if (this._productos.length > 0) {
      for (let i = this._productos.length -1; i >= 0; i--){
        string += this._productos[i] + `\ncodigo: ${element.codigo}\nnombre: ${element.nombre}\ncosto: ${element.cantidad}\ncosto: ${element.costo}\n`;
      }
    } else {
      return false;
    }
    return string;
  }
}

const inventario = new Inventario();
const btnAgregar = document.getElementById("btnAgregar");
const btnBuscar = document.getElementById("btnBuscar");

const tabla = document.getElementById("tabla");

const btnModoAgregar = document.getElementById("modoAgregar");
const btnModoBuscar = document.getElementById("modoBuscar");

const formAgregar = document.getElementById("formAgregar");
const formBuscar = document.getElementById("formBuscar");
const formContenedor = document.getElementById("formContenedor");


const inpBuscar = document.getElementById("buscar");
const busquedaContenedor = document.getElementById("busqueda");
const targetaBusqueda = document.getElementById("targetaBusqueda");
const busquedaLbCodigo = document.getElementById('busquedaCodigo');
const busquedaLbNombre = document.getElementById('busquedaNombre');
const busquedaLbCantidad = document.getElementById('busquedaCantidad');
const busquedaLbCosto = document.getElementById('busquedaCosto');

const btnEliminar = document.getElementById("eliminar");

const agregarInpCodigo = document.querySelector('#codigo');
const agregarInpNombre = document.querySelector('#nombre');
const agregarInpCantidad = document.querySelector('#cantidad');
const agregarInpCosto = document.querySelector('#costo');



formBuscar.remove();
targetaBusqueda.remove();


btnAgregar.addEventListener('click', function (e) {
  e.preventDefault();
  const existente = inventario.buscarProducto(parseInt(agregarInpCodigo.value));

  if (!existente) {
    const productoNuevo = new Producto(agregarInpCodigo.value, agregarInpNombre.value, agregarInpCantidad.value, agregarInpCosto.value);

    inventario.agregarProducto(productoNuevo);
    crearFilaDeTabla('Agregado', productoNuevo.codigo, productoNuevo.nombre);
  }
});

let codigo = 0;

btnBuscar.addEventListener('click', function (e) {
  e.preventDefault();
  codigo = inpBuscar.value;
  console.log(inventario.listado());
  console.log(inventario.listadoInverso());
  const producto = inventario.buscarProducto(codigo);

  if (producto) {
    busquedaLbCodigo.innerHTML = producto.codigo;
    busquedaLbNombre.innerHTML = producto.nombre;
    busquedaLbCantidad.innerHTML = producto.cantidad;
    busquedaLbCosto.innerHTML = producto.costo
    busquedaContenedor.append(targetaBusqueda);
  } else {
    targetaBusqueda.remove();
  }
});

btnEliminar.addEventListener('click', function (e) {
  e.preventDefault();
  const productoAEliminar = inventario.buscarProducto(codigo);
  crearFilaDeTabla('Eliminado', productoAEliminar.codigo, productoAEliminar.nombre);
  inventario.eliminarProducto(codigo);
  targetaBusqueda.remove();
});

btnModoBuscar.addEventListener("click", function (e) {
  e.preventDefault();

  formAgregar.remove();
  formContenedor.append(formBuscar);
});

btnModoAgregar.addEventListener("click", function (e) {
  e.preventDefault();

  formBuscar.remove();
  formContenedor.append(formAgregar);
});

function crearFilaDeTabla(accion, codigo, nombre) {
  const tRow = document.createElement('tr');
  const accionTDate = document.createElement('td');
  const codigoTDate = document.createElement('td');
  const nombreTDate = document.createElement('td');

  accionTDate.innerHTML = accion;
  codigoTDate.innerHTML = codigo;
  nombreTDate.innerHTML = nombre;

  tRow.append(accionTDate);
  tRow.append(codigoTDate);
  tRow.append(nombreTDate);

  tabla.prepend(tRow);
}

