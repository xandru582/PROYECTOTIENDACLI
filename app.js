// CREACION DE ITEM
const item = (id, title, price, description, category, image, rating) => {
    return {
        id,
        title,
        price,
        description,
        category,
        image,
        rating
    };
}

var allItem = [];
var carrito = [];
var carritoNumeroArticulos = document.getElementById('carritoNumeroArticulos');
var iconoCarrito = document.getElementById('iconoCarrito');
var tituloCategoria = document.getElementById('selezioni__titulo')
// MODIFICAR ESTA FUNCION PARA QUE TAMBIEN FUNCIONE CON CATEGORIAS
function traeTodo(filtro = "") {

    if(filtro.length>0){
        allItem=[]
        fetch(`https://fakestoreapi.com/products/category/${filtro}`)
        .then(res => res.json())
        .then(json => {
            json.forEach(element => {
                let nuevoItem = item(
                    element.id,
                    element.title,
                    element.price,
                    element.description,
                    element.category,
                    element.image,
                    element.rating
                );
                allItem.push(nuevoItem);
            });
        })
        .then(() => {
            console.log(allItem);
        })
        .then(() => inyectarArticulos(allItem))
        tituloCategoria.innerText=filtro
        tituloCategoria.style.textTransform="uppercase"
    }else{
        allItem=[]
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            json.forEach(element => {
                let nuevoItem = item(
                    element.id,
                    element.title,
                    element.price,
                    element.description,
                    element.category,
                    element.image,
                    element.rating
                );
                allItem.push(nuevoItem);
            });
        })
        .then(() => {
            console.log(allItem);
        })
        .then(() => inyectarArticulos(allItem))
        tituloCategoria.innerText="Todos los articulos"
        tituloCategoria.style.textTransform="uppercase"
    }
    
}

traeTodo("");
function ordenarPorPrecio(tipo) {
    if (tipo === "mayor") {
        allItem.sort((a, b) => b.price - a.price); // Ordenar de mayor a menor precio
    }
    if (tipo === "menor") {
        allItem.sort((a, b) => a.price - b.price); // Ordenar de menor a mayor precio
    }
    inyectarArticulos(allItem); // Vuelve a inyectar los artículos en el DOM después de ordenarlos
}

function inyectarArticulos(items) {
    const selezioniArticulos = document.querySelector('.selezioni__articulos');
    selezioniArticulos.innerHTML=""
    items.forEach(item => {
        const articulo = document.createElement('div');
        articulo.classList.add('selezioni__articulo');

        const articuloImg = document.createElement('img');
        articuloImg.classList.add('articulo__img');
        articuloImg.src = item.image;

        const nombreElement = document.createElement('p');
        nombreElement.classList.add('articulo__nombre');
        nombreElement.textContent = item.title;

        const precioElement = document.createElement('p');
        precioElement.classList.add('articulo__precio');
        precioElement.textContent = item.price;

        const comprarCarrito = document.createElement('a');
        comprarCarrito.classList.add('articulo__comprar');
        comprarCarrito.textContent = "Comprar";
        comprarCarrito.setAttribute('data-id', item.id); // Añadir un atributo data-id con el id del artículo

        // Manejar el evento de clic en el botón "Comprar"
        comprarCarrito.addEventListener('click', agregarAlCarrito);

        articulo.appendChild(articuloImg);
        articulo.appendChild(nombreElement);
        articulo.appendChild(precioElement);
        articulo.appendChild(comprarCarrito);

        selezioniArticulos.appendChild(articulo);
    });
}

function agregarAlCarrito(event) {
    const itemId = event.target.getAttribute('data-id'); // Obtener el id del artículo desde el botón clickeado
    const itemSeleccionado = allItem.find(item => item.id === parseInt(itemId, 10)); // Ponemos el 10 para asegurar que tenga digitos del 0 al 9

    if (itemSeleccionado) {
        carrito.push(itemSeleccionado);
        carritoNumeroArticulos.innerText = "(" + carrito.length + ")"
        iconoCarrito.classList.add("carritoLogo")
        console.log("Artículo agregado al carrito:", itemSeleccionado);
        console.log("Contenido del carrito:", carrito);
    }
}
