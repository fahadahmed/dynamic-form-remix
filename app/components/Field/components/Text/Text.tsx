import { TextInput } from '@carbon/react';
import type { FieldProps } from '../../types';
const Text = ({ type, label }: FieldProps) => {

  return (
    <TextInput type={type} labelText={label} />
  )
};

export default Text;