import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  //showDashboard: boolean = true; 
  title = 'frontend';

  constructor(private router: Router) {}
  
  // ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // Check the current route to decide whether to show the dashboard
  //       this.showDashboard = !event.url.includes('/login'); // Add other routes if needed
  //     }
  //   });
  // }
  

  isCollapsed = false;

  
}
