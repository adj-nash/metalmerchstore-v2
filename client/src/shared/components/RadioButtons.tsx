import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent } from "react";


type Props = {
    options: {value: string, label: string}[],
    selectedValue: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export default function RadioButtons({options, selectedValue, onChange}: Props) {
  return (
    <FormControl>
        <RadioGroup value={selectedValue} onChange={onChange} sx={{color: "#BDBDBD"}}>
    {options.map(({ value, label }) => (
      <FormControlLabel
        key={label}
        value={value}
        control={<Radio sx={{ py: 0.7 }} />}
        label={label}
      />
    ))}
    </RadioGroup>
  </FormControl>
  )
}