import React from "react";
import { Link } from "react-router-dom";
import { useState, Fragment, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, ADD_PRODUCTSTACK } from '../../utils/mutations';
import { QUERY_PRODUCTS, QUERY_CATEGORIES, QUERY_WAREHOUSES, QUERY_USERS } from '../../utils/queries';
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const DashboardCard = ({ page }) => {
    let query
    switch (page) {
        case "warehouse":
            query = QUERY_WAREHOUSES
            break;
        case "category":
            query = QUERY_CATEGORIES
            break;
        case "product":
            query = QUERY_PRODUCTS
            break;
        case "user":
            query = QUERY_USERS
            break;

        default:
            break;
    }

    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className="card w-80 bg-base-100 shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">{page}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {loading ? <tr><td>Loading...</td></tr> :

                            < tr key={data[0].item._id} className="hover" >
                                <td>{data[0].item._id}</td>
                            </tr>
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardCard;