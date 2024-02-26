import { Injectable, EventEmitter } from '@angular/core';
import { Producto, productosDB } from '../db/productos.db';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  carritoActualizado: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  getAll(): Producto[] {
    return productosDB.getAll();
  }

  getById(id: string): Producto | undefined {
    return productosDB.getById(id);
  }

  getByCategoria(categoria: string): Producto[] {
    return productosDB.getByCategoria(categoria.toLowerCase());
  }

  actualizarCarrito(numProductos: number): void {
    this.carritoActualizado.emit(numProductos);
  }

  productos: Producto[] = [];
  palabraClave: string = '';
  productoSeleccionado: Producto | undefined;
  sugerencias: string[] = [];

}
