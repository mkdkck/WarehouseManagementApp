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

export const QUERY_PKCONFIGS = gql`
{
    pkConfigs{
        _id
        configName
        itemPerPk
        pkPerlayer
        layerPerPallet
        palletTotalItems
        palletTotalPks
    }
}
`

export const QUERY_CATEGORIES = gql`
{
    categories{
        _id
        name
        products{
            _id
            name
            description
            owner
            totalQty
        }
        productCount
    }
}
`
export const QUERY_PRODUCT = gql`
{
    products{
        _id
        name
        description
        image
        productStacks
        categories
        owner
        totalQty
    }
}
`