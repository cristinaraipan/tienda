
let categorias = document.getElementById("categoria");
let contenedor = document.getElementById("contenedor");
let imagenNoEncontrada = "/img/image-not-found.png";

function ordenar(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
}

window.onload = iniciar();

//funcion carga los productos en el div con id contenedor 
async function cargarProductos(id) {
    axios.get(`/productos/${id}`).then((respuesta) => {
        contenedor.innerHTML = "";
        let listaOrdenada = respuesta.data.sort(ordenar)
        listaOrdenada.forEach(element => {
            contenedor.innerHTML += `
            <div class="card m-2 p-2" style="width:18em">
                <img src="${element.url_image ? element.url_image : imagenNoEncontrada}" class="card-img-top p-1 text-center" alt="${element.name}" width="230px" height="270px">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">Precio: ${element.price}</p>
                </div>
            </div>
        `
        });
    }).catch((error) => {
        alert(error)
    });
};

//funcion que carga las categorias en el li del navbar
async function getCategorias() {
    await axios.get('/categorias').then((respuesta) => {
        categorias.innerHTML = "";
        let listaOrdenada = respuesta.data.sort(ordenar);
        listaOrdenada.forEach(element => {
            categorias.innerHTML += `
           <li class="nav-item">
                <a  class="nav-link" href="#" onclick="cargarProductos(${element.id})">${element.name.toUpperCase()}</a>
            </li>
           `
        });
    }).catch((error) => {
        alert(error)
    });
};

//funcion que busca los productos utilizando el o los datos que escribe el cliente en el input
const buscarProducto = async () => {
    const inputBuscar = document.getElementById("inputBuscar").value;
    if (inputBuscar == "") {
        alert("Debe agregar datos");
    } else {
        await axios.get(`/buscar?busqueda=${inputBuscar}`).then((respuesta) => {
            contenedor.innerHTML = "";
            if (respuesta.data.length == 0) {
                contenedor.innerHTML = "<p>No se encontraron productos</p>";
            } else {
                let listaOrdenada = respuesta.data.sort(ordenar);
                listaOrdenada.forEach(element => {
                    contenedor.innerHTML += `
                    <div class="card m-2 p-2" style="width:18em">
                        <img src="${element.url_image}" class="card-img-top p-1 text-center" alt="${element.name}" width="230px" height="270px">
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">Precio: ${element.price}</p>
                        </div>
                    </div>
                `
                });
            };
        }).catch((error) => {
            alert(error)
        });
    };
};

//funcion que carga todos los productos en el div con id contenedor
async function iniciar() {
    await getCategorias();
    await cargarProductos('all');
};