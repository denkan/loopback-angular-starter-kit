import { Component, OnInit, Input } from '@angular/core';
import { fromUser } from '~/core/store';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() user: fromUser.SmartState;

  constructor() { }

  ngOnInit() {
  }
}
