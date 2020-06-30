import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Suneel Rudra Sahu';
  public hasError = false;
  EmpScreen: boolean=false;
  DepScreen: boolean=true;
 
}
