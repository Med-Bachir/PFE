import { Input, Tag, Tooltip } from 'antd';
import React from 'react'

const ColorTags = () => {

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
        background: token.colorBgContainer,
        borderStyle: "dashed",
      };
  return (
    <InputContainer theme={mode}>
                  <label>Color</label>
                  <div
                    style={{ display: "flex", gap: "4px 0", flexWrap: "wrap" }}
                  >
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
                </InputContainer>
  )
}

export default ColorTags
