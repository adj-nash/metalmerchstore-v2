import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store/Store"
import { useFetchAllProductsQuery} from "../merchandise/merchandiseAPI";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import currencyFormat from "../../lib/util";
import { Edit, Delete } from "@mui/icons-material";
import AppPagination from "../../shared/components/AppPagination";
import { setPageNumber } from "../merchandise/merchandiseSlice";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { Product } from "../../app/models/product";
import { useDeleteProductMutation } from "./adminApi";

export default function Inventory() {
    const productParams = useAppSelector(state => state.merchandise);
    const {data, refetch} = useFetchAllProductsQuery(productParams);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [productSelect, setProductSelect] = useState<Product | null>(null);
    const [deleteProduct] = useDeleteProductMutation();

    const handleProductSelect = (product: Product) => {
        setProductSelect(product);
        setEdit(true);
    }

    const handleProductDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            refetch();
        } catch(error) {
            console.log(error);
        }
    }

    if(edit) return <ProductForm setEdit={setEdit} product={productSelect} refetch={refetch}/>

  return (
    <>
        <Box display="flex" justifyContent="space-between">
            <Typography sx={{p:2}} variant="h4">Inventory</Typography>
            <Button onClick={() => setEdit(true)} sx={{m:2}} size="large" variant="contained">Create</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Band</TableCell>
                        <TableCell align="center">Quantity In Stock</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    
                </TableHead>
                <TableBody>
                        {data && data.items.map(item => (
                            <TableRow key={item.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                <TableCell component="th">
                                    {item.id}
                                </TableCell>
                                <TableCell align="left">
                                   <Box display="flex" alignItems="center"  >
                                    <img src={item.imageUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                                    <span>{item.name}</span>
                                   </Box>
                                </TableCell>
                                <TableCell align="center">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">{item.category}</TableCell>
                                <TableCell align="center">{item.band}</TableCell>
                                <TableCell align="center">{item.stock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleProductSelect(item)} startIcon={<Edit/>}></Button>
                                    <Button onClick={() => handleProductDelete(item.id)} startIcon={<Delete/>}></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
            <Box>
                {data?.pagination && data.items.length > 0 && (
                    <AppPagination metadata={data.pagination} onPageChange={(page: number) => dispatch(setPageNumber(page))}/>
                )}
            </Box>
        </TableContainer>
    </>
  )
}