// CREACION DE ITEM
const item = (id, title, price, description, category,image, rating) => {
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

// MODIFICAR ESTA FUNCION PARA QUE TAMBIEN FUNCIONE CON CATEGORIAS
function traeTodo() {
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
        .then(()=> inyectarArticulos(allItem))
}

traeTodo();



function inyectarArticulos(items) {
    const selezioniArticulos = document.querySelector('.selezioni__articulos');

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

        articulo.appendChild(articuloImg);
        articulo.appendChild(nombreElement);
        articulo.appendChild(precioElement);
        
        selezioniArticulos.appendChild(articulo);
    });
}





