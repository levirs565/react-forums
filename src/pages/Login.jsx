import { useForm } from "react-hook-form";
import { useI8n } from "../provider/context";
import {
  CardForm,
  CardFormContent,
  CardFormFooter,
  CardFormHeader,
  CardFormMessage,
  CardFormTitle,
} from "../components/CardForm";
import { FancyLink } from "../components/FancyLink";
import {
  Field,
  FieldInput,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from "../components/Field";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoginState } from "../slices/auth";
import { NotLoggedInGuard } from "../guard/LoginGuard";

function LoginPageContent() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { getText } = useI8n();
  const { isLoading, error } = useSelector(selectLoginState);

  return (
    <CardForm
      onSubmit={handleSubmit((data) =>
        dispatch(login({ email: data.email, password: data.password }))
      )}
    >
      <CardFormHeader>
        <CardFormTitle>{getText("loginAction")}</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          {getText("notHaveAccountMessage")}{" "}
          <FancyLink to="/register">{getText("registerAction")}</FancyLink>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>{getText("emailField")}</FieldLabel>
          <FieldInput
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: getText("emailCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="password">
          <FieldLabel>{getText("passwordField")}</FieldLabel>
          <FieldInput
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: getText("passwordCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
        <Field inputId="">
          {error && <FieldMessage error>{error}</FieldMessage>}
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton variant="primary" disabled={isLoading}>
            {getText("loginAction")}
          </AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function LoginPage() {
  return (
    <NotLoggedInGuard>
      <LoginPageContent />
    </NotLoggedInGuard>
  );
}
