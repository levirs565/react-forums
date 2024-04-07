import React from 'react';
import { describe, expect, it } from 'vitest';
import { useForm } from 'react-hook-form';
import { Field, FieldInput, FieldLabel } from './Field';
import { render, screen, userEvent } from '../test/utils';

function InputWithControl() {
  const { control } = useForm();
  return <FieldInput control={control} name="test" type="text" />;
}

/*
Skenario pengujian FieldComponent:
- Saat FieldLabel berada di dalam Field, maka atribut for pada label harus berisi nilai inputId
  Field
- Saat FieldInput berada di dalam Field, maka atribut id pada input harus berisi nilai inputId Input
- Saat FieldLabel pada Field di klik, maka FieldInput yang berada di dalam Field tersebut harus
  mendapatkan fokus
*/

describe('Field component', () => {
  it('FieldLabel forId should derived from Field id', () => {
    render(<Field inputId="thisIsId"><FieldLabel>Test</FieldLabel></Field>);
    expect(screen.getByText('Test')).toHaveAttribute('for', 'thisIsId');
  });
  it('FieldInput id should derived from Field id', () => {
    render(<Field inputId="thisIsId"><InputWithControl /></Field>);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'thisIsId');
  });
  it('FieldInput should focus when FieldLabel is clicked', async () => {
    render(
      <Field inputId="thisIsId">
        <FieldLabel>Test</FieldLabel>
        <InputWithControl />
      </Field>,
    );
    await userEvent.click(screen.getByText('Test'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
