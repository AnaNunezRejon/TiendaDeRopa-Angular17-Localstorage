import { Component, OnInit } from '@angular/core';
import { Producto } from '../../db/productos.db';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  constructor(private router: Router) {}

  productosEnCarrito: Producto[] = [];

  ngOnInit(): void {
    this.obtenerProductosEnCarrito();
  }

  formatPrice(price: number): string {
    const formattedPrice = price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    return formattedPrice.replace(/\s/g, '');
  }

  obtenerProductosEnCarrito(): void {
    const carritoString: string | null = localStorage.getItem('carrito');
    if (carritoString !== null) {
      const productosCarrito: Producto[] = JSON.parse(carritoString);
      let carritoAgrupado: Producto[] = [];

      productosCarrito.forEach(producto => {
        const index = carritoAgrupado.findIndex(p => p.id === producto.id);
        if (index !== -1) {
          const cantidad: number = carritoAgrupado[index].cantidad || 0;
          carritoAgrupado[index].cantidad = cantidad + 1;
        } else {
          carritoAgrupado.push({ ...producto, cantidad: 1 });
        }
      });

      this.productosEnCarrito = carritoAgrupado;
    }
  }

  calcularPrecioTotal(producto: Producto): number {
    return (producto.precio || 0) * (producto.cantidad || 0);
  }

  eliminarProducto(producto: Producto): void {
    const index: number = this.productosEnCarrito.indexOf(producto);
    if (index !== -1) {
      const cantidad: number = this.productosEnCarrito[index].cantidad || 0;
      if (cantidad > 1) {
        this.productosEnCarrito[index].cantidad = cantidad - 1;
      } else {
        this.productosEnCarrito.splice(index, 1);
      }
      localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
    }
  }

  restarProducto(producto: Producto): void {
    const index: number = this.productosEnCarrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      const cantidad: number | undefined = this.productosEnCarrito[index]?.cantidad;
      if (cantidad !== undefined) {
        const nuevaCantidad: number = cantidad - 1;
        if (nuevaCantidad > 0) {
          this.productosEnCarrito[index].cantidad = nuevaCantidad;
        } else {
          this.productosEnCarrito.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
      }
    }
  }

  sumarProducto(producto: Producto): void {
    const index: number = this.productosEnCarrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      if (this.productosEnCarrito[index]?.cantidad !== undefined) {
        this.productosEnCarrito[index].cantidad = (this.productosEnCarrito[index].cantidad || 0) + 1;
        localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
      }
    }
  }

  calcularTotalCesta(): string {
    let total: number = 0;
    this.productosEnCarrito.forEach(producto => {
      total += this.calcularPrecioTotal(producto);
    });
    return this.formatPrice(total);
  }

  irAFormulario(): void {
    this.router.navigate(['tramitar-pedido']);
  }

}
