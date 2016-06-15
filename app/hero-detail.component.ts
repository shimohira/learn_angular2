import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from './hero.service';
import {RouteParams} from '@angular/router-deprecated';
import {Hero} from './hero';

@Component ({
	selector: "my-hero-detail",
	templateUrl: "app/template/hero-detail.component.html",
	styleUrls: ["app/assets/hero-detail.component.css"]
})

export class HeroDetailComponent implements OnInit {
  private navigated = false;
	//@Input()
	hero: Hero;
	constructor(private heroService: HeroService, private routeParams: RouteParams){

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

	goBack() {
		window.history.back();
	}
}
