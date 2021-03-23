import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public userDetails;

  constructor(private router: Router, private userService: UserService) {
    localStorage.getItem('token');
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
      },
      (err) => {}
    );
  }

  Logout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
