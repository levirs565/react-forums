import { useNavigate } from "react-router-dom";
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
import { register, selectRegisterState } from "../slices/auth";
import { NotLoggedInGuard } from "../guard/LoginGuard";

function RegisterPageContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: registerInput,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwordValue = watch("password");
  const { getText } = useI8n();
  const { isLoading, error } = useSelector(selectRegisterState);

  return (
    <CardForm
      onSubmit={handleSubmit((data) =>
        dispatch(
          register({
            name: data.name,
            email: data.email,
            password: data.password,
          })
        )
          .unwrap()
          .then(() => navigate("/login"))
          .catch(() => {})
      )}
    >
      <CardFormHeader>
        <CardFormTitle>{getText("registerAction")}</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          {getText("haveAccountMessage")}{" "}
          <FancyLink to="/login">{getText("loginAction")}</FancyLink>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>{getText("emailField")}</FieldLabel>
          <FieldInput
            type="email"
            {...registerInput("email", {
              required: {
                value: true,
                message: getText("emailCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="name">
          <FieldLabel>{getText("nameField")}</FieldLabel>
          <FieldInput
            {...registerInput("name", {
              required: {
                value: true,
                message: getText("nameCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.name} />
        </Field>
        <Field inputId="password">
          <FieldLabel>{getText("passwordField")}</FieldLabel>
          <FieldInput
            type="password"
            {...registerInput("password", {
              required: {
                value: true,
                message: getText("passwordCannotBlankMessage"),
              },
              minLength: {
                value: 8,
                message: getText("passwordMinimalMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
        <Field inputId="passwordRetry">
          <FieldLabel>{getText("repeatPasswordField")}</FieldLabel>
          <FieldInput
            type="password"
            {...registerInput("passwordRetry", {
              deps: "password",
              validate: (value) =>
                value === passwordValue
                  ? true
                  : getText("passwordMustEqualMessage"),
            })}
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
          <AppButton variant="primary" disabled={isLoading}>
            {getText("registerAction")}
          </AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function RegisterPage() {
  return (
    <NotLoggedInGuard>
      <RegisterPageContent />
    </NotLoggedInGuard>
  );
}
