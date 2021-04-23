/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const [search, { data, error, loading }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const searhSometimes = debounce(search, 350);

  const items = data?.searchTerms || [];

  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items,
    onInputValueChange: () => {
      searhSometimes({ variables: { searchTerm: inputValue } });
    },
    onSelectedItemChange: ({ selectedItem }) => {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((product, index) => (
            <DropDownItem
              {...getItemProps({
                key: product.id,
                item: product,
                onClick: () => {
                  router.push({
                    pathname: `/product/${product.id}`,
                  });
                },
              })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={product.photo.image.publicUrlTransformed}
                alt={product.name}
                width="50"
              />
              {product.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
