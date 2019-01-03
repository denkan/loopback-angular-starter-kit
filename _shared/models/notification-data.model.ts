

export interface NotificationDataInterface {
  heading?: string;
  content?: string;
  headings?: ContentByLanguage;
  contents?: ContentByLanguage;
  data?: any;
}

export class NotificationData {
  headings: ContentByLanguage;
  contents: ContentByLanguage;
  data: any;

  private _heading: string;
  private _content: string;

  set heading(value: string) {
    this.headings = typeof this.headings === 'object' ? this.headings : {};
    this.headings['en'] = value;
  }
  set content(value: string) {
    this.contents = typeof this.contents === 'object' ? this.contents : {};
    this.contents['en'] = value;
  }
  get heading() { return this.headings['en']; }
  get content() { return this.contents['en']; }

  constructor(props?: NotificationDataInterface) {
    Object.assign(this, props);
  }
}


export type ContentByLanguage = { [langId: string]: string };
