import React, { useRef, useState } from 'react';

import { InputBase } from '@mui/material';

type Props = {
  text: string;
  onEdited: (newValue: string) => void;
};

const EditableTextField = ({ text, onEdited }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(text);

  const onClick = () => {
    if (inputRef) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, value.length);
      }, 25);
    }
  };

  const handleEditEnd = () => {
    if (inputRef) inputRef.current?.blur();
    if (value && value !== text) onEdited(value);
  };

  const handleEditCancel = () => {
    if (inputRef) inputRef.current?.blur();
    setValue(text);
  };

  const handleKeyPressed = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      handleEditEnd();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      handleEditCancel();
    }
  };

  return (
    <InputBase
      inputRef={inputRef}
      value={value}
      onClick={onClick}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onBlur={handleEditEnd}
      onKeyDown={handleKeyPressed}
    />
  );
};

export default EditableTextField;
