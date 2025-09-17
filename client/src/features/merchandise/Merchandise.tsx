import {  Grid2} from "@mui/material";
import ProductList from "./ProductList";
import { useFetchAllProductsQuery, useFetchFilterQuery } from "./merchandiseAPI";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import AppPagination from "../../shared/components/AppPagination";
import { setPageNumber } from "./merchandiseSlice";

export default function Merchandise() {
  const productParams = useAppSelector((state) => state.merchandise);
  const { data, isLoading } = useFetchAllProductsQuery(productParams);
  const { data: dataFilter, isLoading: isLoadingFilter } = useFetchFilterQuery();
  const dispatch = useAppDispatch();



  if (isLoading || !data || isLoadingFilter || !dataFilter) return <div>Loading...</div>;
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={2.5}>
        <Filters dataFilter={dataFilter}/>
      </Grid2>
      <Grid2 size={9.5}>
        <ProductList products={data.items} />
        <AppPagination metadata={data.pagination} onPageChange={(page: number) => {
          dispatch(setPageNumber(page));
          window.scrollTo({top: 0, behavior: "instant"})
          }}/>
      </Grid2>  

    </Grid2>
  );
}
