// import {SearchStyles} from

import { useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const Search = () => {
  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    onInputValueChange: () => {
      console.log('INPUT CHANGED');
    },
    onSelectedItemChange: () => {
      console.log('SELECTED ITEM CHANGED');
    },
  });
  return (
    <SearchStyles>
      <div>
        <input type="search" />
      </div>
      <DropDown>
        <DropDownItem>HEY</DropDownItem>
        <DropDownItem>HEY</DropDownItem>
        <DropDownItem>HEY</DropDownItem>
        <DropDownItem>HEY</DropDownItem>
        <DropDownItem>HEY</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
