

export interface ActionStatusInterface {
  loading: boolean;
  error: Error;
  success: boolean;
}

export class ActionStatus implements ActionStatusInterface {
  loading = false;
  error = null;
  success = false;

  constructor(data?: ActionStatusInterface) {
    Object.assign(this, data);
  }

  setLoading(value: boolean, resetErrorAndSuccess?: boolean) {
    this.loading = value;
    if(resetErrorAndSuccess) {
      this.error = null;
      this.success = false;
    }
    return this; // chain
  }

  setError(value: Error) {
    this.loading = false;
    this.error = value;
    this.success = false;
    return this; // chain
  }

  setSuccess(value: boolean) {
    this.loading = false;
    this.error = null;
    this.success = value;
    return this; // chain
  }

  asNew() {
    return new ActionStatus(this);
  }




}
