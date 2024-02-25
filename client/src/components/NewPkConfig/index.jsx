import React from 'react'
import { useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PKCONFIG } from '../../utils/mutations';
import { QUERY_PKCONFIGS } from '../../utils/queries';
import { Dialog, Transition } from '@headlessui/react'


const NewPkConfig = () => {
    const [formState, setFormState] = useState({ configName: '', itemPerPk: '1', pkPerlayer: '1', layerPerPallet: '1' });
    const [addPkConfig, { error }] = useMutation(ADD_PKCONFIG, {
        refetchQueries: [QUERY_PKCONFIGS]
    })
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const itemPerPkInt = parseInt(formState.itemPerPk, 10);
        const pkPerlayerInt = parseInt(formState.pkPerlayer, 10);
        const layerPerPalletInt = parseInt(formState.layerPerPallet, 10);

        const mutationResponse = await addPkConfig({
            variables: {
                configName: formState.configName,
                itemPerPk: itemPerPkInt,
                pkPerlayer: pkPerlayerInt,
                layerPerPallet: layerPerPalletInt
            }
        });
        if (error) {
            return
        }
        alert('A new package configuration created sucessfully')
        closeModal()
        setFormState({ configName: '', itemPerPk: '1', pkPerlayer: '1', layerPerPallet: '1' })
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
                    Add a new package configuration
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        New package configuration
                                    </Dialog.Title>
                                    <form className="mt-2">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Configuration name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="configName"
                                                        id="configName"
                                                        autoComplete="config 1"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Item(s) in a package
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="itemPerPk"
                                                        id="itemPerPk"
                                                        autoComplete="1"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Package(s) on a layer
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="pkPerlayer"
                                                        name="pkPerlayer"
                                                        type="number"
                                                        autoComplete="1"
                                                        onChange={handleChange}

                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-5">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Layer(s) in a pallet
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="layerPerPallet"
                                                        name="layerPerPallet"
                                                        type="number"
                                                        autoComplete="1"
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
                                    {error && <div>Error adding package configuration... <p>{error.message}</p></div>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default NewPkConfig;