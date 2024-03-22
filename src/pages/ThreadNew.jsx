import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldInput,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from "../components/Field";
import { ContentEditableInput } from "../components/ContentEditable";
import {
  CardForm,
  CardFormContent,
  CardFormFooter,
  CardFormHeader,
  CardFormTitle,
} from "../components/CardForm";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { newThread, selectNewThreadState } from "../slices/threadDetail";
import { useNavigate } from "react-router-dom";

export function ThreadNewPage() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm();
  const { loading, error } = useSelector(selectNewThreadState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="app-main app-main--content">
      <CardForm
        onSubmit={handleSubmit((data) =>
          dispatch(newThread(data))
            .unwrap()
            .then((thread) => {
              navigate(`/thread/${thread.id}`);
            })
            .catch(() => {})
        )}
        isFluid
      >
        <CardFormHeader>
          <CardFormTitle>Buat Thread Baru</CardFormTitle>
        </CardFormHeader>
        <CardFormContent>
          <Field inputId="title">
            <FieldLabel>Judul</FieldLabel>
            <FieldInput
              {...register("title", {
                required: {
                  value: true,
                  message: "Judul tidak boleh kosong",
                },
              })}
            />
            <ReactHookFieldMessage error={errors.title} />
          </Field>
          <Field inputId="category">
            <FieldLabel>Kategori</FieldLabel>
            <FieldInput {...register("category")} />
          </Field>
          <Field inputId="body">
            <FieldLabel onClick={() => setFocus("body")}>Isi</FieldLabel>
            <Controller
              control={control}
              name="body"
              rules={{
                required: {
                  value: true,
                  message: "Isi tidak boleh kosong",
                },
              }}
              render={({ field }) => (
                <ContentEditableInput
                  value={field.value ?? ""}
                  onValueChanged={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                  ref={field.ref}
                  placeholder=""
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
              Buat
            </AppButton>
          </AppButtonGroup>
        </CardFormFooter>
      </CardForm>
    </div>
  );
}
