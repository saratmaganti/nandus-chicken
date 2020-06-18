import { Component, OnInit } from '@angular/core';
import { SliderService } from '../core/services/slider.service';
import { SliderInfo } from '../core/models/sliderinfo.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
  sliderInfo: SliderInfo[];
  customOptions: OwlOptions = {
    items: 1,
    dots: true,
    nav: false,
    loop: true,
    lazyLoad: false,
    autoplay: true,
    autoplayTimeout: 2000,
  }

  constructor(private sliderService: SliderService) { }
  ngOnInit() {
    this.sliderService.getAll()
      .subscribe(
        sliderInfo => {
          this.sliderInfo= sliderInfo.sort(sliderInfo=>sliderInfo.slider_position);
          console.log(sliderInfo);
        },
        errors => {
          console.log(errors);
        }
      );
  }

}
