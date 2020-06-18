import { Component, OnInit } from '@angular/core';
import { HostListener, Inject } from "@angular/core";

declare const window: any;
@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css']
})
export class WhyComponent implements OnInit {
clsGreen:string="part1";
  constructor() { }

  ngOnInit() {
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 300 && number<600) {
      this.clsGreen="part2";
    } else if (number > 600 && number<900) {
      this.clsGreen="part3";
    }
    else if (number > 900 && number<1250) {
      this.clsGreen="part4";
    }
    else if (number > 1250 && number<1650) {
      this.clsGreen="part5";
    }
    else if (number > 1650 && number<2100) {
      this.clsGreen="part6";
    }
    else if (number > 1800) {
      this.clsGreen="part7";
    }
    else{
      this.clsGreen="part1";
    }

  }

}
