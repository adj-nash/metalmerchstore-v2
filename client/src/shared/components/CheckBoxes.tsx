import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";


type Props = {
    items: string[],
    checked: string[],
    onChange: (items: string[]) => void;
    
}

export default function CheckBoxes({items, checked, onChange}: Props) {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked)
  }, [checked]);

  const handleToggle = (value: string) => {
    const checkedUpdated = checkedItems?.includes(value)
    ? checkedItems.filter(item => item !== value ) : [...checkedItems, value];

    setCheckedItems(checkedUpdated);
    onChange(checkedUpdated);
  };


  return (
      <FormGroup>
    {items.map((item) => (
        <FormControlLabel
          control={<Checkbox checked={checkedItems.includes(item)} onClick={() => handleToggle(item)} sx={{ py: 0.7, fontSize: 40 }} />}
          label={item}
          key={item}
          sx={{color: "#BDBDBD"}}
        />
      ))}
  </FormGroup>
  )
}