import React from 'react'
import { useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CATEGORY, REMOVE_CATEGORY } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { Dialog, Transition } from '@headlessui/react'


const ModifyCategory = ({ category, setShowModifyForm }) => {
    const [formState, setFormState] = useState({
        _id: category._id,
        name: category.name,
        products: category.products
    });
    const [updateCategory, { UpdateError }] = useMutation(UPDATE_CATEGORY, {
        refetchQueries: [QUERY_CATEGORIES]
    })
    const [removeCategory, { RemoveError }] = useMutation(REMOVE_CATEGORY, {
        refetchQueries: [QUERY_CATEGORIES]
    })

    const [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
        setShowModifyForm(false)
    }

    const handleCategoryUpdate = async (event) => {
        event.preventDefault();

        const mutationResponse = await updateCategory({
            variables: { ...formState }
        });
        if (UpdateError) {
            return
        }
        alert('Category updated sucessfully')
        setFormState({ _id: '', name: '', products: [] })
    };

    const handleCategoryDelete = async (event) => {
        event.preventDefault();
        const mutationResponse = await removeCategory({
            variables: { _id: category._id }
        });
        if (RemoveError) {
            return
        }
        alert('Category deleted sucessfully')
        closeModal()
        setFormState({ _id: '', name: '', products: [] })
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Category configuration
                                </Dialog.Title>
                                <form className="mt-2">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-5">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Category name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="cat1"
                                                    placeholder={category.name}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-5">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Products
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="products"
                                                    id="products"
                                                    autoComplete="products1"
                                                    placeholder={category.products}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-8">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleCategoryUpdate}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleCategoryDelete}
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
                                {UpdateError && <div>Error updating package configuration... <p>{UpdateError.message}</p></div>}
                                {RemoveError && <div>Error deleting package configuration ... <p>{RemoveError.message}</p></div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModifyCategory;