import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import './ContentEditable.css';
import { AppInput, AppInputContainer } from './AppInput';

export const ContentEditable = forwardRef((
  {
    as, className, value, onValueChanged, disabled, placeholder,
  },
  ref,
) => {
  const As = as;

  return (
    <As
      className={['content-editable', className].join(' ')}
      dangerouslySetInnerHTML={{ __html: value }}
      onBlur={(e) => onValueChanged(e.target.innerHTML)}
      ref={ref}
      contentEditable={!disabled}
      placeholder={placeholder}
    />
  );
});

ContentEditable.propTypes = {
  as: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

ContentEditable.defaultProps = {
  className: '',
  disabled: false,
  placeholder: null,
};

export const ContentEditableInput = forwardRef((
  {
    value, onValueChanged, placeholder,
  },
  ref,
) => {
  const editableRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      if (!editableRef.current) return;
      editableRef.current.focus();
    },
  }));

  return (
    <AppInputContainer
      onClick={() => {
        if (!editableRef.current) return;
        if (editableRef.current !== document.activeElement) editableRef.current.focus();
      }}
      className="content-editable-input"
    >
      <AppInput as="div">
        <ContentEditable
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
  placeholder: PropTypes.string,
};

ContentEditableInput.defaultProps = {
  placeholder: null,
};
