// import { Injectable } from "@angular/core";
// import { EventManager } from "@angular/platform-browser";
// import { Observable } from "rxjs/Observable";
// import { Subject } from "rxjs/Subject";

// @Injectable()
// export class ResizeService {

//     get onResize$(): Observable<Window> {
//         return this.resizeSubject.asObservable();
//     }

//     private resizeSubject: Subject<Window>;

//     constructor(private eventManager: EventManager) {
//         this.resizeSubject = new Subject();
//         this.eventManager.addGlobalEventListener("window", "resize", this.onResize.bind(this));
//     }

//     private onResize(event: UIEvent) {
//         this.resizeSubject.next(event.target as Window);
//     }
// }
