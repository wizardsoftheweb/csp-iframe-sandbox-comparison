import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SandboxStateService } from "../sandbox-state.service";

@Component({
    selector: 'runner-sandbox-sidebar-links',
    templateUrl: './sandbox-sidebar-links.component.html',
    styleUrls: ['./sandbox-sidebar-links.component.css']
})
export class SandboxSidebarLinksComponent implements OnInit, OnDestroy {
    @Input() href: string;

    isActive = false;

    exampleAsQueryParam: string;

    private liveExample;

    constructor(private sandboxState: SandboxStateService) {

    }

    ngOnInit() {
        this.exampleAsQueryParam = this.buildTarget(this.href);
        this.liveExample = this.sandboxState.activeExample$.subscribe((value) => {
            this.isActive = this.exampleAsQueryParam === value;
        });
    }

    ngOnDestroy() {

    }

    buildTarget(href) {
        return this.href;
    }

    onClick(event: any) {
        this.sandboxState.updateExampleSource(this.exampleAsQueryParam);
        event.preventDefault();
        event.stopPropagation();
    }


}
