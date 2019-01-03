import { Component, OnInit, Input } from '@angular/core';
import { fromUser } from '~/core/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() user: fromUser.SmartState;

  constructor() { }

  ngOnInit() {
  }

}
