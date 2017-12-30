import { Component, OnInit } from '@angular/core';

import { TrackedAnchorDirective } from "../tracked-anchor.directive";

const VALID_PROPS = [
    "scripts",
    "popups",
    "modals",
    "forms",
    "same-origin",
    "orientation-lock",
    "pointer-lock",
    "presentation",
    "popups-to-escape-sandbox",
    "top-navigation"
];

const FLESHED_OUT = [
    {
        "name": "scripts",
        "dependencies": []
    },
    {
        "name": "popups",
        "dependencies": ["scripts"]
    },
    {
        "name": "modals",
        "dependencies": ["scripts"]
    },
    {
        "name": "forms",
        "dependencies": []
    },
    {
        "name": "same-origin",
        "dependencies": []
    },
    {
        "name": "orientation-lock",
        "dependencies": []
    },
    {
        "name": "pointer-lock",
        "dependencies": []
    },
    {
        "name": "presentation",
        "dependencies": []
    },
    {
        "name": "popups-to-escape-sandbox",
        "dependencies": ["scripts"]
    },
    {
        "name": "top-navigation",
        "dependencies": ["scripts"]
    },
];

@Component({
    selector: 'runner-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

    public props = VALID_PROPS;

    constructor() { }

    ngOnInit() {
    }

}
