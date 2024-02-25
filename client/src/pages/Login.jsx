import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations'
import Auth from '../utils/auth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!formState.email || !formState.password) {
            alert("All fields are required");
            return;
        }

        try {
            const mutationResponse = await login({
                variables: {
                    ...formState
                },
            });
            Auth.login(mutationResponse.data.login.token);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm text-gray-600">Sign in to access your account</p>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="john@mail.com"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                                onChange={handleInputChange} />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                {/* <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a> */}
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Sign in</button>
                        </div>
                        <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                            <Link
                                to='/Signup' className="hover:underline text-violet-600"
                            >Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login