import React from "react";
import { Link } from "react-router-dom";
import { useState, Fragment, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, ADD_PRODUCTSTACK } from '../../utils/mutations';
import { QUERY_PRODUCTS, QUERY_CATEGORIES, QUERY_WAREHOUSES } from '../../utils/queries';
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const DashboardCard = ({ page }) => {
    // const queries = {
    //     warehouse: QUERY_WAREHOUSES,
    //     category: QUERY_CATEGORIES,
    //     product: QUERY_PRODUCTS,
    // user: QUERY_USERS
    // };

    // const query = queries[page];

    // const { loading, error, data } = useQuery(query);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    // console.log(data)

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{data.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    );
};

export default DashboardCard;