import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useI8n } from '../provider/context';
import {
  CardForm,
  CardFormContent,
  CardFormFooter,
  CardFormHeader,
  CardFormMessage,
  CardFormTitle,
} from '../components/CardForm';
import FancyLink from '../components/FancyLink';
import {
  Field,
  FieldInput,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from '../components/Field';
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from '../components/AppButton';
import { register, selectRegisterState } from '../slices/auth';
import { NotLoggedInGuard } from '../guard/LoginGuard';

function RegisterPageContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwordValue = watch('password');
  const { getText } = useI8n();
  const { isLoading, error } = useSelector(selectRegisterState);

  return (
    <CardForm
      onSubmit={handleSubmit((data) => dispatch(
        register({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      )
        .unwrap()
        .then(() => navigate('/login'))
        .catch(() => {}))}
    >
      <CardFormHeader>
        <CardFormTitle>{getText('registerAction')}</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          {getText('haveAccountMessage')}
          {' '}
          <FancyLink to="/login">{getText('loginAction')}</FancyLink>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>{getText('emailField')}</FieldLabel>
          <FieldInput
            type="email"
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: getText('emailCannotBlankMessage'),
              },
            }}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="name">
          <FieldLabel>{getText('nameField')}</FieldLabel>
          <FieldInput
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: getText('nameCannotBlankMessage'),
              },
            }}
          />
          <ReactHookFieldMessage error={errors.name} />
        </Field>
        <Field inputId="password">
          <FieldLabel>{getText('passwordField')}</FieldLabel>
          <FieldInput
            type="password"
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: getText('passwordCannotBlankMessage'),
              },
              minLength: {
                value: 8,
                message: getText('passwordMinimalMessage'),
              },
            }}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
        <Field inputId="passwordRetry">
          <FieldLabel>{getText('repeatPasswordField')}</FieldLabel>
          <FieldInput
            control={control}
            type="password"
            name="passwordRetry"
            rules={{
              deps: 'password',
              validate: (value) => (value === passwordValue
                ? true
                : getText('passwordMustEqualMessage')),
            }}
          />
          <ReactHookFieldMessage error={errors.passwordRetry} />
        </Field>
        <Field inputId="">
          {error && <FieldMessage error>{error}</FieldMessage>}
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton isSubmit variant="primary" disabled={isLoading}>
            {getText('registerAction')}
          </AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export default function RegisterPage() {
  return (
    <NotLoggedInGuard>
      <RegisterPageContent />
    </NotLoggedInGuard>
  );
}
