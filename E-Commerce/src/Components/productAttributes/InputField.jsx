import React, { useEffect, useRef, useState } from "react";
import { InputContainer, InputText } from "./StyledComponents";
import {
  colorAccentDarkTransparent,
  colorAccentMain,
  colorAccentMediumTransparent,
  colorAccentMoreTransparent,
  colorAccentSoftTransparent,
  colorAccentTransparent,
  darkRed,
  elementGrayBackground,
  lightMain,
  main,
  primaryTextColor,
  whiteTextColor,
} from "../../Colors";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Checkbox, Divider, Input, Tag, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme == "light" ? lightMain : colorAccentMediumTransparent};
    border: none;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme == "light" ? main : colorAccentMain};
  }
  &:where(.css-dev-only-do-not-override-1wwf28x).ant-checkbox-wrapper {
    color: ${({ theme }) =>
      theme == "light"
        ? primaryTextColor
        : elementGrayBackground}; /* Text color */
  }
  :where(.css-dev-only-do-not-override-1wwf28x).ant-checkbox-indeterminate
    .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme == "light" ? lightMain : colorAccentMediumTransparent} !important;
    border: none !important;
  }
  :where(.css-dev-only-do-not-override-1wwf28x).ant-checkbox-indeterminate
    .ant-checkbox-inner:after {
    background-color: ${({ theme }) =>
      theme == "light" ? main : colorAccentMain} !important;
  }
`;

const CustomCheckboxGroup = styled(Checkbox.Group)`
  .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme == "light" ? lightMain : colorAccentMediumTransparent};
    border: none;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme == "light" ? main : colorAccentMain};
  }
  .ant-checkbox-wrapper {
    color: ${({ theme }) =>
      theme == "light"
        ? primaryTextColor
        : elementGrayBackground}; /* Text color */
  }
`;
const InputField = ({
  mode,
  name,
  inputName,
  handlNameChange,
  type,
  style,
  selectLabel,
  selectValue,
  handleChangeField,
  itemList,
  selectType,
  tags,
  setTags,
  sizeValue,
  setCheckedList,
  handleAtt,
  attrType,
  inputExample
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const tagPlusStyle = {
    height: 22,

    borderStyle: "dashed",
    backgroundColor: mode == "light" ? whiteTextColor : lightMain,
    color: mode == "light" ? primaryTextColor : elementGrayBackground,
  };

  const plainOptions =
  ["XS", "S", "M", "L", "XL"];

  const checkAll = plainOptions.length === sizeValue?.length;
  const indeterminate =
    sizeValue?.length > 0 && sizeValue?.length < plainOptions.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : "");
  };

  return (
    <InputContainer theme={mode}>
      <label>
        {name} <span style={{ color: darkRed }}>*</span>
      </label>
      {type === "text" ? (
        <InputText
          name={inputName}
          theme={mode}
          onChange={(e) => handlNameChange(e)}
        />
      ) : type === "attribute" ? (
        <InputText
          name={inputName}
          type={attrType}
          theme={mode}
          onChange={(e) => {
            handlNameChange(e), handleAtt(e);
          }}
          placeholder={inputExample}
        />
      ) : type === "select" ? (
        <FormControl sx={style}>
          <InputLabel id="demo-simple-select-helper-label">
            {selectLabel}
          </InputLabel>
          <Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  value={selectValue || ''} // Use empty string as fallback
  label={selectLabel}
  sx={{
    color: mode === "light" ? primaryTextColor : elementGrayBackground,
  }}
  onChange={(e) => handleChangeField(e, `${selectType}`)}
>
  <MenuItem value="">None</MenuItem> {/* Default option */}
  {itemList?.map((item) => (
    <MenuItem key={item?.id} value={item?.id}>
      {item.name}
    </MenuItem>
  ))}
</Select>
          <FormHelperText
            sx={{
              color: mode == "light" ? primaryTextColor : elementGrayBackground,
            }}
          >
            Please Select Your Product Category
          </FormHelperText>
        </FormControl>
      ) : type === "color" ? (
        <div style={{ display: "flex", gap: "4px 0", flexWrap: "wrap" }}>
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={{
                    width: 64,
                    height: 22,
                    marginInlineEnd: 8,
                    verticalAlign: "top",
                  }}
                  value={editInputValue}
                  onChange={(e) => {
                    handleEditInputChange(e);
                    handleInputChange(e);
                    handlNameChange(e);
                  }}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={(e) => handleEditInputConfirm(e)}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                color={tag}
                key={tag}
                closable={index !== 0}
                style={{ userSelect: "none" }}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              name="color"
              style={{
                width: 64,
                height: 22,
                marginInlineEnd: 8,
                verticalAlign: "top",
                backgroundColor: mode == "light" ? whiteTextColor : lightMain,
              }}
              value={inputValue}
              onChange={(e) => {
                handleInputChange(e);
                handlNameChange(e);
              }}
              onBlur={handleInputConfirm}
              onPressEnter={(e) => {
                handleInputConfirm(e);
                handlNameChange(e);
              }}
            />
          ) : (
            <Tag
              style={tagPlusStyle}
              icon={<PlusOutlined />}
              onClick={showInput}
            >
              New Color
            </Tag>
          )}
        </div>
      ) : type === "size" ? (
        <div>
          <CustomCheckbox
            name="size"
            theme={mode}
            indeterminate={indeterminate}
            onClick={(e) => {
              handlNameChange(e);
              onCheckAllChange(e);
            }}
            
            checked={checkAll}
          >
            Check all
          </CustomCheckbox>
          <Divider />
          <CustomCheckboxGroup
            name="size"
            options={plainOptions}
            value={sizeValue}
            theme={mode}
            onClick={(e) => {
              handlNameChange(e);
            }}
            onChange={onChange}
          />
        </div>
      ) : (
        ""
      )}
    </InputContainer>
  );
};

export default InputField;
