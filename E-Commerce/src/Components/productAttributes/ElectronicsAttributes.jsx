import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const ElectronicsAttributes = ({ mode, handlNameChange, handlAtt, type }) => {
    const fieldsConfig = type === 'Computer' ? [
        { name: 'Processor', type: 'attribute', key: 'attribute-processor', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Intel i7, AMD Ryzen 7" },
        { name: 'RAM', type: 'attribute', key: 'attribute-ram', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 16GB DDR4, 32GB DDR5" },
        { name: 'Storage', type: 'attribute', key: 'attribute-storage', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 512GB SSD, 1TB HDD" },
        { name: 'Graphics Card', type: 'attribute', key: 'attribute-graphics-card', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : NVIDIA RTX 4060, AMD Radeon RX 6700" },
        { name: 'Screen Size', type: 'attribute', key: 'attribute-screen-size', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 15.6 inch, 27 inch" },
        { name: 'Weight', type: 'attribute', key: 'attribute-weight', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 1.8kg, 2.2kg" },
        { name: 'Ports', type: 'attribute', key: 'attribute-ports', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : USB-C, HDMI, Ethernet" },
      ] 
      : type === 'Tablets' ? [
        { name: 'Brand', type: 'attribute', key: 'attribute-brand', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Apple, Samsung, Lenovo" },
        { name: 'Screen Size', type: 'attribute', key: 'attribute-screen-size', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 10.5 inch, 12.9 inch" },
        { name: 'Operating System', type: 'attribute', key: 'attribute-os', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Android 14, iPadOS 17" },
        { name: 'Battery', type: 'attribute', key: 'attribute-battery', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 8000mAh, 10000mAh" },
        { name: 'Camera', type: 'attribute', key: 'attribute-camera', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 12MP Front, 10MP Rear" },
        { name: 'Storage', type: 'attribute', key: 'attribute-storage', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 128GB, 256GB" },
        { name: 'Stylus Support', type: 'attribute', key: 'attribute-stylus', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg : Yes or No" },
      ] 
      : type === 'Mobiles' ? [
        { name: 'Brand', type: 'attribute', key: 'attribute-brand', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Apple, Samsung, OnePlus" },
        { name: 'Screen Size', type: 'attribute', key: 'attribute-screen-size', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 6.1 inch, 6.8 inch" },
        { name: 'Operating System', type: 'attribute', key: 'attribute-os', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : Android 14, iOS 17" },
        { name: 'Processor', type: 'attribute', key: 'attribute-processor', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : A17 Bionic, Snapdragon 8 Gen 2" },
        { name: 'Battery', type: 'attribute', key: 'attribute-battery', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 4500mAh, 5000mAh" },
        { name: 'Camera', type: 'attribute', key: 'attribute-camera', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 50MP Rear, 12MP Front" },
        { name: 'Storage', type: 'attribute', key: 'attribute-storage', function: handlNameChange, attributes: handlAtt, attrType: "text", inputExample: "Eg : 128GB, 256GB" },
        { name: '5G Support', type: 'attribute', key: 'attribute-5g', function: handlNameChange, attributes: handlAtt, attrType: "boolean", inputExample: "Eg : Yes or No" },
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
          handleAtt={field.type === 'attribute' ? field.attributes : undefined}
          attrType={field.attrType}
          inputExample={field.inputExample}
        />
      ))}
    </div>
  );
};

export default ElectronicsAttributes;
