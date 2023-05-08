import { DatePicker, DatePickerInput, Dropdown, TextInput, Toggle, TimePicker } from '@carbon/react';
import type { FieldProps } from './types';

const Text = ({ type, label }: FieldProps) => <TextInput type={type} labelText={label} />;
const Date = ({ label }: FieldProps) => (
  <>
    <DatePicker
      datePickerType="single"
      dateFormat="d/m/Y"
    >
      <DatePickerInput
        id="date-picker-single"
        labelText={label}
        placeholder="dd/mm/yyyy"
        //invalid={invalid}
        invalidText="Required"
      />
    </DatePicker>
  </>
);
const DropdownList = ({ label, options }: FieldProps) => (
  <Dropdown
    ariaLabel="Dropdown"
    id="carbon-dropdown-example"
    items={options}
    label="Dropdown menu options"
    itemToString={(item: any) => (item ? item.name : '')}
    titleText={label}
  />
)

const ToggleComponent = ({ label }: FieldProps) => <Toggle labelText={label} labelA="Yes" />
const TimeInput = ({ label }: FieldProps) => <TimePicker labelText={label} />



type FieldComponentMap = {
  [fieldType: string]: (props: FieldProps) => JSX.Element;
}

const FieldComponents: FieldComponentMap = {
  text: Text,
  date: Date,
  number: Text,
  email: Text,
  tel: Text,
  'dropdown-list': DropdownList,
  toggle: ToggleComponent,
  time: TimeInput
};

export default function Field({ type, label, options }: FieldProps) {
  const FieldComponent = FieldComponents[type];

  if (FieldComponent) {
    return (
      <div style={{ padding: '0.5rem' }}>
        <FieldComponent type={type} label={label} options={options} />
      </div>
    );
  }
  console.warn(`Field with fieldType: ${type} is not supported`);

  return null;
}

