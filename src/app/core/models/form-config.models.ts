export enum FieldType {
    Text = 'text',
    Email = 'email',
    Password = 'password',
    Textarea = 'textarea',
    Select = 'select',
    Number = 'number',
    Date = 'date',
    Time = 'time'
  }
  
  export interface FormConfig {
    type: FieldType;
    label: string;
    name: string;
    options?: string[];
    validations?: any[];
  }
  