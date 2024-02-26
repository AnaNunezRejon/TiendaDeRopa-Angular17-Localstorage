import { Component, OnInit } from '@angular/core';
import { Producto, productosDB } from '../../db/productos.db';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  numProductosEnCarrito: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.productos = productosDB.getAll();
  }

  irADetalle(categoria: string, nombre: string): void {
    this.router.navigate(['/home', categoria, nombre]);
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
