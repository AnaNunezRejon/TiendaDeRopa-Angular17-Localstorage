import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { productosDB } from '../../db/productos.db';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categorias: { nombre: string, imagen: string }[] = [];

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    const categoriasUnicas = Array.from(new Set(productosDB.getAll().map(producto => producto.categoria)));

    categoriasUnicas.forEach(categoria => {
      const productoCategoria = productosDB.getAll().find(producto => producto.categoria === categoria);
      if (productoCategoria) {
        this.categorias.push({ nombre: categoria, imagen: productoCategoria.imagen });
      }
    });

  }
}
