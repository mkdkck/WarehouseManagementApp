import { gql } from '@apollo/client';

export const QUERY_WAREHOUSES = gql`
{
    warehouses{
        _id
        warehouseName
        location
        contactNumber
    }
}
`
