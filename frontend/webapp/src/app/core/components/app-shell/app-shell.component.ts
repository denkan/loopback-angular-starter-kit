import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '~/core/services';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  @Input() title: string;

  constructor(
    public user: UserService,
  ) {
  }

  ngOnInit() {
  }

}
