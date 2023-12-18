import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { CookieService } from 'ngx-cookie-service';
import { CartIconService } from 'src/app/modules/common/service/cart-icon.service';
import { JwtService } from 'src/app/modules/common/service/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Shop";
  cartProductCounter = "";
  isLoggetIn = false;

  constructor(
    private cookieservice: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subject
    .subscribe(counter => this.cartProductCounter = String(Number(counter)>0 ? counter:""));
    this.isLoggetIn = this.jwtService.isLoggedIn();
  }

  getCountProducts() {
    this.headerService.getCountProducts(Number(this.cookieservice.get("cartId")))
      .subscribe(counter => this.cartProductCounter = String(Number(counter) > 0 ? counter : ""));
  }

}
