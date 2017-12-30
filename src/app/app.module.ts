import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';


import { AppComponent } from "./app.component";
import { LeadComponent } from "./lead/lead.component";
import { NavanchorComponent } from "./navanchor/navanchor.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ScrollSpyService } from "./scroll-spy.service";
import { TrackedAnchorDirective } from "./tracked-anchor.directive";
import { WatchesAnchorDirective } from "./watches-anchor.directive";
import { PrivacyComponent } from './privacy/privacy.component';
import { OtherStuffComponent } from './other-stuff/other-stuff.component';
import { OverviewComponent } from './overview/overview.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxTabsComponent } from './sandbox-tabs/sandbox-tabs.component';
import { SandboxSidebarLinksComponent } from './sandbox-sidebar-links/sandbox-sidebar-links.component';
import { SandboxStateService } from './sandbox-state.service';


@NgModule({
    declarations: [
        AppComponent,
        LeadComponent,
        NavbarComponent,
        TrackedAnchorDirective,
        WatchesAnchorDirective,
        NavanchorComponent,
        PrivacyComponent,
        OtherStuffComponent,
        OverviewComponent,
        SandboxComponent,
        SandboxTabsComponent,
        SandboxSidebarLinksComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [ScrollSpyService, SandboxStateService],
    bootstrap: [AppComponent],
})
export class AppModule { }
