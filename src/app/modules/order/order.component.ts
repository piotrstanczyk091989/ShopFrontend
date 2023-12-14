import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './order.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDto } from './model/orderDto';
import { OrderSummary } from './model/orderSummary';
import { InitData } from './model/initData';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cartSummary!: CartSummary;
  formGrup!: FormGroup;
  orderSummary!: OrderSummary;
  initData!: InitData;

  private statuses = new Map<string, string>([
    ["NEW", "Nowy"]
  ]);

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.checkCartEmpty();
    this.formGrup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });
    this.getInitData();
  }

  checkCartEmpty() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.orderService.getCart(cartId)
      .subscribe(summary => this.cartSummary = summary)
  }

  submit() {
    if (this.formGrup.valid) {
      this.orderService.placeOrder({
        firstname: this.formGrup.get('firstname')?.value,
        lastname: this.formGrup.get('lastname')?.value,
        street: this.formGrup.get('street')?.value,
        zipcode: this.formGrup.get('zipcode')?.value,
        city: this.formGrup.get('city')?.value,
        email: this.formGrup.get('email')?.value,
        phone: this.formGrup.get('phone')?.value,
        cartId: Number(this.cookieService.get("cartId")),
        shipmentId: Number(this.formGrup.get("shipment")?.value.id),
        paymentId: Number(this.formGrup.get("payment")?.value.id)
      } as OrderDto)
        .subscribe(orderSummary => {
          this.orderSummary = orderSummary
          this.cookieService.delete("cartId");
        });

    }
  }

  getInitData() {
    this.orderService.getInitData()
      .subscribe(initData => {
        this.initData = initData;
        this.setDefaultShipment();
        this.setDefaultPayment();
      })
  }

  setDefaultShipment() {
    this.formGrup.patchValue({
      "shipment": this.initData.shipment
        .filter(shipment => shipment.defaultShipment === true)[0]
    })
  }

  setDefaultPayment() {
    this.formGrup.patchValue({
      "payment": this.initData.payment
        .filter(payment => payment.defaultPayment === true)[0]
    })
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }


  get firstname() {
    return this.formGrup.get("firstname");
  }

  get lastname() {
    return this.formGrup.get("lastname");
  }

  get street() {
    return this.formGrup.get("street");
  }

  get zipcode() {
    return this.formGrup.get("zipcode");
  }

  get city() {
    return this.formGrup.get("city");
  }

  get email() {
    return this.formGrup.get("email");
  }

  get phone() {
    return this.formGrup.get("phone");
  }

  get shipment() {
    return this.formGrup.get("shipment");
  }

}
