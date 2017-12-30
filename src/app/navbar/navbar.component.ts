import { Component, OnInit } from "@angular/core";

import { ScrollSpyService } from "../scroll-spy.service";
import { TrackedAnchorDirective } from "../tracked-anchor.directive";

@Component({
    selector: "runner-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {

    private originalPosition = 0;
    private currentPosition = 0;
    private scrollSub;

    constructor(private scrollSpyService: ScrollSpyService) {

        // subscribe to the window resize event

    }

    public update(event) {
        console.log(event);
    }

    public ngOnInit() {
        this.scrollSub = this.scrollSpyService.position$
            .subscribe((value) => {
                // console.log(this.currentPosition, this.originalPosition);
                this.currentPosition = value;
            });
    }

    public updatePosition(position) {
        this.originalPosition = position;
    }

}
