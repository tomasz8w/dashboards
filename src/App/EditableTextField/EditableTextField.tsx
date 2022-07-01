import React, { useRef, useState } from 'react';

import { InputBase, InputProps } from '@mui/material';

type Props = InputProps & {
  text: string;
  maxLength?: number;
  allowEmptyString?: boolean;
  onEdited: (newValue: string) => void;
};

const EditableTextField = ({
  text,
  multiline = false,
  autoFocus = true,
  allowEmptyString = false,
  maxLength,
  onEdited,
  sx,
  ...other
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(text);

  const onClick = () => {
    if (inputRef && !multiline) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, value.length);
      }, 25);
    }
  };

  const handleEditEnd = () => {
    if (inputRef) inputRef.current?.blur();
    if (allowEmptyString) {
      onEdited(value);
      return;
    }
    if (value && value !== text) onEdited(value);
  };

  const handleEditCancel = () => {
    if (inputRef) inputRef.current?.blur();
    setValue(text);
  };

  const handleKeyPressed = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!multiline && event.key === 'Enter') {
      handleEditEnd();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      handleEditCancel();
    }
  };

  return (
    <InputBase
      inputProps={{
        maxLength: maxLength ?? 'unset',
      }}
      autoFocus={autoFocus}
      inputRef={inputRef}
      value={value}
      onClick={onClick}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onBlur={handleEditEnd}
      onKeyDown={handleKeyPressed}
      multiline
      spellCheck={false}
      sx={{ borderRadius: '4px', ...sx }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
};

export default EditableTextField;
