# Proyecto: Tienda

Incluye frontend y backend. Al ingresar a la url se descarga el front.

## FRONT

El front se comunica con el api REST del backend mediante tres endpoints: 

```
- /categorias
- /buscar
- /productos
```
El detalle de los endpoints se explica en la sección backend.

Al inicializar el front se llama al endpoint /categorias para cargar las categorías de los productos y mostrarlas en la parte superior de la pantalla.

Una vez que se han cargado las categorías se llama al endpoint /productos para cargar inicialmente todos los productos.

Al hacer click en una categoría se cargan los productos filtrados según la categoría.

Al escribir en el input parte del nombre o nombre completo de algún producto y hacer click en el botón buscar se cargan los productos que coincidan con la búsqueda,
esto se realiza llamando al endpoint /buscar pasándole como parámetro el término buscado.
## BACKEND

### GET categorias

Descripción: Devuelve las categorías de los productos.

Parámetros: 
```No necesita parámetros.```

Ejemplo:
```
GET /categorias
```

Respuesta:

```JavaScript
[ { "id": 1, "name": "bebida energetica" },
  { "id": 2, "name": "pisco" },
  { "id": 3, "name": "ron" },
  { "id": 4, "name": "bebida" },
  { "id": 5, "name": "snack" }, 
  { "id": 6, "name": "cerveza" }, 
  { "id": 7, "name": "vodka" } ]
```
### GET productos

Descripción: Devuelve los productos filtrados por categoría o todos los productos.

Parámetros:
```
	- categoria: El id (numérico) de la categoria de algún producto o la palabra "all"
```
	
Ejemplos:
```
GET /productos/1 devuelve los productos correspondientes a la categoría 1
```
```
GET /productos/all devuelve todos los productos
```

Respuesta:
```
[
    {
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1
    },
    {
        "id": 6,
        "name": "ENERGETICA RED BULL",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
        "price": 1490,
        "discount": 0,
        "category": 1
    }
]
```
### GET buscar

Descripción: Devuelve los productos que coincidan con el término buscado.

Parámetros:

	- busqueda: El término a buscar
	
Ejemplo:
```
GET /buscar?busqueda=alto%20del devuelve los productos cuyo nombre contenga "alto del"
```
Respuesta:

```
[
    {
        "id": 8,
        "name": "PISCO ALTO DEL CARMEN 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
        "price": 7990,
        "discount": 10,
        "category": 2
    },
    {
        "id": 9,
        "name": "PISCO ALTO DEL CARMEN 40º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
        "price": 5990,
        "discount": 0,
        "category": 2
    }
]
```