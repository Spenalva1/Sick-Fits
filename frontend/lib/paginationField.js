import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false, // tells apollo we will take care of everything
  read: (existing = [], { args, cache }) => {
    console.log({ existing, args, cache });
    const { skip, first } = args;
    // Read the number of items on the page from the cache
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    // Check if we have existing items
    const items = existing.slice(skip, skip + first).filter((i) => i);

    // if
    // There are items
    // AND there arent enough items to satisfy how many were requested
    // AND we are on the las page
    // THEN JUST SENT IT
    if (items.length && items.length !== first && page === pages) {
      return items;
    }

    if (items.length !== first) {
      // We don't have any items, we must go to the nettwork to fetch them
      return false;
    }

    // If there are items, just return rhem from the cacke, and we don't need to go to the network
    if (items.length) {
      return items;
    }

    return false; // Fallback to network

    // First thing it does it asks the read funciton for thos items
    // We can either do one of two things:
    // First thing we can do is return the items because they are already in te cache
    // The other thing we can do is to return false from here, (network request)
  },
  merge: (existing, incoming, { args }) => {
    const { skip, first } = args;
    // This runs when the Apollo client comes back from the network with out product
    console.log(`Merging items from the netwok ${incoming.length}`);
    const merged = existing ? [...existing] : [];
    for (let i = skip; i < skip + incoming.length; i += 1) {
      merged[i] = incoming[i - skip];
    }
    console.log({ merged });
    //
    return merged;
  },
});

export default paginationField;
