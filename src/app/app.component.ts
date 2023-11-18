import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcomMixedAssessment';
  constructor(private bnIdle: BnNgIdleService){}
  ngOnInit(){
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
          //this.logout();
      }
  });
  }

}
