import { AfterViewInit, Attribute, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";

import { ScrollSpyService } from "./scroll-spy.service";

@Directive({
    selector: "[runnerWatchesAnchor]",
})
export class WatchesAnchorDirective implements AfterViewInit, OnDestroy {

    @Output() active: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isActive = false;

    private elementId;
    private selfRef;
    private anchorSubscription;


    constructor(
        @Attribute("href") elementId,
        elem: ElementRef,
        private scrollSpyService: ScrollSpyService,
    ) {
        this.elementId = elementId;
        this.selfRef = elem;
    }

    public ngAfterViewInit() {
        this.elementId = this.selfRef.nativeElement.hash;
        this.anchorSubscription = this.scrollSpyService.active$
            .subscribe((value) => {
                this.isActive = this.elementId === value;
                this.active.emit(this.isActive);
        });
    }



    public ngOnDestroy() {
        this.anchorSubscription.unsubscribe();
    }

}
