import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const CleaningTools = ({ mode, handlNameChange, tags , setTags ,handlAtt, type }) => {
    console.log(type)
    const fieldsConfig = type === 'Hand Tools' ? [
      { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Plastic, Metal, Wood" },
      { name: 'Type', type: 'attribute', key: 'attribute-type', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Brooms, Brushes, Sponges" },
      { name: 'Handle Length', type: 'attribute', key: 'attribute-handle', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 30cm, 1.5m" },
      { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 500g, 1kg" },
      { name: 'Color', type: 'color', key: 'color', function: handlNameChange, value: tags, setValue: setTags },
      { name: 'Use Case', type: 'attribute', key: 'attribute-use', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Indoor, Outdoor" },
    ]
    : type === 'Electronic Tools' ? [
      { name: 'Brand', type: 'attribute', key: 'attribute-brand', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Dyson, iRobot" },
      { name: 'Power', type: 'attribute', key: 'attribute-power', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 1200W" },
      { name: 'Voltage', type: 'attribute', key: 'attribute-voltage', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 220V" },
      { name: 'Cord Length', type: 'attribute', key: 'attribute-cord', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 2m" },
      { name: 'Battery Life', type: 'attribute', key: 'attribute-battery', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 60 minutes" },
      { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 5kg" },
      { name: 'Noise Level', type: 'attribute', key: 'attribute-noise', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 65dB" },
    ]
    : type === 'Chemical Tools' ? [
      { name: 'Type', type: 'attribute', key: 'attribute-type', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Detergents, Disinfectants" },
      { name: 'Volume', type: 'attribute', key: 'attribute-volume', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 1L, 5L" },
      { name: 'Active Ingredients', type: 'attribute', key: 'attribute-ingredients', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Sodium Hypochlorite, Alcohol" },
      { name: 'Application', type: 'attribute', key: 'attribute-application', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Glass Cleaning, Floor Cleaning" },
      { name: 'Scent', type: 'attribute', key: 'attribute-scent', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Lemon, Lavender" },
      { name: 'Safety Warnings', type: 'attribute', key: 'attribute-warnings', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Keep away from children" },
    ]
    : [];


      

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

export default CleaningTools;
