import { Component } from '@angular/core';
import { rotateGlueFromRight } from "ngx-router-animations";
import { routerTransition } from './router.animations';
import { trigger, transition, useAnimation } from "@angular/animations";
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})

export class AppComponent {
  title = 'CumbreAndina';
  boolean: boolean = true;

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
