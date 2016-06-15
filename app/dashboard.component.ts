import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component ({
	selector: 'my-dashboard',
	templateUrl: 'app/template/dashboard.component.html',
	styleUrls: ['app/assets/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	heroes : Hero[];
	SelectedHero: Hero;
	constructor(private heroService: HeroService, private router: Router) {}
  
	ngOnInit() {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(0,5) );
	}

	gotoDetail(hero: Hero) {
		let link = ['HeroDetail', { id: hero.id }];
		this.router.navigate(link);
	}

}
