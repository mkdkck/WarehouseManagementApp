import React from 'react'
import { useState, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, ADD_PRODUCTSTACK } from '../../utils/mutations';
import { QUERY_PRODUCTS, QUERY_CATEGORIES, QUERY_WAREHOUSES, QUERY_PKCONFIGS } from '../../utils/queries';
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const NewProduct = () => {
    const [productState, setProductstate] = useState({
        name: "",
        description: "",
        image: "",
        owner: ""
    });
    const [productStackState, setProductStackstate] = useState({
        pkQty: "",
        layerQty: "",
        palletQty: "",
        zoneCode: "",
    });
    const [addProduct, { productError }] = useMutation(ADD_PRODUCT, {
        refetchQueries: [QUERY_PRODUCTS]
    })
    const [addProductStack, { stackError }] = useMutation(ADD_PRODUCTSTACK, {
        refetchQueries: [QUERY_PRODUCTS]
    })

    const warehouses = useQuery(QUERY_WAREHOUSES)
    const warehouseList = warehouses.data.warehouses
    const [warehouseSelected, setWarehouseSelected] = useState(warehouseList[0])
    const [warehouseQuery, setWarehouseQuery] = useState('')

    const filteredWarehouse =
        warehouseQuery === ''
            ? warehouseList
            : warehouseList.filter((warehouse) =>
                warehouse.warehouseName
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(warehouseQuery.toLowerCase().replace(/\s+/g, ''))
            )


    const categories = useQuery(QUERY_CATEGORIES)
    const categoryList = categories.data.categories
    const [categorySelected, setCategorySelected] = useState(categoryList[0])
    const [categoryQuery, setCategoryQuery] = useState('')

    const filteredCategory =
        categoryQuery === ''
            ? categoryList
            : categoryList.filter((category) =>
                category.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(categoryQuery.toLowerCase().replace(/\s+/g, ''))
            )


    const pkConfigs = useQuery(QUERY_PKCONFIGS)
    const pkConfigList = pkConfigs.data.pkConfigs
    const [pkConfigSelected, setPkConfigSelected] = useState(pkConfigList[0])
    const [pkConfigQuery, setPkConfigQuery] = useState('')

    const filteredPkConfig =
        pkConfigQuery === ''
            ? pkConfigList
            : pkConfigList.filter((pkConfig) =>
                pkConfig.configName
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(pkConfigQuery.toLowerCase().replace(/\s+/g, ''))
            )


    const [isOpen, setIsOpen] = useState(false)




    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addCategory({
            variables: { ...formState }
        });
        if (error) {
            return
        }
        alert('A new product created sucessfully')
        closeModal()
        setFormState({ name: '', products: [] })
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div >
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-xxl mt-5 w-4/5 bg-amber-300 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Add a new product category
                </button>
            </div>

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
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        New product
                                    </Dialog.Title>
                                    <form className="mt-2">
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
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
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
                                                        rows="3"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </form>

                                    {/* Product Selection box warehouse */}

                                    <div className="mt-5 w-72">
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
                                    </div>

                                    {/* Product Selection box warehouse */}

                                    {/* Product Selection box category */}

                                    <div className="mt-5 w-72">
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
                                    </div>
                                    {/* Product Selection box category */}

                                    {/* Product Selection box pkConfig */}

                                    <div className="mt-5 w-72">
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
                                    </div>
                                    {/* Product Selection box pkConfig */}


                                    <div className="mt-8">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleFormSubmit}
                                        >
                                            Creat New
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                    {stackError && <div>Error adding new product Stack... <p>{stackError.message}</p></div>}
                                    {productError && <div>Error adding new product... <p>{productError.message}</p></div>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default NewProduct;