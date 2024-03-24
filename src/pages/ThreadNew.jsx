import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  Field,
  FieldInput,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from '../components/Field';
import { ContentEditableInput } from '../components/ContentEditable';
import {
  CardForm,
  CardFormContent,
  CardFormFooter,
  CardFormHeader,
  CardFormTitle,
} from '../components/CardForm';
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from '../components/AppButton';
import { LoggedInGuard } from '../guard/LoginGuard';
import { useI8n } from '../provider/context';
import {
  submitNewThread,
  cleanNewThreadState,
  selectNewThreadState,
} from '../slices/newThread';

function ThreadNewPageContent() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm();
  const { loading, error, newId } = useSelector(selectNewThreadState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getText } = useI8n();

  useEffect(() => {
    if (newId) {
      dispatch(cleanNewThreadState());
      navigate(`/thread/${newId}`);
    }
  }, [newId, dispatch, navigate]);

  return (
    <div className="app-main app-main--content">
      <CardForm
        onSubmit={handleSubmit((data) => dispatch(submitNewThread(data)))}
        isFluid
      >
        <CardFormHeader>
          <CardFormTitle>{getText('newThreadAction')}</CardFormTitle>
        </CardFormHeader>
        <CardFormContent>
          <Field inputId="title">
            <FieldLabel>{getText('threadTitleField')}</FieldLabel>
            <FieldInput
              control={control}
              name="title"
              rules={{
                required: {
                  value: true,
                  message: getText('threadTitleCannotBlankMessage'),
                },
              }}
            />
            <ReactHookFieldMessage error={errors.title} />
          </Field>
          <Field inputId="category">
            <FieldLabel>{getText('category')}</FieldLabel>
            <FieldInput control={control} name="category" />
          </Field>
          <Field inputId="body">
            <FieldLabel onClick={() => setFocus('body')}>
              {getText('threadContentField')}
            </FieldLabel>
            <Controller
              control={control}
              name="body"
              rules={{
                required: {
                  value: true,
                  message: getText('threadContentCannotBlankMessage'),
                },
              }}
              render={({ field }) => (
                <ContentEditableInput
                  value={field.value ?? ''}
                  onValueChanged={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                  ref={field.ref}
                />
              )}
            />
            <ReactHookFieldMessage error={errors.body} />
          </Field>
          <Field inputId="">
            {error && <FieldMessage error>{error}</FieldMessage>}
          </Field>
        </CardFormContent>
        <CardFormFooter>
          <AppButtonGroup>
            <AppButtonGroupSpacer />
            <AppButton variant="primary" disabled={loading}>
              {getText('createAction')}
            </AppButton>
          </AppButtonGroup>
        </CardFormFooter>
      </CardForm>
    </div>
  );
}

export default function ThreadNewPage() {
  return (
    <LoggedInGuard>
      <ThreadNewPageContent />
    </LoggedInGuard>
  );
}
