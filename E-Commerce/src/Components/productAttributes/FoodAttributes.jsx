import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const FoodAttributes = ({mode , handlNameChange ,tags , sizeValue , handlAtt }) => {
  const fieldsConfig = [

    { name: 'Calories (100g)', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"number" , inputExample : "Eg : 24g" },
    { name: 'Protein (100g)', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"number" , inputExample : "Eg : 24g" },
    { name: 'Carbohydrates (100g)', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"number" , inputExample : "Eg : 24g" },
    { name: 'Sugar (100g)', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"number" , inputExample : "Eg : 24g" },
    { name: 'Expiration Date', type: 'attribute', key: 'attribute' ,function : handlNameChange , attributes : handlAtt , attrType:"date" , inputExample : "04-12-2025" },

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
          handleAtt={field.type === 'attribute' ? field.attributes : undefined}
          attrType={field.attrType}
          inputExample={field.inputExample}

        />
      ))}
    </div>
  );
};

export default FoodAttributes;
