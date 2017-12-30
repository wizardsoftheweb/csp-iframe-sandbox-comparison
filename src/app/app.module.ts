import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";


import { AppComponent } from "./app.component";
import { LeadComponent } from "./lead/lead.component";
import { NavanchorComponent } from "./navanchor/navanchor.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ScrollSpyService } from "./scroll-spy.service";
import { TrackedAnchorDirective } from "./tracked-anchor.directive";
import { WatchesAnchorDirective } from "./watches-anchor.directive";


@NgModule({
  declarations: [
    AppComponent,
    LeadComponent,
    NavbarComponent,
    TrackedAnchorDirective,
    WatchesAnchorDirective,
    NavanchorComponent,
  ],
  imports: [
    BrowserModule,
  ],
    providers: [ScrollSpyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
