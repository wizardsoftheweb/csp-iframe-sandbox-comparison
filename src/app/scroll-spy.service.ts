import { Injectable } from "@angular/core";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ScrollSpyService {
    public height$: Observable<number>;
    public position$: Observable<number>;
    public active$: Observable<string>;
    public trackedElements: any[] = [];

    constructor() {
        const windowPosition$ = new BehaviorSubject(getWindowPosition());
        const activeSubject$ = new BehaviorSubject(this.determineActiveId());

        this.position$ = windowPosition$
            .asObservable()
            .map((value) => {
                return value;
            })
            .distinctUntilChanged();

        this.active$ = activeSubject$
            .asObservable()
            .distinctUntilChanged();

        Observable.fromEvent(window, "scroll")
            .map(getWindowPosition)
            .subscribe((value) => {
                windowPosition$.next(value);
                activeSubject$.next(this.determineActiveId(value));
            });

        this.active$.subscribe((value) => {
            console.log(value);
        });
    }

    public registerElement(elementId, elementRef) {
        this.addTrackedElement(
            elementId,
            elementRef.nativeElement.offsetTop,
            elementRef,
        );
    }

    public addTrackedElement(id, height, ref) {
        if (id) {
            this.trackedElements.push({
                height,
                id: `#${id.replace(/^#/, "")}`,
                ref,
            });
            this.trackedElements.sort(compareElements);
            this.determineActiveId();
        }
    }

    public determineActiveId(currentPosition = null): string {
        currentPosition = currentPosition || getWindowPosition();
        let possibleElement;
        for (const element of this.trackedElements) {
            if (element.height > currentPosition) {
                break;
            } else {
                possibleElement = element;
            }
        }
        if (possibleElement) {
            return possibleElement.id;
        }
        return "";
    }

}

function compareElements(elementA, elementB) {
    if (elementA.height < elementB.height) {
        return -1;
    } else if (elementA.height > elementB.height) {
        return 1;
    }
    return 0;

}

function getWindowPosition() {
    return window.pageYOffset;
}

function doStuff() {
    alert("cool");
}