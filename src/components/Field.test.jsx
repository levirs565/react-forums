import React from 'react';
import { describe, expect, it } from 'vitest';
import { useForm } from 'react-hook-form';
import { Field, FieldInput, FieldLabel } from './Field';
import { render, screen, userEvent } from '../test/utils';

function InputWithControl() {
  const { control } = useForm();
  return <FieldInput control={control} name="test" type="text" />;
}

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
