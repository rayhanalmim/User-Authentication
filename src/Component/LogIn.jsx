import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../FirebaseAuthentication/firebase";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LogIn = () => {
    const emailRef = useRef(null);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setSuccess('');
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(user.emailVerified){
                    setSuccess('log in successfully')
                }
                else(
                    setError('Email not verified')
                )
                
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage);
            })
    }

    const handleResetPassword = () =>{
        const emailForReset = emailRef.current.value;
        console.log(emailForReset);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailForReset){
            setError('Please enter an email')
        }
        else if(!emailPattern.test(emailForReset)){
            setError('Please enter a valid email');
        }

        sendPasswordResetEmail(auth, emailForReset)
        .then( () =>{
            setSuccess('Please check your email address');
            emailRef.current.value = '';
        })
        .catch(error =>{
            const errorMessage = error.message;
            setError(errorMessage);
        })
    }

    return (
        <div>
            <div className="flex justify-center pt-4">

                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleLogIn} className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a password</label>
                        <input 
                        
                        type={!showPassword ? "password" : "text"}
                        name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        <span onClick={()=>setShowPassword(!showPassword)} className="absolute bottom-3.5 left-72">

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
                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" onClick={handleResetPassword} className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to='/join' href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
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
        </div>
    );
};

export default LogIn;