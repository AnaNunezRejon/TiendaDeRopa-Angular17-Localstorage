export interface Producto {
  cantidad?: number;
  id: string;
  nombre: string;
  precio: number;
  stock: boolean;
  imagen: string;
  categoria: string;
}

const productos: Producto[] = [
  {
      "id": "sudadera1",
      "nombre": "Sudadera Morrigan",
      "imagen": "./assets/img/sudadera1.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": false
  },
  {
      "id": "sudadera2",
      "nombre": "Sudadera Cyberpunk",
      "imagen": "./assets/img/sudadera2.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera3",
      "nombre": "Sudadera Sailor Moon",
      "imagen": "./assets/img/sudadera3.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera4",
      "nombre": "Sudadera Jon Snow",
      "imagen": "./assets/img/sudadera4.1.1.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera5",
      "nombre": "Sudadera Evangelion",
      "imagen": "./assets/img/sudadera5.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera6",
      "nombre": "Sudadera Evangelion",
      "imagen": "./assets/img/sudadera6.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera7",
      "nombre": "Sudadera Anime",
      "imagen": "./assets/img/sudadera7.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "sudadera8",
      "nombre": "Sudadera Ghost in the shell",
      "imagen": "./assets/img/sudadera8.jpg",
      "categoria": "Sudaderas",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "pantalones1",
      "nombre": "Pantalones Goku",
      "imagen": "./assets/img/pantalones1.jpg",
      "categoria": "Pantalones",
      "precio": 29.99,
      "stock": true
  },
  {
      "id": "Camiseta1",
      "nombre": "Camiseta Ghost in the shell",
      "imagen": "./assets/img/camiseta1.jpg",
      "categoria": "Camisetas",
      "precio": 19.99,
      "stock": true
  },
  {
      "id": "Camiseta2",
      "nombre": "Camiseta Jon Snow",
      "imagen": "./assets/img/camiseta2.jpg",
      "categoria": "Camisetas",
      "precio": 19.99,
      "stock": true
  },
  {
      "id": "Camiseta3",
      "nombre": "Camiseta Witcher",
      "imagen": "./assets/img/camiseta3.jpg",
      "categoria": "Camisetas",
      "precio": 19.99,
      "stock": true
  },
  {
      "id": "zapatilla1",
      "nombre": "Zapatillas Morrigan",
      "imagen": "./assets/img/zapatillas1.jpg",
      "categoria": "Zapatillas",
      "precio": 59.99,
      "stock": true
  },
  {
      "id": "accesorios",
      "nombre": "Monedero Berserk",
      "imagen": "./assets/img/accesorios1.jpg",
      "categoria": "Accesorios",
      "precio": 12.99,
      "stock": true
  },
  {
      "id": "pijama1",
      "nombre": "Pijama Bob Espoja",
      "imagen": "./assets/img/pijama1.jpg",
      "categoria": "Pijamas",
      "precio": 25.99,
      "stock": true
  }
]

export const productosDB = {
  getAll: () => productos,

  getById(nombre: string): Producto | undefined {
    return productos.find(producto => producto.nombre === nombre);
  },
  getByCategoria: (categoria: string) => productos.filter(producto => producto.categoria === categoria)
};
