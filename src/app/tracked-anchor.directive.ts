import { AfterViewInit, Attribute, Directive, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

import { ScrollSpyService } from "./scroll-spy.service";

@Directive({
    selector: "[runnerTrackedAnchor]",
})
export class TrackedAnchorDirective implements AfterViewInit {

    @Output() pagePosition: EventEmitter<number> = new EventEmitter<number>();

    private elementId;
    private selfRef;

    constructor(
        @Attribute("id") elementId,
        elem: ElementRef,
        private scrollSpyService: ScrollSpyService,
    ) {
        this.elementId = elementId;
        this.selfRef = elem;
    }

    public ngAfterViewInit() {
        this.scrollSpyService.registerElement(this.elementId, this.selfRef);
        this.pagePosition.emit(this.selfRef.nativeElement.offsetTop);
    }

}