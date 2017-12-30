import { Attribute, Directive, ViewChild, EventEmitter, Input, ElementRef, AfterViewInit, Output, OnDestroy } from '@angular/core';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[runnerWatchesAnchor]',
})
export class WatchesAnchorDirective implements AfterViewInit, OnDestroy {

    @Output() active: EventEmitter<boolean> = new EventEmitter<boolean>();

    private elementId;
    private selfRef;
    private anchorSubscription;
    public isActive = false;

    constructor(
        @Attribute('href') elementId,
        elem: ElementRef,
        private scrollSpyService: ScrollSpyService
    ) {
        this.elementId = elementId;
        this.selfRef = elem;
    }

    ngAfterViewInit() {
        this.elementId = this.selfRef.nativeElement.hash;
               this.anchorSubscription = this.scrollSpyService.active$
            .subscribe((value) => {
                this.isActive = this.elementId === value;
                this.active.emit(this.isActive);
        });
    }



    ngOnDestroy() {
        this.anchorSubscription.unsubscribe();
    }

}
