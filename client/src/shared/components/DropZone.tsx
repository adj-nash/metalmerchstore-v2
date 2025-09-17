import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import {useDropzone} from "react-dropzone";
import { useCallback } from "react";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { Upload } from "@mui/icons-material";


type Props<T extends FieldValues> = {
    name: keyof T
} & UseControllerProps<T>;

export default function DropZone<T extends FieldValues>(props: Props<T>) {
   
const {fieldState, field} = useController({...props});

const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length > 0) {
     const filePreview = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
     });

     field.onChange(filePreview);

    }
}, [field]);

const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

const styling = {
    display: "flex",
    border: "solid 1px",
    borderColor: "white",
    borderRadius: "5px",
    height: 100,
    width: "auto",
    color: "silver",
    alignItems: "center"
};

const activeStyling = {
    borderColor: "green"
};

  return (
    <div {...getRootProps()}>
        <FormControl style={isDragActive ? {...styling, ...activeStyling} : styling} error={!!fieldState.error}>
            <input {...getInputProps()}/>
            <Typography sx={{mt: 1.5}}>File Upload</Typography>
            <Upload sx={{fontSize: "50px"}}/>
            <FormHelperText>{fieldState.error?.message}</FormHelperText> 
        </FormControl>
    </div>
  )
}