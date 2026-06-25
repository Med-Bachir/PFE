import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const DishesAttributes = ({ mode, handlNameChange, tags , setTags ,handlAtt, type }) => {
    console.log(type)
    const fieldsConfig = type === 'Plates' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Ceramic, Porcelain, Glass" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Diameter in cm or inches" },
        { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 500g, 1kg" },
        { name: 'Color', type: 'color', key: 'color', function: handlNameChange, value: tags, setValue: setTags },
        { name: 'Shape', type: 'attribute', key: 'attribute-shape', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Round, Square" },
        { name: 'Microwave-Safe', type: 'attribute', key: 'attribute-microwave', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Dishwasher-Safe', type: 'attribute', key: 'attribute-dishwasher', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Set Quantity', type: 'attribute', key: 'attribute-quantity', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Set of 6" },
      ] 
      : type === 'Bowls' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Ceramic, Glass" },
        { name: 'Capacity', type: 'attribute', key: 'attribute-capacity', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 500ml, 1L" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Diameter and Height in cm" },
        { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 300g" },
        { name: 'Color', type: 'color', key: 'color', function: handlNameChange, value: tags, setValue: setTags },
        { name: 'Shape', type: 'attribute', key: 'attribute-shape', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Round, Deep" },
        { name: 'Microwave-Safe', type: 'attribute', key: 'attribute-microwave', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Dishwasher-Safe', type: 'attribute', key: 'attribute-dishwasher', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
      ] 
      : type === 'Cups and Mugs' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Ceramic, Glass" },
        { name: 'Capacity', type: 'attribute', key: 'attribute-capacity', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 250ml, 400ml" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Height and Diameter in cm" },
        { name: 'Color', type: 'color', key: 'color', function: handlNameChange, value: tags, setValue: setTags },
        { name: 'Microwave-Safe', type: 'attribute', key: 'attribute-microwave', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Dishwasher-Safe', type: 'attribute', key: 'attribute-dishwasher', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Insulation', type: 'attribute', key: 'attribute-insulation', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Double-walled" },
      ] 
      : type === 'Utensils' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Stainless Steel, Bamboo" },
        { name: 'Type', type: 'attribute', key: 'attribute-type', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Spoon, Fork" },
        { name: 'Length/Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 20cm" },
        { name: 'Dishwasher-Safe', type: 'attribute', key: 'attribute-dishwasher', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
        { name: 'Heat Resistance', type: 'attribute', key: 'attribute-heat', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Up to 200°C" },
      ] 
      : type === 'Glassware' ? [
        { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Glass, Crystal" },
        { name: 'Capacity', type: 'attribute', key: 'attribute-capacity', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: 200ml" },
        { name: 'Dimensions', type: 'attribute', key: 'attribute-dimensions', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg: Height and Diameter" },
        { name: 'Dishwasher-Safe', type: 'attribute', key: 'attribute-dishwasher', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg: Yes or No" },
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

export default DishesAttributes;
