import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const DecorsAttributes = ({ mode, handlNameChange, tags , setTags ,handlAtt, type }) => {
    console.log(type)
    const fieldsConfig = type === 'Furniture' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Wood, Metal, Fabric" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 200cm x 150cm x 100cm" },
        { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 25kg" },
        { name: 'Color', type: 'color', key: 'color' , function : handlNameChange , value : tags , setValue : setTags  },
        { name: 'Style', type: 'attribute', key: 'attribute-style', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Modern, Vintage, Rustic" },
        { name: 'Assembly Required', type: 'attribute', key: 'attribute-assembly', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Maximum Load Capacity', type: 'attribute', key: 'attribute-load', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 150kg" },
        { name: 'Room Type', type: 'attribute', key: 'attribute-room', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Bedroom, Living Room" },
      ] 
      : type === 'Home Appliances' ? [
        { name: 'Brand', type: 'attribute', key: 'attribute-brand', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Samsung, LG, Whirlpool" },
        { name: 'Model Number', type: 'attribute', key: 'attribute-model', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: XYZ1234" },
        { name: 'Power Consumption', type: 'attribute', key: 'attribute-power', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 1500W" },
        { name: 'Energy Efficiency Rating', type: 'attribute', key: 'attribute-efficiency', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: A+, A++" },
        { name: 'Capacity', type: 'attribute', key: 'attribute-capacity', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 500L (for refrigerators)" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 60cm x 85cm x 60cm" },
        { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 35kg" },
        { name: 'Warranty', type: 'attribute', key: 'attribute-warranty', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 2 years" },
        { name: 'Noise Level', type: 'attribute', key: 'attribute-noise', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 50dB" },
        { name: 'Key Features', type: 'attribute', key: 'attribute-features', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Smart functionality, Touch controls" },
      ]
      : []; // apply theme here

      

    useEffect(() => {
        
    }, [type]);
    

  return (
    <div>
      {fieldsConfig.map((field) => (
        <InputField
          key={field.key}
          mode={mode}
          type={field.type}
          name={field.name}
          tags={field.type === 'color' ? field?.value  : undefined}
          setTags={field.type === 'color' ? field?.setValue: undefined}
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

export default DecorsAttributes;
