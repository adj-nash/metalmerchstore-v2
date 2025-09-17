import {
  Box,
  Button,
  Paper,


} from "@mui/material";
import SearchBar from "./SearchBar";
import RadioButtons from "../../shared/components/RadioButtons";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import { resetParams, setCategory, setGenre, setOrderBy } from "./merchandiseSlice";
import CheckBoxes from "../../shared/components/CheckBoxes";

const sort = [
  { value: "name", label: "A-Z" },
  { value: "price", label: "Price: High to low" },
  { value: "priceDesc", label: "Price: Low to high" },
];

type Props = {

  dataFilter: {
    category: string[];
    band: string[];
    genre: string[];
  }
};


export default function Filters({dataFilter: data}: Props) {

  const {orderBy, category, genre} = useAppSelector(state => state.merchandise);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <SearchBar />
      </Paper>
      <Paper sx={{ p: 3 }}>
      <RadioButtons options={sort} selectedValue={orderBy} onChange={e => dispatch(setOrderBy(e.target.value))}/>
      </Paper>
      <Paper sx={{ p: 3 }}>
      <CheckBoxes items={data.category} checked={category} onChange={((items: string[]) => dispatch(setCategory(items)))}/>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckBoxes items={data.genre} checked={genre} onChange={((items: string[]) => dispatch(setGenre(items)))}/>
      </Paper>
      <Button  onClick={() => dispatch(resetParams())}>Reset Filters</Button>
    </Box>
  );
}
