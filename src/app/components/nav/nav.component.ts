import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, FormsModule, NgClass],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  numProductosEnCarrito: number = 0;

  ngOnInit(): void {
    document.addEventListener('productoComprado', () => {
      this.actualizarNumProductosEnCarrito();
    });
    this.actualizarNumProductosEnCarrito();
  }

  private actualizarNumProductosEnCarrito(): void {
    const carritoString: string | null = localStorage.getItem('carrito');
    if (carritoString !== null) {
      const carrito: any[] = JSON.parse(carritoString) || [];
      this.numProductosEnCarrito = carrito.length;
    }
  }

  isMenuToggleActive: boolean = false;
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuToggleActive = !this.isMenuToggleActive;
    this.isMenuOpen = !this.isMenuOpen;
  }
  hideMenu() {
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
      navbarNav.classList.remove('show');
    }
  }
}
