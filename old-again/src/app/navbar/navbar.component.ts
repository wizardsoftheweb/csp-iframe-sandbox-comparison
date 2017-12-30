// import { Component, OnDestroy, OnInit } from "@angular/core";
// import { Subscription } from "rxjs";

// import { ResizeService } from "../scrollspy.service";

// @Component({
//     selector: "app-navbar",
//     templateUrl: "./navbar.component.html",
//     styleUrls: ["./navbar.component.css"],
//     // providers: [ResizeService],
// })
// export class NavbarComponent implements OnInit, OnDestroy {
//     private resizeSubscription: Subscription;

//     // constructor(private resizeService: ResizeService) { }

//     public ngOnInit() {
//         console.log("loaded");
//         // this.resizeSubscription = this.resizeService.onResize$
//         //     .subscribe((size) => console.log(size));
//     }

//     public ngOnDestroy() {
//         // if (this.resizeSubscription) {
//         //     this.resizeSubscription.unsubscribe();
//         // }
//     }
// }
