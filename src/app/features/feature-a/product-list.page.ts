import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductActions from './store/product.actions';
import * as ProductSelectors from './store/product.selectors';

@Component({
  selector: 'fa-product-list',
  standalone: true,
  template: `
    <h2>Product List</h2>
    <button (click)="loadProducts()">Ürünleri Yükle</button>
    <div *ngIf="loading$ | async">Yükleniyor...</div>
    <ul>
      <li *ngFor="let product of products$ | async">{{ product.name }}</li>
    </ul>
    <div *ngIf="error$ | async as error">Hata: {{ error }}</div>
  `
})
export class ProductListPage {
  products$!: Observable<{ id: number; name: string }[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store) {
    this.products$ = this.store.select(ProductSelectors.selectProducts);
    this.loading$ = this.store.select(ProductSelectors.selectLoading);
    this.error$ = this.store.select(ProductSelectors.selectError);
  }

  loadProducts() {
    this.store.dispatch(ProductActions.loadProducts());
  }
} 