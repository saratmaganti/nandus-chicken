import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  paymentStatus: any;
  paymentStatusMessage: string;

  constructor(
    private router: Router
  ) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.paymentStatusMessage = sessionStorage.getItem('paymentStatusMessage');
    this.paymentStatus = sessionStorage.getItem('paymentStatus');
  }

}
