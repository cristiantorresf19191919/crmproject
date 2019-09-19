import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";
@Directive({
  selector: "[appFontTag]"
})
export class FontTagDirective {
  possibleColors = [
    '#804000', '#003300', '#1a1a00', '#00001a', '#1a0000',
    '#28283e', '#264d00', '#330000', '#cc2900'
  ];
  @HostBinding("style.backgroundColor") miColor: string;
  @HostBinding("style.Color") miColorback: string;
  @HostBinding("style.border") borde: string;
  constructor() {
    console.log('hola');
  }
  @HostListener("scroll", ["$event"]) public onScroll($event: Event) {
    console.log($event);
    this.borde = "60px solid black";
  }

  @HostListener("mouseenter", ["$event"]) ejecutate(eventData: Event) {
    /* this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      "#ccebff"
    ); */
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.miColor = this.miColorback = this.possibleColors[colorPick];
    this.borde = "2px solid black";
    console.log(eventData);
  }

  @HostListener("mouseleave") ejecutate2(eventData: Event) {
    /* this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      "#ccebff"
    ); */
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.miColor = this.miColorback = this.possibleColors[colorPick];
    this.borde = "2px solid black";
  }
}
