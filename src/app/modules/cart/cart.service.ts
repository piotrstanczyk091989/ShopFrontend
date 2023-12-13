import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartCommonService } from '../common/service/cart-common.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private cartCommonService: CartCommonService
    ) { }
  
  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id);
  }

  addToCart(id: number, cartItem: any): Observable<CartSummary> {
    return this.http.put<CartSummary>("/api/carts/" + id, cartItem);
  }

  updateCart(id: number, items: any[]): Observable<CartSummary>  {
    return this.http.put<CartSummary>("/api/carts/" + id + "/update" , items);
  }

  deleteCartItem(itemId: number): Observable<void> {
    return this.http.delete<void>("/api/cartItems/" + itemId);
  }

}
