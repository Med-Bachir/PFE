import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const ClothsAttributes = ({mode , handlNameChange ,tags , setTags , sizeValue , setCheckedList , handlAtt , type }) => {
  const fieldsConfig = [
    { name: 'Color', type: 'color', key: 'color' , function : handlNameChange , value : tags , setValue : setTags  },
    { name: 'Size', type: type == "Shoes" ? 'attribute' : 'size', key: 'size' ,function : handlNameChange , value : sizeValue , setValue : setCheckedList , inputExample : "Eg : 39 , 40 , etc" },
    { name: 'Material', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"text" , inputExample : "Cotton , ...." },
  ];


  useEffect(() => {
handlNameChange
  } , [tags , sizeValue])
  return (
    <div>
    
      {fieldsConfig.map((field) => (
        <InputField
          key={field.key}
          mode={mode}
          type={field.type}
          name={field.name}
          inputName={field.name}
          handlNameChange={field.function}
          tags={field.type === 'color' ? field.value  : undefined}
          setTags={field.type === 'color' ? field.setValue: undefined}
          sizeValue={field.type === 'size' ? field.value : undefined}
          setCheckedList={field.type === 'size' ? field.setValue : undefined}
          handleAtt={field.type === 'attribute' ? field.attributes : undefined}
          attrType={field.attrType}
          inputExample={field.inputExample}

        />
      ))}
    </div>
  );
};

export default ClothsAttributes;
