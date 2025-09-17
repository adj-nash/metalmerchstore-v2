import { zodResolver } from "@hookform/resolvers/zod"
import { type FieldValues, useForm } from "react-hook-form"
import { createProductSchema, type CreateProductSchema } from "../../lib/schemas/createProductSchema"
import { Box, Button, Grid2, Paper, Typography } from "@mui/material"
import TextInput from "../../shared/components/TextInput"
import DropZone from "../../shared/components/DropZone"
import { type Product } from "../../app/models/product"
import { useEffect } from "react"
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi"
import { handleApiError } from "../../lib/util"

type Props = {
    setEdit: (value: boolean) => void;
    product: Product | null;
    refetch: () => void;

}

export default function ProductForm({setEdit, product, refetch}: Props) {

    const {control, handleSubmit, watch, reset, setError} = useForm<CreateProductSchema>({
        mode: "onTouched",
        resolver: zodResolver(createProductSchema)
    })
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const watchFile = watch("file");

    useEffect(() => {
        if(product) reset(product);

        return () => {
            if(watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [product, reset, watchFile]);

    const createFormData = (items: FieldValues) => {
        const formData = new FormData();
        for(const item in items) {
            formData.append(item, items[item])
        }

        return formData;
    };

    const onSubmit = async (data: CreateProductSchema) => {
        try {
            const formData = createFormData(data);

            if(watchFile) formData.append("file", watchFile);

            if (product) await updateProduct({id: product.id, data: formData}).unwrap();
            else await createProduct(formData).unwrap();
            setEdit(false);
            refetch();
        } catch (error) {
            console.log(error);
            handleApiError<CreateProductSchema>(error, setError, ["band", "file", "category", "description","name", "imageUrl", "price", "stock", "genre"])
        }
    }

  return (
    <Box component={Paper} sx={{p: 4, maxWidth: "sm",mx: "auto"}}>
         <Typography variant="h4" sx={{pb: 4}}>New Product</Typography>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={3}>
                <Grid2 size={12}>
                    <TextInput font-family="Roboto" control={control} name="name" label="Name"/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="description" label="Description"  multiline rows={4}/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="price" label="Price"/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="category" label="Category"/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="band" label="Band"/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="genre" label="Genre"/>
                </Grid2>
                <Grid2 size={12}>
                    <TextInput control={control} name="stock" label="Quantity In Stock"/>
                </Grid2>
                <Grid2 size={12}>
                    <DropZone name="file" control={control} />
                    {watchFile?.preview ? (

                            <img src={watchFile.preview} alt="preview of image" style={{objectFit: "contain", maxHeight: 200}}/>
                        ) : product?.imageUrl ? (
                            <img src={product?.imageUrl} alt="preview of image" style={{objectFit: "contain", maxHeight: 200}}/>
                        ) : null}
                </Grid2>
            </Grid2>
            <Box display="flex" justifyContent="space-between" sx={{pt: 4}}>
                <Button size="large" onClick={() => setEdit(false)} >Cancel</Button>
                <Button size="large" type="submit">Submit</Button>
            </Box>
         </form>
    </Box>
  )
}