import {Component, Input, OnInit, Output} from '@angular/core';
import {HeroService} from './hero.service';
import {RouteParams} from '@angular/router-deprecated';
import {Hero} from './hero';
import any = jasmine.any;
import {EventEmitter} from "@angular/compiler/esm/src/facade/async";

@Component ({
  selector: "my-hero-detail",
  templateUrl: "app/template/hero-detail.component.html",
  styleUrls: ["app/assets/hero-detail.component.css"]
})

export class HeroDetailComponent implements OnInit {
  navigated = false;
  error = any;
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  constructor(private heroService: HeroService, private routeParams: RouteParams){

  }

  save (){
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero; //saved hero, w/ id if new
        this.goBack(hero);
      })
      .catch(error => this.error = error);
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null){
      let id= +this.routeParams.get('id');
      this.navigated = true;
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
    // let id = +this.routeParams.get('id');
    // this.heroService.getHero(id).then(hero => this.hero = hero);
  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
