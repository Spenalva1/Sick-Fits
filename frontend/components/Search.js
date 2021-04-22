/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { description_contains_i: $searchTerm }
          { name_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  resetIdCounter();

  const [search, { data, error, loading }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const searhSometimes = debounce(search, 350);

  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: [],
    onInputValueChange: () => {
      console.log('INPUT CHANGED', inputValue);
      searhSometimes({ variables: { searchTerm: inputValue } });
    },
    onSelectedItemChange: () => {
      console.log('SELECTED ITEM CHANGED');
    },
  });

  return (
    <SearchStyles>
      <div {...getInputProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem {...getComboboxProps()}>HEY</DropDownItem>
        <DropDownItem {...getComboboxProps()}>HEY</DropDownItem>
        <DropDownItem {...getComboboxProps()}>HEY</DropDownItem>
        <DropDownItem {...getComboboxProps()}>HEY</DropDownItem>
        <DropDownItem {...getComboboxProps()}>HEY</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
