import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { TramitarPedidoComponent } from './pages/tramitar-pedido/tramitar-pedido.component';
import { PedidoRealizadoComponent } from './pages/pedido-realizado/pedido-realizado.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:categoria', component: CategoriaComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'home/:categoria/:nombre', component: ProductDetailComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'tramitar-pedido', component: TramitarPedidoComponent },
  { path: 'pedido-realizado', component: PedidoRealizadoComponent },
  { path: '', redirectTo: '/tramitar-pedido', pathMatch: 'full' },
  { path: 'cart', component: CSSMatrixComponent },
  { path: '**', component: PageNotFoundComponent }
];
