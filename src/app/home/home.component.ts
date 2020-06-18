import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  showInfo: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  public changeDisplayInfo() {
    this.showInfo = !this.showInfo;
  }

  public ViewAllProducts()
  {
    this.router.navigate(['/product']);
  }
}