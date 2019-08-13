import React from 'react';
import Select from 'react-select';

const colourOptions = [
    { value: 'orange' , label: 'Orange' },
    { value: 'yellow' , label: 'Yellow' },
    { value: 'green'  , label: 'Green'  },
    { value: 'forest' , label: 'Forest' },
    { value: 'slate'  , label: 'Slate'  },
    { value: 'silver' , label: 'Silver' },
  ];


export default (props) => (
    <div id='InputTExtDash'>
  <Select 
  onChange={props.onChange}
    defaultValue={colourOptions[0]}
    options={colourOptions}
    // formatGroupLabel={formatGroupLabel}
  />
  </div>
);
