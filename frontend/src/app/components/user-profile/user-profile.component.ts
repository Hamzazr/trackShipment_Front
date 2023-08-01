import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { User } from '../../components/models/user.interface';

import { UserService } from 'src/app/services/user-Service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  userId: number | null  = null; 
  private sub: Subscription;
  user: User | null = null;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService : UserService 
    ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).pipe(
        map((user : User) => this.user = user )
      ).subscribe()
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  
}
