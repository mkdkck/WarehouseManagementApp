import React from 'react'
import { useState, Fragment, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCTSTACK, REMOVE_PRODUCTSTACK } from '../../utils/mutations';
import { QUERY_PRODUCTS, QUERY_CATEGORIES, QUERY_WAREHOUSES, QUERY_PKCONFIGS } from '../../utils/queries';
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const ModifyProduct = ({ selectedProduct, setShowModifyForm }) => {
    const [productState, setProductstate] = useState({
        name: selectedProduct.name,
        description: selectedProduct.description,
        image: selectedProduct.image,
        owner: selectedProduct.owner
    });

    const [productStackState, setProductStackstate] = useState({
        pkQty: 0,
        layerQty: 0,
        palletQty: 0,
        zoneCode: selectedProduct.productStacks[0].zoneCode
    });

    const [updateProduct, { UpdateError }] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [QUERY_PRODUCTS]
    })
    const [removeProduct, { RemoveError }] = useMutation(REMOVE_PRODUCT, {
        refetchQueries: [QUERY_PRODUCTS]
    })

    const [updateProductStack, { UpdateStackError }] = useMutation(UPDATE_PRODUCTSTACK, {
        refetchQueries: [QUERY_PRODUCTS]
    })
    const [removeProductStack, { RemoveStackError }] = useMutation(REMOVE_PRODUCTSTACK, {
        refetchQueries: [QUERY_PRODUCTS]
    })

    //here are the logics to set a combo box
    // const [warehouseSelected, setWarehouseSelected] = useState(null);
    // const [warehouseQuery, setWarehouseQuery] = useState('');
    // const [categorySelected, setCategorySelected] = useState(null);
    // const [categoryQuery, setCategoryQuery] = useState('');
    // const [pkConfigSelected, setPkConfigSelected] = useState(null);
    // const [pkConfigQuery, setPkConfigQuery] = useState('');

    // useQuery needs to wait until the data was fetch
    // const warehouses = useQuery(QUERY_WAREHOUSES);
    // const categories = useQuery(QUERY_CATEGORIES);
    // const pkConfigs = useQuery(QUERY_PKCONFIGS);

    //due to scope issue, need to set the states to pass the value from inside the useEffect to the global
    // const [filteredWarehouse, setFilteredWarehouse] = useState([]);
    // const [filteredCategory, setFilteredCategory] = useState([]);
    // const [filteredPkConfig, setFilteredPkConfig] = useState([]);


    // if (options.warehouses) {
    //     setWarehouseSelected(options.warehouses[0]);
    //     const filteredWarehouses = options.warehouses.filter((warehouse) =>
    //         warehouse.warehouseName
    //             .toLowerCase()
    //             .replace(/\s+/g, '')
    //             .includes(warehouseQuery.toLowerCase().replace(/\s+/g, ''))
    //     );
    //     console.log("warehouseSelected", options.warehouses[0])

    //     setFilteredWarehouse(filteredWarehouses);
    // }

    // if (options.categories) {
    //     setCategorySelected(options.categories[0]);
    //     const filteredCategories = options.categories.filter((category) =>
    //         category.name
    //             .toLowerCase()
    //             .replace(/\s+/g, '')
    //             .includes(categoryQuery.toLowerCase().replace(/\s+/g, ''))
    //     );
    //     setFilteredCategory(filteredCategories)
    // }

    // if (options.pkConfigs) {
    //     setPkConfigSelected(options.pkConfigs[0]);
    //     const filteredPkConfigs = options.pkConfigs.filter((pkConfig) =>
    //         pkConfig.configName
    //             .toLowerCase()
    //             .replace(/\s+/g, '')
    //             .includes(pkConfigQuery.toLowerCase().replace(/\s+/g, ''))
    //     );
    //     setFilteredPkConfig(filteredPkConfigs)
    // }

    const [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
        setShowModifyForm(false)
    }

    const handleProductUpdate = async (event) => {
        event.preventDefault();
        const pkQtyInt = parseInt(productStackState.pkQty, 10);
        const layerQtyInt = parseInt(productStackState.layerQty, 10);
        const palletQtyInt = parseInt(productStackState.palletQty, 10);

        const updateProductInfo = {
            ...productState,
        }
        const updateProductStackInfo = {
            productId: selectedProduct._id,
            productStackId: selectedProduct.productStacks[0]._id,
            input: {
                pkQty: pkQtyInt,
                layerQty: layerQtyInt,
                palletQty: palletQtyInt,
                zoneCode: productStackState.zoneCode,
            }
        }

        try {
            const updateProduct = await updateProduct({
                variables: { ...updateProductInfo }
            });

            const updateProductStack = await updateProductStack({
                variables: {
                    ...updateProductStackInfo
                }
            })
        } catch (error) {
            alert('An error occurred:', error);
        }

        alert('Product info updated sucessfully')
        setProductstate({
            name: '',
            description: '',
            image: '',
            owner: ''
        })
        setProductStackstate({
            pkQty: 0,
            layerQty: 0,
            palletQty: 0,
            zoneCode: '',
        })
    };

    const handleProductChange = (event) => {
        const { name, value } = event.target;
        setProductstate({
            ...productState,
            [name]: value,
        });
    };

    const handleProductStackChange = (event) => {
        const { name, value } = event.target;
        setProductStackstate({
            ...productStackState,
            [name]: value,
        });
    };

    const handleProductDelete = async (event) => {
        event.preventDefault();
        try {
            const productDeleteResponse = await removeProduct({
                variables: { _id: selectedProduct._id }
            });
        } catch (error) {
            alert('An error occurred:', error);
        }


        alert('Product info deleted sucessfully')
        closeModal()
        setProductstate({
            name: '',
            description: '',
            image: '',
            owner: ''
        })
        setProductStackstate({
            pkQty: 0,
            layerQty: 0,
            palletQty: 0,
            zoneCode: '',
        })
    };



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Manage product
                                </Dialog.Title>
                                <form className="mt-2">
                                    <div className='flex max-md:flex-col md:flex-row'>

                                        {/* basic product info section */}
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        autoComplete="name"
                                                        placeholder={selectedProduct.name}
                                                        onChange={handleProductChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product category
                                                    <p>under construction...</p>
                                                </label>
                                                <div className="mt-2">
                                                    {/* Product Selection box category */}

                                                    {/* <div className="w-60">
                                                        <Combobox value={categorySelected} onChange={setCategorySelected}>
                                                            <div className="relative mt-1">
                                                                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                                    <Combobox.Input
                                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                                        displayValue={(category) => category.name}
                                                                        onChange={(event) => setCategoryQuery(event.target.value)}
                                                                    />
                                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <ChevronUpDownIcon
                                                                            className="h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Combobox.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    afterLeave={() => setCategoryQuery('')}
                                                                >
                                                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                                        {filteredCategory.length === 0 && categoryQuery !== '' ? (
                                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                                Nothing found.
                                                                            </div>
                                                                        ) : (
                                                                            filteredCategory.map((category) => (
                                                                                <Combobox.Option
                                                                                    key={category._id}
                                                                                    className={({ active }) =>
                                                                                        `z-10 relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                                        }`
                                                                                    }
                                                                                    value={category}
                                                                                >
                                                                                    {({ selected, active }) => (
                                                                                        <>
                                                                                            <span
                                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                    }`}
                                                                                            >
                                                                                                {category.name}
                                                                                            </span>
                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                                        }`}
                                                                                                >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </Combobox.Option>
                                                                            ))
                                                                        )}
                                                                    </Combobox.Options>
                                                                </Transition>
                                                            </div>
                                                        </Combobox>
                                                    </div> */}
                                                    {/* Product Selection box category */}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Product description
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        type="text"
                                                        name="description"
                                                        id="description"
                                                        autoComplete="description"
                                                        placeholder={selectedProduct.description}
                                                        rows="3"
                                                        onChange={handleProductChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Image link
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="image"
                                                        id="image"
                                                        autoComplete="image"
                                                        placeholder={selectedProduct.image}
                                                        onChange={handleProductChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Owner
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="owner"
                                                        id="owner"
                                                        autoComplete="owner"
                                                        placeholder={selectedProduct.owner}
                                                        onChange={handleProductChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* basic product info section */}

                                        {/* product stack info section */}
                                        <div className='mt-10 ms-10'>
                                            <h2>Product Stack:</h2>

                                            <div className="sm:col-span-5 mt-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Package configuration
                                                    <p>under construction...</p>

                                                </label>
                                                <div className="mt-2">

                                                    {/* Product Selection box pkConfig */}
                                                    {/* <div className="w-72">
                                                        <Combobox value={pkConfigSelected} onChange={setPkConfigSelected}>
                                                            <div className="relative mt-1">
                                                                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                                    <Combobox.Input
                                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                                        displayValue={(pkConfig) => pkConfig.configName}
                                                                        onChange={(event) => setPkConfigQuery(event.target.value)}
                                                                    />
                                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <ChevronUpDownIcon
                                                                            className="h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Combobox.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    afterLeave={() => setPkConfigQuery('')}
                                                                >
                                                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                                        {filteredPkConfig.length === 0 && pkConfigQuery !== '' ? (
                                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                                Nothing found.
                                                                            </div>
                                                                        ) : (
                                                                            filteredPkConfig.map((pkConfig) => (
                                                                                <Combobox.Option
                                                                                    key={pkConfig._id}
                                                                                    className={({ active }) =>
                                                                                        `z-10 relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                                        }`
                                                                                    }
                                                                                    value={pkConfig}
                                                                                >
                                                                                    {({ selected, active }) => (
                                                                                        <>
                                                                                            <span
                                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                    }`}
                                                                                            >
                                                                                                {pkConfig.configName}
                                                                                            </span>
                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                                        }`}
                                                                                                >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </Combobox.Option>
                                                                            ))
                                                                        )}
                                                                    </Combobox.Options>
                                                                </Transition>
                                                            </div>
                                                        </Combobox>
                                                    </div> */}
                                                    {/* Product Selection box pkConfig */}

                                                </div>
                                            </div>
                                            <div className='flex flex-row'>
                                                <div className="sm:col-span-2 mt-5">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Box(es)
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="pkQty"
                                                            id="pkQty"
                                                            autoComplete="pkQty"
                                                            placeholder={selectedProduct.productStacks[0].pkQty}
                                                            onChange={handleProductStackChange}
                                                            className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2 mt-5">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Layer(s)
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="layerQty"
                                                            id="layerQty"
                                                            autoComplete="layerQty"
                                                            placeholder={selectedProduct.productStacks[0].layerQty}
                                                            onChange={handleProductStackChange}
                                                            className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2 mt-5">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        Pallet(s)
                                                    </label>
                                                    <div className="mt-2 justify-center">
                                                        <input
                                                            type="text"
                                                            name="palletQty"
                                                            id="palletQty"
                                                            autoComplete="palletQty"
                                                            placeholder={selectedProduct.productStacks[0].palletQty}
                                                            onChange={handleProductStackChange}
                                                            className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2 mt-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Warehouse
                                                    <p>under construction...</p>

                                                </label>
                                                <div className="mt-2">

                                                    {/* Product Selection box warehouse */}
                                                    {/* <div className="w-72">
                                                        <Combobox value={warehouseSelected} onChange={setWarehouseSelected}>
                                                            <div className="relative mt-1">
                                                                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                                    <Combobox.Input
                                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                                        displayValue={(warehouse) => warehouse.warehouseName}
                                                                        onChange={(event) => setWarehouseQuery(event.target.value)}
                                                                    />
                                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <ChevronUpDownIcon
                                                                            className="h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Combobox.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    afterLeave={() => setWarehouseQuery('')}
                                                                >
                                                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                                        {filteredWarehouse.length === 0 && warehouseQuery !== '' ? (
                                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                                Nothing found.
                                                                            </div>
                                                                        ) : (
                                                                            filteredWarehouse.map((warehouse) => (
                                                                                <Combobox.Option
                                                                                    key={warehouse._id}
                                                                                    className={({ active }) =>
                                                                                        `z-10 relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                                        }`
                                                                                    }
                                                                                    value={warehouse}
                                                                                >
                                                                                    {({ selected, active }) => (
                                                                                        <>
                                                                                            <span
                                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                    }`}
                                                                                            >
                                                                                                {warehouse.warehouseName}
                                                                                            </span>
                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                                        }`}
                                                                                                >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </Combobox.Option>
                                                                            ))
                                                                        )}
                                                                    </Combobox.Options>
                                                                </Transition>
                                                            </div>
                                                        </Combobox>
                                                    </div> */}
                                                    {/* Product Selection box warehouse */}

                                                </div>
                                            </div>
                                            <div className="sm:col-span-2 mt-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Zone Code                                                    </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="zoneCode"
                                                        id="zoneCode"
                                                        autoComplete="zoneCode"
                                                        placeholder={selectedProduct.productStacks[0].zoneCode}
                                                        onChange={handleProductStackChange}
                                                        className="block w-4/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        {/* product stack info section */}

                                    </div>

                                </form>
                                {UpdateError && <div>Error adding new product Stack... <p>{UpdateError.message}</p></div>}
                                {UpdateStackError && <div>Error adding new product... <p>{UpdateStackError.message}</p></div>}
                                {RemoveError && <div>Error adding new product Stack... <p>{RemoveError.message}</p></div>}
                                {RemoveStackError && <div>Error adding new product... <p>{RemoveStackError.message}</p></div>}



                                <div className="mt-8">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    // onClick={handleProductUpdate}
                                    >
                                        Update(underConstruction)
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleProductDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModifyProduct;