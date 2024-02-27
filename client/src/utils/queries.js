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
        }
        productCount
    }
}
`
export const QUERY_PRODUCTS = gql`
{
    products{
        _id
        name
        description
        image
        productStacks{
            _id
            pkConfig{
                _id
                configName
                itemPerPk
                pkPerlayer
                layerPerPallet
            }
            pkQty
            layerQty
            palletQty
            warehouse{
                _id
                warehouseName
            }
            zoneCode
        }
        categories{
            _id
            name
        }
        owner
    }
}
`