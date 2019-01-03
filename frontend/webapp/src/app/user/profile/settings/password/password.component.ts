import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map, catchError, tap } from 'rxjs/operators';

import { fromUser } from '~/core/store';
import { ActionStatus } from '~_shared/models';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  form = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    renewPassword: ['', Validators.required],
  }, { validator: this.validatePasswords })

  status = new ActionStatus();

  constructor(
    private storeUser: fromUser.UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }

  private validatePasswords(c: AbstractControl) {
    if (c.get('newPassword').value !== c.get('renewPassword').value) {
      return { mismatch: true };
    }
  }

  onSubmit() {
    const f = this.form.value;
    this.status.setLoading(true);

    this.storeUser.changePassword$(f.oldPassword, f.newPassword)
      .subscribe(
        data => this.status.setSuccess(true),
        err => this.status.setError(err.error.error) // <-- wtf
      );
  }

}
