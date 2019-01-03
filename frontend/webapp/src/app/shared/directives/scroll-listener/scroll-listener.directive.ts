import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollListener]'
})
export class ScrollListenerDirective {
  @Output() scrollListener = new EventEmitter();

  @HostListener('scroll',['$event'])
  onScroll($event){
    this.scrollListener.emit($event);
  }

  constructor() { }

}
