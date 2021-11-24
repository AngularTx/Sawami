import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IProduct {
  code: number;
  name: string;
  barcode: number;
  cost: number;
  taxes: Array<number>;
  saleprice: number;
  active: boolean;
  created: Date;
  updated: Date;
  description?: string;
  priceIncludeTax?: boolean;

}

function generateId() {
  return Math.floor(Math.random() * 1000);
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = [{
    code: 1,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: false,
    created: new Date(),
    updated: new Date(),
  },
  {
    code: 2,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  },
  {
    code: 3,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 4,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  },
  {
    code: 5,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 6,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 7,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 8,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 9,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 10,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: true,
    created: new Date(),
    updated: new Date()
  }, {
    code: 11,
    name: 'abc',
    barcode: 123456,
    cost: 123,
    taxes: [5, 10],
    saleprice: 200,
    active: false,
    created: new Date(),
    updated: new Date()
  }];

  products$ = new BehaviorSubject<IProduct[]>(this.products);


  removeProduct(product: IProduct) {
    const index = this.products.indexOf(product);
    this.products = [
      ...this.products.slice(0, index),
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
  }

  addProduct(product: IProduct) {
    this.products = [
      {
        ...{ code: generateId() },
        ...product,
      },
      ...this.products,
    ];
    this.products$.next(this.products);
  }

  editProduct(ids: any, product: IProduct) {
    const index = this.products.findIndex(p => p.code === ids);
    this.products = [
      ...this.products.slice(0, index),
      {
        ...{ ids },
        ...product,
      },
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
  }
}
