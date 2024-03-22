import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import "./ContentEditable.css";
import { AppInput, AppInputContainer } from "./AppInput";

export const ContentEditable = forwardRef(function ContentEditable(
  { as, className, value, onValueChanged, ...props },
  ref
) {
  const As = as;

  return (
    <As
      className={["content-editable", className].join(" ")}
      dangerouslySetInnerHTML={{ __html: value }}
      onBlur={(e) => onValueChanged(e.target.innerHTML)}
      ref={ref}
      {...props}
    />
  );
});

ContentEditable.propTypes = {
  as: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

export const ContentEditableInput = forwardRef(function ContentEditableInput(
  { value, onValueChanged, placeholder, id },
  ref
) {
  const editableRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      focus() {
        if (!editableRef.current) return;
        editableRef.current.focus();
      },
    };
  });

  return (
    <AppInputContainer
      onClick={() => {
        if (!editableRef.current) return;
        if (editableRef.current != document.activeElement)
          editableRef.current.focus();
      }}
      className="content-editable-input"
    >
      <AppInput as="div">
        <ContentEditable
          id={id}
          as="div"
          contentEditable
          value={value}
          onValueChanged={onValueChanged}
          placeholder={placeholder}
          ref={editableRef}
        />
      </AppInput>
    </AppInputContainer>
  );
});

ContentEditableInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
};
