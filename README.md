# Datos para usar en la prueba de metodos

# Ruta api/productos

## GET
Ruta:http://localhost:8080/api/productos
Devuelve los productos

Ruta:http://localhost:8080/api/productos/1
Devuelve un producto

## POST
 Ruta : http://localhost:8080/api/productos
 Agrega un producto en la lista

 Datos:
{
    "id":2,
    "title": "Gabinete Kolink Observatory",
    "description": "Lite Black 4x120mm ARGB Vidrio Templado",
    "price": 55000,
    "cod": 1554,
    "thumbnail": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_24191_Gabinete_Kolink_Observatory_Lite_Black_4x120mm_ARGB_Vidrio_Templado_23c44701-grn.jpg",
    "stock": 150
    }
## PUT
PUT - Ruta: http://localhost:8080/api/productos/3

 {
    "id":3,
    "title": "Notebook Gamer AORUS",
    "description": "KD 15.6\" Core I7 11800H 16GB (2x8GB) 512GB SSD NVMe RTX 3060 240Hz W11",
    "price": "15",
    "cod": 2552,
    "thumbnail": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30650_Notebook_Gamer_AORUS_KD_15.6__Core_I7_11800H_16GB__2x8GB__512GB_SSD_NVMe_RTX_3060_240Hz_W11_d6ed3ff1-grn.jpg",
    "stock": 150
  }

## DELETE ID
Ruta: http://localhost:8080/api/productos/1
elimina un producto

# Ruta api/carrito

## POST-Crear un carrito

 POST -Ruta: http://localhost:8080/api/carrito
  {

  }

## DELETE-elimina un carrito por id

 DELETE -Ruta: http://localhost:8080/api/carrito/2

## GET-LISTA DE ARTICULOS POR CARRITO
 devuelve todos los carritos existentes

 GET -Ruta: http://localhost:8080/api/carrito/1

 devuelve todos los prodcutos de un carrito

 GET/:id/productos -Ruta:http://localhost:8080/api/carrito/1/productos
 
## Agregar un producto a  un carrito
 POST -Ruta: http://localhost:8080/api/carrito/3/productos
 {
     "id":1
 }

 
## DELETE-elimina un producto de un carrito

 DELETE -Ruta: http://localhost:8080/api/carrito/2/productos/1
