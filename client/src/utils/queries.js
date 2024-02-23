import { gql } from '@apollo/client';

export const VIEW_ALLWAREHOUSES = gql`
  query viewAllWarehouses {
    warehouses(
        _id
        name
        location
        contactNumber
    };
`
