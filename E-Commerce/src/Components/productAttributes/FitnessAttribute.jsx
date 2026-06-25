import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const FitnessAttribute = ({ mode, handlNameChange, sizeValue, setCheckedList, handlAtt, type }) => {
  const fieldsConfig = type === 'Tools' ? [
      { name: 'Material', type: 'attribute', key: 'attribute-material', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Steel , ...." },
      { name: 'Mark', type: 'attribute', key: 'attribute-mark', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Rogue Fitness, Life Fitness, Technogym , ...." },
      { name: 'Weight', type: 'size', key: 'size-weight', function: handlNameChange, value: sizeValue, setValue: setCheckedList },
      { name: 'Dimension', type: 'attribute', key: 'attribute-dimension', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 20cm x 10cm" },
    ]
    : type === 'Proteines' ? [
      { name: 'Brand', type: 'attribute', key: 'attribute-brand', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Optimum Nutrition, BSN, MuscleTech, etc.." },
      { name: 'Protein (100g)', type: 'attribute', key: 'attribute-protein', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 24g, 30g, etc" },
      { name: 'Size', type: 'size', key: 'size-size', function: handlNameChange, value: sizeValue, setValue: setCheckedList },
      { name: 'Calories (kcal)', type: 'attribute', key: 'attribute-calories', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 120 kcal, 600 kcal" },
      { name: 'Carbs (100g)', type: 'attribute', key: 'attribute-carbs', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 5g (for whey), 80g (for mass gainer)" },
      { name: 'Fat (g)', type: 'attribute', key: 'attribute-fat', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 1g (for whey), 10g (for mass gainer)" },
    ]
    : type === 'Energy Drinks' ? [
      { name: 'Caffeine', type: 'attribute', key: 'attribute-caffeine', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 80mg, 150mg, 300mg, etc." },
      { name: 'Calories (kcal)', type: 'attribute', key: 'attribute-calories', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 100 kcal, 200 kcal." },
      { name: 'Sugar', type: 'attribute', key: 'attribute-sugar', function: handlNameChange, attributes: handlAtt, attrType: "number", inputExample: "Eg : 20g, 0g (sugar-free)." },
      { name: 'Electrolytes', type: 'attribute', key: 'attribute-electrolytes', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Sodium, Potassium" },
      { name: 'Key Ingredients', type: 'attribute', key: 'attribute-key-ingredients', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Taurine, B-Vitamins, Guarana" },
      { name: 'Flavor', type: 'attribute', key: 'attribute-flavor', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Original, Sugar-Free, Tropical" },
      { name: 'Carbonated', type: 'attribute', key: 'attribute-carbonated', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg : Yes or No" },
      { name: 'Suggested Usage', type: 'attribute', key: 'attribute-suggested-usage', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Consume 1 can per day" },
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
          inputName={field.name}
          handlNameChange={field.function}
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

export default FitnessAttribute;
