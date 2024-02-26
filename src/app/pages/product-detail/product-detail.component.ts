import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, productosDB } from '../../db/productos.db';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  producto: Producto | undefined;
  numProductosEnCarrito: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      const nombre = params.get('nombre');
      if (categoria && nombre) {
        this.producto = this.getById(nombre);
        console.log('Producto cargado:', this.producto);
      }
    });
  }

  getById(nombre: string): Producto | undefined {
    return productosDB.getById(nombre);
  }

  formatPrice(price: number): string {
    const formattedPrice = price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    return formattedPrice.replace(/\s/g, '');
  }
  agregarAlCarrito(producto: Producto): void {
    const carritoString: string | null = localStorage.getItem('carrito');
    let carrito: Producto[] = [];

    if (carritoString !== null) {
      carrito = JSON.parse(carritoString);
    }

    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    this.numProductosEnCarrito = carrito.length;

    window.location.reload();
  }
}
