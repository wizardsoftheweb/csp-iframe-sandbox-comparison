import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { WatchesAnchorDirective } from "../watches-anchor.directive";
import { ScrollSpyService } from '../scroll-spy.service';

@Component({
  selector: 'runner-navanchor',
  templateUrl: './navanchor.component.html',
  styleUrls: ['./navanchor.component.css']
})
export class NavanchorComponent implements OnInit {
    @Input() linkTarget: string;
    @Input() isHidden: boolean = false;

    private activeSubscription;


    isActive: boolean;

    // @ViewChild(WatchesAnchorDirective)
    // set activeState(directive: WatchesAnchorDirective) {
    //     this.isActive = directive.isActive;
    // }

  ngOnInit() {

  }

  ngAfterViewInit() {
      // this.activeSubscription = this.
      console.log(this.linkTarget);
  }
  updateActiveState(event) {
      this.isActive = event;
  }

  // ngOnDestroy() {
  //     this.activeSubscription.unsubscribe();
  // }

}
