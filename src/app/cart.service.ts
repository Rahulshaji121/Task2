import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isInStock: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cart:Product[]=[];
    private cartCount=new BehaviorSubject<number>(0);
    cartCoun$=this.cartCount.asObservable();

     addToCart(product: Product) {
    if (product.isInStock) {
      this.cart.push(product);
       const uniqueId=new Set(this.cart.map(p=>p.id));
       this.cartCount.next(uniqueId.size);
    } else {
      alert("Out of stock");
    }
  }

  getCart() {
    return this.cart;
  }

}
