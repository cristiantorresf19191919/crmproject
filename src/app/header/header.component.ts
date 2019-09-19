import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener
} from "@angular/core";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  rubberBandAnimation
} from "angular-animations";
import Swal from "sweetalert2";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    rubberBandAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class HeaderComponent implements OnInit {
  condition = true;
  isMenuOpen = false;
  @ViewChild("menuToggle") private menuToggle: ElementRef;
  @ViewChild("aa") private aa: ElementRef;
  @ViewChild("bb") private bb: ElementRef;
  @ViewChild("cc") private cc: ElementRef;
  @ViewChild("dd") private dd: ElementRef;
  @ViewChild("ee") private ee: ElementRef;
  @ViewChild("ff") private ff: ElementRef;
  @ViewChild("gg") private gg: ElementRef;
  @ViewChild("menu") private menu: ElementRef;
  @ViewChild("nav") private nav: ElementRef;
  @ViewChild("splash") private splash: ElementRef;
  constructor(private renderer: Renderer2) {}
  splashClick(evento: any){
    evento.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;
    this.menu.nativeElement.hidden = !this.isMenuOpen;
    this.nav.nativeElement.classList.toggle("nav--open");
  }
  menuToggleClick(evento: any) {
    evento.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;  
    this.aa.nativeElement.className += "bounceInRight";
    this.renderer.addClass(this.bb.nativeElement, "bounceInRight");
    this.renderer.addClass(this.cc.nativeElement, "bounceInRight");
    this.renderer.addClass(this.dd.nativeElement, "bounceInRight");
    this.renderer.addClass(this.ee.nativeElement, "bounceInRight");
    this.renderer.addClass(this.ff.nativeElement, "bounceInRight");
    this.renderer.addClass(this.gg.nativeElement, "bounceInRight");

    this.renderer.setAttribute(
      this.menuToggle.nativeElement,
      "aria-expanded",
      String(this.isMenuOpen)
    );
    this.menu.nativeElement.hidden = !this.isMenuOpen;

    this.nav.nativeElement.classList.toggle("nav--open");

  }
  ngOnInit() {
  /*   const nav = document.querySelector("#nav");
    const menu: any = document.querySelector("#menu");
    const menuToggle: any = document.querySelector(".nav__toggle");
    const linksa = document.querySelector(".aa");
    const linksb = document.querySelector(".bb");
    const linksc = document.querySelector(".cc");
    const linksd = document.querySelector(".dd");
    const linkse = document.querySelector(".ee");
    let isMenuOpen = false;
    console.log(menuToggle); */
    // TOGGLE MENU ACTIVE STATE

    /* menuToggle.addEventListener("click", e => {
      e.preventDefault();
      isMenuOpen = !isMenuOpen;

      linksa.classList.add("bounceInRight");
      linksb.classList.add("bounceInRight");
      linksc.classList.add("bounceInRight");
      linksd.classList.add("bounceInRight");
      linkse.classList.add("bounceInRight");


      menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
      menu.hidden = !isMenuOpen;
      nav.classList.toggle("nav--open");
    }); */

    // TRAP TAB INSIDE NAV WHEN OPEN
    /* nav.addEventListener("keydown", (e: any) => {
      // abort if menu isn't open or modifier keys are pressed
      if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      } */

      // listen for tab press and move focus
      // if we're on either end of the navigation
   /*    const menuLinks = menu.querySelectorAll(".nav__link");
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === menuLinks[0]) {
            menuToggle.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === menuToggle) {
          menuLinks[0].focus();
          e.preventDefault();
        }
      }
    }); */


  } // end ng on init

  cambioCondicion() {
    this.condition = !this.condition;
  }
  wheelmouse(e) {
    if (window.scrollY < 200) {
      this.condition = true;
    } else {
      this.condition = false;
    }
  }
}
