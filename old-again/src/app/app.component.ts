import { Component, OnInit } from "@angular/core";

// import { ResizeService } from "./scrollspy.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    // providers: [ResizeService],
})
export class AppComponent implements OnInit {
  public title = "app";

  public constructor() {
      console.log("app ctor");
  }
    public ngOnInit() {
        console.log("loaded");
        // this.resizeSubscription = this.resizeService.onResize$
        //     .subscribe((size) => console.log(size));
    }
}
