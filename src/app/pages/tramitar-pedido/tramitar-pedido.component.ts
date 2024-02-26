import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../../db/productos.db';


@Component({
  selector: 'app-tramitar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './tramitar-pedido.component.html',
  styleUrl: './tramitar-pedido.component.css'
})
export class TramitarPedidoComponent implements OnInit{

  modelForm: FormGroup;
  tarjetaForm: FormGroup;
  productosEnCarrito: Producto[] = [];

  constructor(private router: Router) {
    this.modelForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      edad: new FormControl(null, [Validators.min(18), Validators.max(65)]),
      dni: new FormControl(null, [this.dniValidador]),
      password: new FormControl(null, Validators.required),
      repitepass: new FormControl(null, Validators.required)
    }, { validators: this.checkpassword })

    fechaCaducidad: new FormControl(null, [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)])

    this.tarjetaForm = new FormGroup({
      numeroTarjeta: new FormControl(null, [Validators.required, Validators.pattern(/^\d{16}$/)]),
      codigoSeguridad: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}$/)]),
      titularTarjeta: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      fechaCaducidad: new FormControl(null, [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)])
    });

  }

  ngOnInit():void {
    this.obtenerProductosEnCarrito();
  }

  formatFecha(event: any): void {
    let inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\D/g, '');

    if (formattedValue.length > 2) {
      inputValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4) + '/' + formattedValue.slice(4, 8);
    } else if (formattedValue.length > 4) {
      inputValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4) + '/' + formattedValue.slice(4, 6);
    }
    event.target.value = inputValue;
  }

  checkpassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value;
    const repitepass = formValue.get('repitepass')?.value;

    if (password && repitepass && password !== repitepass) {
      return { 'checkpassword': true };
    } else {
      return null;
    }
  }

  dniValidador(controlName: AbstractControl): any {
    const letrasDni: string[] = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    const dni = controlName.value;
    const exp = /^\d{8}[A-Z]{1}/;

    if (exp.test(dni)) {
      const letra: string = dni.charAt(dni.length - 1);
      const numero: number = Number(dni.substring(0, dni.length - 1));
      const position = numero % 23;
      return (letra !== letrasDni[position]) ? { 'dnivalidador': 'La letra no corresponde al dni' } : null;
    } else {
      return { 'dnivalidador': 'Formato del dni no es valido' };
    }
  }

  getDataForm(): void {
    console.log(this.modelForm.value)
    this.modelForm.reset()
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.modelForm.get(formControlName)?.hasError(validator) && this.modelForm.get(formControlName)?.touched;
  }

  irAPedidoRealizado(): void {
    this.router.navigate(['/pedido-realizado']);
  }

  //TOTAL

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

  calcularTotalCesta(): string {
    let total: number = 0;
    this.productosEnCarrito.forEach(producto => {
      total += this.calcularPrecioTotal(producto);
    });
    return this.formatPrice(total);
  }

  formatPrice(price: number): string {
    const formattedPrice = price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    return formattedPrice.replace(/\s/g, '');
  }

}
