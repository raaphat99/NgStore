import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ProductCard]'
})
export class ProductCardDirective {
  // Properties
  defaultColor: string = "rgb(255, 255, 255, 0.8)";
  // this decorator enables me to set this value from outside the class. (and from inside the HTML tag)
  @Input() BGColor: string = "";

  // Constructor
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
    this.element.nativeElement.style.border = "2px solid gray";
    this.element.nativeElement.style.borderRadius = "4px";
    // X-offset | Y-offset | Blur | Spread | Color
    this.element.nativeElement.style.boxShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.2)";
  }

  // Methods
  @HostListener("mouseover") onMouseOver() {
    this.element.nativeElement.style.boxShadow = "0px 4px 8px 5px rgba(0, 0, 0, 0.2)";
    this.element.nativeElement.style.backgroundColor = this.BGColor;
  }
  @HostListener("mouseout") onMouseOut() {
    this.element.nativeElement.style.boxShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.2)";
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

}
