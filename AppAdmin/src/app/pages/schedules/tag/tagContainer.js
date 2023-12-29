import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import style from '../tag/style.module.scss'

const EditableTagGroup = ({ initialDates, changesDate }) => {
  const [tags, setTags] = useState(initialDates || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');

  const handleClose = removedTag => {
    const updatedTags = tags.filter(tag => tag !== removedTag);
    setTags(updatedTags); // Esto actualiza el estado local de las etiquetas
    changesDate(updatedTags); // Luego, envía la lista actualizada a la función padre
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      setInputVisible(false);
      setInputValue('');
      changesDate(updatedTags);
    }
  };

  const handleEditInputChange = e => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const updatedTags = [...tags];
    updatedTags[editInputIndex] = editInputValue;
    setTags(updatedTags);
    setEditInputIndex(-1);
    setEditInputValue('');
    changesDate(updatedTags);
  };

  useEffect(() => {
        setTags(initialDates || []);
}, [initialDates]);

  const saveInputRef = input => {
    input && input.focus();
  };

  const saveEditInputRef = input => {
    input && input.focus();
  };

  return (
    <>
      {tags.map((tag, index) => (
        <span key={tag}>
          <Tag
            color="green"
            closable={true}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={() => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                }
              }}
            >
              {tag}
            </span>
          </Tag>
        </span>
      ))}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="YYYY/MM/DD"
        />
      )}
      {!inputVisible && (
        <Tag color="#87d068" onClick={showInput}>
          <PlusOutlined /> Add Date
        </Tag>
      )}
      {editInputIndex !== -1 && (
        <Input
          ref={saveEditInputRef}
          key={tags[editInputIndex]}
          size="small"
          className="tag-input"
          value={editInputValue}
          onChange={handleEditInputChange}
          onBlur={handleEditInputConfirm}
          onPressEnter={handleEditInputConfirm}
          placeholder="YYYY/MM/DD"
        />
      )}
    </>
  );
};

export default EditableTagGroup;
