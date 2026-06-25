import React from 'react'

const AddForm = ({ catname, subname, theme, handleChange }) => {
    return (
        <div>
          {catname && (
            <AttributeRenderer
              catname={catname}
              subname={subname}
              theme={theme}
              handleChange={handleChange}
            />
          )}
        </div>
      );
}

export default AddForm
