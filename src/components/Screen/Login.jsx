import React, { useState } from 'react';
import './login.css'
import logo from '../../Assets/images/sanatandark.png'
import hindilogo from '../../Assets/images//Sanatanhindi.png'
import DesignLogin from '../../Assets/images/DesignLogin.png'
import Ellipse83 from '../../Assets/images/Ellipse83.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin, forgetPassword, verifyOtp, resetPassword } from '../../Redux/Fetures/Reducers/LoginSplice'
import Modal from 'react-modal';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEffect } from 'react';
import { BiHide, BiShow } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import Loader from '../../components/Loader/Loader'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        width: '40%',
        height: 'auto',
        position: 'relative',
        border: 'none'

    },
};
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [forgetDiv, setForgetDiv] = useState(true)
    const [resetPass, setResPass] = useState(false)
    const [adminName, setAdminName] = useState('')
    const [adminId, setAdminId] = useState('')
    const [adminStatus, setAdminStatus] = useState('')
    const [passShow, setPassShow] = useState(false)
    const [buttonDi, setButtonDi] = useState(false)
    const AdminLoginFunction = (e) => {
        e.preventDefault()
        setButtonDi(true)
        const data = {
            email, password
        }
        dispatch(getLogin(data))
        setTimeout(() => {
            setButtonDi(false)
        }, 3000);
    }
    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    // ''''''''''''''''''''''''''modal =============================
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    // ============================= otp function =========================
    const forgetOTp = useSelector(state => state.login)
    const isVerefied = useSelector(state => state.login)
    const [OTP, setOTP] = useState("");
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const forgetPasswordHandle = (e) => {
        e.preventDefault()
        dispatch(forgetPassword(email))
    }

    const verifyOtps = () => {
        //    debugger;
        const data = {
            'email': forgetOTp.result.email,
            otp: OTP,
        }
        if (OTP.length !== 6) {
            toast.warning("Please enter 6 digit Otp")
        }
        else {
            dispatch(verifyOtp(data))
            // setResPass(true)
        }
    }
    useEffect(() => {
        // isOtpVerified
        if (forgetOTp?.result?.isOtpVerified) {
            setResPass(true)
        }
        if (forgetOTp?.result?.adminId) {
            setForgetDiv(false)
        }
        if (forgetOTp.result?.isPasswordReset) {
            setIsOpen(true);
            setResPass(true)
        }
    }, [forgetOTp.result])
    const handleCreatePassword = (e) => {
        e.preventDefault()
        const data = {
            adminId: forgetOTp?.result.adminId,
            adminName: forgetOTp?.result.adminName,
            adminStatus: forgetOTp?.result.adminStatus,
            password: pass,
            isPasswordReset: false,
        }
        if (pass == confirmPass) {
            dispatch(resetPassword(data))
        } else {
            toast.warning('password did not match')
        }
    }

    const showPass = () => {
        setPassShow(!passShow)
    }
    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2  h-screen font-serif  ">
                <div className="hidden md:block">
                    <img className='inline ' src='/images/Ellipse83.png' width="50%" alt="empty" />
                    <div className='flex flex-col  items-center relative -top-20'>
                        <img className='' src='/images/sanatandark.png' width='40%' alt="empty" />
                        <img className='' src='/images/Sanatanhindi.png' width='50%' alt='empty'></img>
                    </div>
                </div>
                <div className="  flex items-center bg-[] "  >
                    <div class="w-full max-w-xl  mx-auto leading-10 " >
                        <h1 className='text-center  text-4xl font-bold text-orange-500'>Sign In</h1>
                        <p className='text-center text-gray-700/80'>Astrology is a method of predicting</p>
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={AdminLoginFunction}>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Email
                                </label>
                                <input type="email" id="email" class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******************" required /> */}

                                {/* ---------------------------- */}
                                <div class="relative flex w-full flex-wrap items-stretch mb-3">
                                    <input class="px-3  placeholder-slate-500 text-slate-600 relative 
                                     rounded  border-0 shadow outline-none  w-full pr-10"
                                        type={!passShow ? `password` : 'text'}
                                        placeholder="Password"
                                        required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <span class="z-10 h-full leading-snug font-normal cursor-pointer  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                        {passShow ? <><BiShow className='text-gray-500' onClick={showPass} /></> : <>    <BiHide className='text-gray-500' onClick={showPass} /></>}
                                    </span>
                                </div>
                                {/* ---------------------------- */}
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-orange-500 hover:bg-red-700 text-white font-bold  px-5 rounded focus:outline-none focus:shadow-outline
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="submit" disabled={buttonDi}>
                                    Sign In
                                </button>
                                <p className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-red-800 cursor-pointer" onClick={openModal}>
                                    Forgot Password?
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='absolute -z-10  bottom-0 w-full'>
                    <img src='/images/DesignLogin.png' alt='empty' className='w-full'></img>
                </div>
            </div>
            {/* ========================open close modal============================ */}
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=""
            >
                {forgetDiv ? <>
                    <div class="w-full  bg-white p-5 rounded-lg lg:rounded-l-none shadow">
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[95%] shadow text-red-500 cursor-pointer" size={25} />
                        <div class="px-8 mb-4 text-center">
                            <h3 class="pt-4 mb-2 text-2xl font-bold">Forgot Your Password?</h3>
                            <p class="mb-4 text-sm text-gray-700">
                                We get it, stuff happens. Just enter your email address below and we'll send you a
                                link to reset your password!
                            </p>
                        </div>
                        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={forgetPasswordHandle}>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
                                </label>
                                <input
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email Address..."
                                    required
                                    value={email} onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>
                            {forgetOTp.loading ? <Loader /> : ''}
                            <div class="mb-6 text-center">
                                <button
                                    class=" w-full  text-white bg-gradient-to-r from-orange-500 
                                    to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center     disabled:opacity-50 disabled:cursor-not-allowed "
                                    type="submit"
                                    disabled={forgetOTp?.loading}
                                >
                                    Reset Password
                                </button>
                            </div>

                            <hr class=" border-t" />

                            <div class="text-center">

                                <a
                                    class="inline-block text-sm cursor-pointer text-blue-500 align-baseline hover:text-blue-800"
                                    onClick={() => closeModal(false)}
                                >
                                    Already have an account? Login!
                                </a>

                            </div>
                        </form>



                    </div>

                </> : <>
                    {!resetPass ? <>
                        <div class="container">
                            <div class="row justify-content-md-center">
                                <div class="col-md-4 text-center shadow-lg">
                                    <div class="row">
                                        <div class="col-sm-12 mt-5 ">
                                            <div class="text-2xl mb-5 font-bold">
                                                Verify OTP
                                            </div>
                                            <div className=' mx-10 p-2 rounded-xl bg-gray-100 shadow'>
                                                <OTPInput value={OTP} onChange={setOTP}
                                                    style={{ display: 'flex', justifyContent: 'center', padding: '20px 5px ' }}
                                                    inputStyles={{
                                                        border: "1px solid red",
                                                    }}
                                                    autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                                {/* <ResendOTP onResendClick={() => 
                                                    style={{ justifyContent: 'space-evenly', padding: '10px  38px ' }}
                                                /> */}
                                                <div className='text-center py-2'>
                                                    <button
                                                        class=" w-[30%] text-white bg-gradient-to-r from-orange-500 
                                    to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center "
                                                        onClick={() => verifyOtps()}
                                                        type='button'
                                                    >
                                                        Verify
                                                    </button>
                                                </div>
                                                <div className='text-center py-2'>
                                                    <button
                                                        class=" w-[30%] border border-orange-500 text-orange-400 hover:text-white  from-orange-500 
                                    to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center "
                                                        onClick={() => setForgetDiv(true)}
                                                    >
                                                        back
                                                    </button>
                                                </div>

                                            </div>

                                            <hr class="mt-4" />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </> : <>

                        <div class="container">
                            <div class="row justify-content-md-center">
                                <div class="col-md-4 text-center shadow-lg">
                                    <div class="row">
                                        <div class="col-sm-12 mt-5 ">
                                            <div class="text-2xl mb-5 font-bold">
                                                Reset Password
                                            </div>
                                            <form onSubmit={handleCreatePassword}>
                                                <div className=' mx-10 p-2 rounded-xl bg-gray-100 shadow'>
                                                    <div class="mb-4">
                                                        <label class="block mb-2 text-sm text-start font-bold text-gray-700" for="email">
                                                            Password
                                                        </label>
                                                        <input
                                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                            id="password"
                                                            type="text"
                                                            placeholder="Password"
                                                            required
                                                            value={pass}
                                                            onChange={(e) => setPass(e.target.value)}


                                                        />
                                                    </div>

                                                    <div class="mb-4">
                                                        <label class="block mb-2 text-sm text-start font-bold text-gray-700" for="email">
                                                            Confirm  Password
                                                        </label>
                                                        <input
                                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                            id="password"
                                                            type="text"
                                                            placeholder="Confirm Password"
                                                            required

                                                            value={confirmPass}
                                                            onChange={(e) => setConfirmPass(e.target.value)}


                                                        />
                                                    </div>




                                                    <div className='text-center py-2'>
                                                        <button
                                                            class=" w-[30%] text-white bg-gradient-to-r from-orange-500 
                                    to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center "

                                                            type='submit'
                                                        >
                                                            Verify
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>


                                            <hr class="mt-4" />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}




                </>}







            </Modal>


        </>
    )
}

export default Login