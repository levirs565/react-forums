import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import './ContentEditable.css';
import { AppInput, AppInputContainer } from './AppInput';

export const ContentEditable = forwardRef((
  {
    as, className, value, onValueChanged, editable, placeholder,
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
      contentEditable={editable}
      placeholder={placeholder}
    />
  );
});

ContentEditable.propTypes = {
  as: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
};

ContentEditable.defaultProps = {
  className: '',
  editable: false,
  placeholder: null,
};

export const ContentEditableInput = forwardRef((
  {
    value, onValueChanged, placeholder, editable,
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
          value={value}
          onValueChanged={onValueChanged}
          placeholder={placeholder}
          ref={editableRef}
          editable={editable}
        />
      </AppInput>
    </AppInputContainer>
  );
});

ContentEditableInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
};

ContentEditableInput.defaultProps = {
  placeholder: null,
  editable: false,
};
