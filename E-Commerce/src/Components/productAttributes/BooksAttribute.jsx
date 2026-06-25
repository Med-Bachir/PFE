import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const BooksAttribute = ({mode , handlNameChange ,tags , sizeValue , handlAtt }) => {
    const fieldsConfig = [
        { 
          name: 'Title', 
          type: 'attribute', 
          key: 'attribute', 
          function: handlNameChange, 
          attributes: handlAtt, 
          attrType: "text", 
          inputExample: "Eg: The Great Gatsby" 
        },
        { 
          name: 'Author', 
          type: 'attribute', 
          key: 'attribute', 
          function: handlNameChange, 
          attributes: handlAtt, 
          attrType: "text", 
          inputExample: "Eg: F. Scott Fitzgerald" 
        },
        { 
          name: 'Publication Date', 
          type: 'attribute', 
          key: 'attribute', 
          function: handlNameChange, 
          attributes: handlAtt, 
          attrType: "date", 
          inputExample: "Eg: 10-04-1925" 
        },
        { 
          name: 'ISBN', 
          type: 'attribute', 
          key: 'attribute', 
          function: handlNameChange, 
          attributes: handlAtt, 
          attrType: "text", 
          inputExample: "Eg: 978-3-16-148410-0" 
        },
        { 
          name: 'Number of Pages', 
          type: 'attribute', 
          key: 'attribute', 
          function: handlNameChange, 
          attributes: handlAtt, 
          attrType: "number", 
          inputExample: "Eg: 180" 
        }
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

export default BooksAttribute;
