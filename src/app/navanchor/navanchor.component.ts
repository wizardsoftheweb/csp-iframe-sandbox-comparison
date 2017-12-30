import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { ScrollSpyService } from "../scroll-spy.service";
import { WatchesAnchorDirective } from "../watches-anchor.directive";

@Component({
    selector: "runner-navanchor",
    templateUrl: "./navanchor.component.html",
    styleUrls: ["./navanchor.component.css"],
})
export class NavanchorComponent implements OnInit {
    @Input() linkTarget: string;
    @Input() isHidden = false;

    private activeSubscription;


    public isActive: boolean;

    // @ViewChild(WatchesAnchorDirective)
    // set activeState(directive: WatchesAnchorDirective) {
    //     this.isActive = directive.isActive;
    // }

    public ngOnInit() {

    }

    public ngAfterViewInit() {
        // this.activeSubscription = this.
        console.log(this.linkTarget);
    }
    public updateActiveState(event) {
        this.isActive = event;
    }

    // ngOnDestroy() {
    //     this.activeSubscription.unsubscribe();
    // }

}
