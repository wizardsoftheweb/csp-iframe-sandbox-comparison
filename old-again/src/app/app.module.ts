import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
// import { LeadComponent } from "./lead/lead.component";
// import { NavbarComponent } from "./navbar/navbar.component";

// import { ResizeService } from "./scrollspy.service";

@NgModule({
    declarations: [
        AppComponent,
        // LeadComponent,
        // NavbarComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserModule,
        // RouterModule.forRoot() // Add routes to the app
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
