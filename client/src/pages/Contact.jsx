import { useState } from "react";
import { validateEmail } from '../utils/helpers'

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = function (e) {

        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        if (inputType === "name") {
            setName(inputValue);
        } else if (inputType === "email") {
            if (!validateEmail(email)) {
                setErrorMessage("Email is invalid");
            }
            setEmail(inputValue);
        } else {
            setContent(inputValue);
        }
    }

    const checkEmptyInput = function (e) {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        if (inputType === "name" && inputValue.trim() === '') {
            setErrorMessage("Name field cannot be empty");
        } else if (inputValue.trim() === '') {
            setErrorMessage("Content field cannot be empty");
        }
        setTimeout(() => {
            setErrorMessage('')
        }, 1500);
    }

    const checkEmail = function (e) {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        setEmail(inputValue);
        if (inputType === "email" && !validateEmail(email)) {
            setErrorMessage("Email is invalid");
        } else {
            setErrorMessage("");
        }
    }

    const handleFormSubmit = function (e) {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage("Email is invalid");
            return;
        }

        if (!name || !content) {
            setErrorMessage("Name or content is invalid");
            return;
        }
        alert(`Hi ${name}, thank you for making the contact, I will get back to you asap`)

        setName("");
        setEmail("");
        setContent("");
    }


    return (
        <div className="container">
            <h1 className='text-center'>Contact</h1>

            <form id="contact" className="mt-3" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <input className="form-control"
                        value={name}
                        name="name"
                        onChange={handleInputChange}
                        onBlur={checkEmptyInput}
                        type="text"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <input className="form-control"
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                        onBlur={checkEmail}
                        type="email"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Content</label>
                    <textarea className="form-control" rows="5"
                        value={content}
                        name="content"
                        onChange={handleInputChange}
                        onBlur={checkEmptyInput}
                        type="text"
                    ></textarea>
                </div>
                {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </form>
        </div>
    );
}