Quiero hacer una tienda de ropa

Quero que la tienda tenga una barra de navegacion con tres enlaces: Home, productos, carrito

Quiero que la home tenga un banner debajo del menu y luego 6 cajas n una sola fila con enlaces para rediigirlos a cada sección: Si pulso la imagen de sudaderas, la imagen me redigira a home/sudaderas donde me apareceran todos los articulos con el id sudaderas. Si pulso la imagen camisetas me redigira a home/camiseras donde me apareceran todos los articulos con el id camisetas.

Quiero pintar un listado de productos. para ello tengo que generar varias cosas:

Quiero generar un interfaz de productos: 
  id: number
  nombre: string
  precio: number
  stock: booleano
  imagen: sttring(url)

quiero crear una base de datos en un fichero interno: productos.db.ts y cargaremos 10 productos con esta estructura:

        "id": "sudadera2",
        "nombre": "Sudadera Cyberpunk",
        "imagen": "./img/sudadera2.jpg",
        "categoria": {
            "nombre": "Sudaderas",
            "id": "sudaderas"
        },
        "stock": true
        "precio": 29.99

crear un servicio que me proporcione acceso al array de datos con los siguientes metodos
  getAll() devolvera todos los productos
  getById() devolvera un producto por id

crear una pagina de productos que cargue el componente product list
  cargar todos los productos de la lista que haya stock
  crear un product card para cargar cada miniproducto con un enlace a la vista del producto. El product card solo cargara titulo y precio

crear una pagina para la vista de producto donde cargaremos toda la informacion del producto incluida la imagen. La ruta para esto será (/producto/:id)
