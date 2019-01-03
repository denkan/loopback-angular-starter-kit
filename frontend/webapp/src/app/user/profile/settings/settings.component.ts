import { Component, OnInit } from '@angular/core';
import { UserService } from '~/core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public user: UserService,
  ) { }

  ngOnInit() {
  }

}
