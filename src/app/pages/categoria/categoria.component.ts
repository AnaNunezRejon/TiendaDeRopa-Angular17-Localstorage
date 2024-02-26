import { Component, OnInit } from '@angular/core';
import { Producto } from '../../db/productos.db';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

declare var localStorage: any;

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  productos: Producto[] = [];
  categoria: string = '';

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria') || '';
      this.cargarProductos();
    });
  }
  irADetalle(categoria: string, nombre: string): void {
    this.router.navigate(['/home', categoria, nombre]);
  }

  cargarProductos(): void {
    this.productos = this.productosService.getAll()
      .filter(producto => producto.categoria.toLowerCase() === this.categoria.toLowerCase());
  }

  comprarProducto(producto: Producto): void {
    if (producto.stock) {
      let carrito: Producto[] = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      document.dispatchEvent(new Event('productoComprado'));
    }
  }

}
