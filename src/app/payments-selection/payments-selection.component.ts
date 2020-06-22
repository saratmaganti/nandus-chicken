import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-selection',
  templateUrl: './payments-selection.component.html',
  styleUrls: ['./payments-selection.component.css']
})
export class PaymentsSelectionComponent implements OnInit {

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  proceedPayment(paymentMode) {
    if (paymentMode == 'cod') {
      this.cashOnDeliveryPayment(paymentMode);
    } else if (paymentMode === 'razorpay') {
      alert('Work in Progress');
    } else if (paymentMode === 'paytm') {
      alert('Work in Progress');
    } else {

    }
  }

  cashOnDeliveryPayment(paymentMode) {
    let userId = sessionStorage.getItem('userKey');
    this.shoppingCartService.GetCartDetails(userId).subscribe(
      cart => {
        console.log(cart);
        const cartList = cart[0];
        const UserAddressInfo = JSON.parse(sessionStorage.getItem('currentBillingAddress'));
        const payload = this.preparePayload(paymentMode, cartList, UserAddressInfo);
        console.log(payload);
        setTimeout(() => {
          this.proceedToPlaceOrder(payload);
        }, 5);
      });
  }

  proceedToPlaceOrder(payload) {
    this.shoppingCartService.proceedToCompleteOrder(payload).subscribe((resp: any) => {
      // alert(JSON.stringify(resp));
      console.log(resp);
      if (resp && resp.status == 'true') {
        alert(resp.message);
        sessionStorage.setItem('paymentStatusMessage', resp.message);
        sessionStorage.setItem('paymentStatus', 'true');
        this.router.navigate(['/payment-status']);
      } else {
        alert(resp.message);
        sessionStorage.setItem('paymentStatusMessage', resp.message);
        sessionStorage.setItem('paymentStatus', 'false');
        this.router.navigate(['/payment-status']);
      }
    }, errors => {
      console.log(errors);
    });
  }

  taxOnTotal = (totalAmt) => {
    const tax = 12;
    const taxAmount = (totalAmt * tax) / 100;
    const grandTotal = (totalAmt + taxAmount);
    return grandTotal;
  };
  preparePayload(paymentMode, cartRespObj, UserAddressInfo) {
    const cartList = cartRespObj["result"];
    const cartTotalAmount = cartRespObj['total_amount'];
    console.log(UserAddressInfo);
    const makeCartItem = (item) => {
      const itemTotalAmount = item.product_price * item.product_qty;

      const cartObj = {
        "charges": [
          {
            "title": "Packaging Charge",
            "value": 10.0
          }
        ],
        "discount": 0,
        "food_type": "1",
        "id": 49456547,
        "image_landscape_url": null,
        "image_url": null,
        "merchant_id": "13",
        "options_to_add": [
          // {
          //   "id": 11262,
          //   "merchant_id": "394",
          //   "price": 200.0,
          //   "title": "Small"
          // },
          // {
          //   "id": 11263,
          //   "merchant_id": "295",
          //   "price": 50.0,
          //   "title": "Cheese"
          // }
        ],
        "options_to_remove": [

        ],
        "price": item.product_price,
        "quantity": item.product_qty,
        "taxes": [
          {
            "rate": 2.5,
            "title": "CGST",
            "value": 6.0
          },
          {
            "rate": 2.5,
            "title": "SGST",
            "value": 6.0
          }
        ],
        "title": item.product_name,
        "total": itemTotalAmount,
        "total_with_tax": this.taxOnTotal(itemTotalAmount),
        "unit_weight": null
      };
      return cartObj;
    };
    const prepareCartItems = (cartList$) => {
      const preparedCartList = [];
      cartList$.forEach((item, pos) => {
        const cartObj = makeCartItem(item);
        preparedCartList.push(cartObj);
      });
      return preparedCartList;
    };
    const generateTransactId = (num) => {
      return Math.floor(Math.random() * num);
    };
    const currentDate = Date.parse((new Date()).toString());
    const merchant_ref_id = generateTransactId(1000000000);
    const store_id = sessionStorage.getItem('store_id');
    const cartObj = {
      "customer": {
        "address": UserAddressInfo,
        "email": UserAddressInfo.customer_email,
        "name": UserAddressInfo.first_name + ' ' + UserAddressInfo.last_name,
        "phone": UserAddressInfo.customer_mobile
      },
      "order": {
        "details": {
          "biz_id": generateTransactId(100000000),
          "channel": "",
          "charges": [
            {
              "taxes": [
                {
                  "title": "DELIVERY",
                  "value": 2.0
                }
              ],
              "title": "Delivery Charge",
              "value": 40.0
            }
          ],
          "coupon": "FLAT55",
          "created": currentDate,
          "delivery_datetime": currentDate,
          "discount": 0,
          "total_external_discount": 0,
          "ext_platforms": [
            {
              "id": merchant_ref_id,
              "kind": "food_aggregator",
              "name": "zomato",
              "delivery_type": "partner",
              "extras": {
                "order_type": "pop",
                "thirty_minutes_delivery": true,
                "cash_to_be_collected": this.taxOnTotal(cartTotalAmount)
              },
              "discounts": [
                {
                  "is_merchant_discount": true,
                  "rate": 0.0,
                  "title": "Restaurant Promo",
                  "value": 10.0,
                  "code": "FLAT30"
                },
                {
                  "is_merchant_discount": false,
                  "rate": 0.0,
                  "title": "Restaurant Promo",
                  "value": 20.0,
                  "code": "FLAT30"
                }
              ]
            }
          ],
          "id": generateTransactId(1000000),
          "instructions": "Address Instructions: test",
          "item_level_total_charges": 10.0,
          "item_level_total_taxes": 12.0,
          "item_taxes": 0.0,
          "merchant_ref_id": merchant_ref_id,
          "order_level_total_charges": 20,
          "order_level_total_taxes": 0,
          "order_state": "Placed",
          "order_subtotal": cartTotalAmount,
          "order_total": this.taxOnTotal(cartTotalAmount),
          "order_type": "delivery",
          "state": "Placed",
          "taxes": [

          ],
          "total_charges": 30.0,
          "total_taxes": 12.0
        },
        "items": prepareCartItems(cartList),
        // status details 
        "next_state": "Acknowledged",
        "next_states": [
          "Acknowledged",
          "Food Ready",
          "Dispatched",
          "Modified",
          "Completed",
          "Cancelled"
        ],
        // payment details
        "payment": [
          {
            "amount": cartTotalAmount,
            "option": paymentMode,
            "srvr_trx_id": null
          },
          {
            "amount": 5.0,
            "option": "wallet_credit"
          }
        ],
        // store details
        "store": {
          "address": "Sector 7,HSR Layout",
          "id": store_id,
          "latitude": 12.908136,
          "longitude": 77.647608,
          "merchant_ref_id": "1",
          "name": "HSR Layout"
        },
        "order_from" :"1"
      }
    };
    return cartObj;

  }

  ngOnInit() {
  }

}
