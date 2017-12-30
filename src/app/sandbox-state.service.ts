import { Injectable } from "@angular/core";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SandboxStateService {
    public activeExample$: Observable<string>;
    public activeExampleSource: BehaviorSubject<string>;

    constructor() {
        this.activeExampleSource = new BehaviorSubject("sandbox");

        this.activeExample$ = this.activeExampleSource
            .asObservable()
            .distinctUntilChanged();

    }

    public updateExampleSource(link) {
        this.activeExampleSource.next(link);
    }

}
