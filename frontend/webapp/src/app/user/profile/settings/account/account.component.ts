import { Component, OnInit, Input } from '@angular/core';

import { AppUser } from '~_shared/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() user: AppUser;

  constructor() { }

  ngOnInit() {
  }

}
