import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../FirebaseAuthentication/firebase";
import {  useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const SingIn = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSingUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        setSuccess('');
        setError('');

        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            console.log(error);
            return;
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;

        if (!isContainsUppercase.test(password)) {
            setError('password should contain atleast one uppercase latter')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                e.target.email.value = '';
                e.target.password.value = '';

                updateProfile(user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                sendEmailVerification(user)
                .then(
                    setSuccess('Verify link send to your email')
                )
                e.target.name.value = '';
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMassege = error.message;
                console.error(errorCode, errorMassege)
                setError(errorMassege);
            })
    }

    return (
        <div className="flex justify-center pt-4">

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                <form onSubmit={handleSingUp} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create an account</h5>
                    <div className="space-y-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your Name" required />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>

                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a password</label>
                        <input

                            type={!showPassword ? "password" : "text"}
                            name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-3.5 left-72">

                            {
                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }

                        </span>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">terms and conditions</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <Link to='/login' href="#" className="text-blue-700 hover:underline dark:text-blue-500">Log In</Link>
                    </div>
                </form>

                {
                    success && <p className="text-center pt-3 text-green-600 font-bold">{success}</p>
                }
                {
                    error && <p className="text-center pt-3 text-red-700 font-bold">{error.split(':')[1] || error}</p>
                }
            </div>

        </div>
    );
};

export default SingIn;