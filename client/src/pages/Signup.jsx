import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth'

function Signup() {
    const [formState, setFormState] = useState({ username: '', email: '', password: '', organization: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!formState.username || !formState.email || !formState.password || !formState.organization) {
            alert("All fields are required");
            return;
        }
        if (formState.password.length < 5) {
            alert("Password need to have at least 5 characters");
            return;
        }

        try {
            const mutationResponse = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                    role: 'admin',
                    organization: formState.organization,
                },
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (error) {
            console.error("An error occurred:", error);
        }
        window.location.assign('/Home');
    };



    return (
        <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-sm text-gray-600">Sign in to access your account</p>
            </div>
            <form className="space-y-12" onSubmit={handleFormSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="john@gmail.com"
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Password</label>
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="*****"
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Organization</label>
                        </div>
                        <input
                            type="text"
                            name="organization"
                            id="organization"
                            placeholder="org"
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button
                            type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Sign up</button>
                    </div>
                </div>
                {error && <div>Something went wrong...</div>}
            </form>
        </div>
    )
}

export default Signup