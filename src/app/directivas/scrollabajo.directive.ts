import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appScrollabajo]"
})
export class ScrollabajoDirective {
  @HostBinding("style.color") miColor: string;

  @HostListener("mouseenter", ["$event"]) ejecutate(eventData: Event) {
    /* this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      "#ccebff"
    ); */
    this.elementRef.nativeElement.scrollDown = 30000;
  }

  constructor(public elementRef: ElementRef) {
    this.elementRef.nativeElement.scrollDown = 30000;
  }
}
