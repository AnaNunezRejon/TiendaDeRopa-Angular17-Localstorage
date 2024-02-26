import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-realizado',
  standalone: true,
  imports: [],
  templateUrl: './pedido-realizado.component.html',
  styleUrl: './pedido-realizado.component.css'
})
export class PedidoRealizadoComponent  implements OnInit  {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  irAInicio(): void {
    localStorage.removeItem('carrito');
    this.router.navigate(['/home']);
  }
}
