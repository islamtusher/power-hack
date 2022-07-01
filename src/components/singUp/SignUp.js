import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Navbar from '../navbar/Navbar';

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = formData => {   
        console.log(formData);
        fetch('http://localhost:5000/api/registration', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged === true) {
                        reset()
                        toast.success('Sign Up successfull')
                    }
                })
    }
    return (
        <div>
            <Navbar></Navbar>
             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-4'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-lg">Email</span>
                    </label>
                    <input
                        type='email'
                        className="input input-bordered focus:outline-0 focus:border-primary w-full "
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Provide A Valid Email'
                            }})
                        }
                    />
                    {errors?.email?.type === 'required' && <p className='text-red-500'>{errors?.email?.message}</p>}
                    {errors?.email?.type === 'pattern' && <p className='text-red-500'>{errors?.email?.message}</p>}
                    
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-lg">Password</span>
                    </label>
                    <input
                        type='password'
                        className="input input-bordered focus:outline-0 focus:border-primary w-full "
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is Required'
                            },
                            minLength: {
                                value: 6,
                                message: 'Need Minimum 6 Digit'
                            }
                        })
                        }
                    />
                    {errors?.password?.type === 'required' && <p className='text-red-500'>{errors?.passwordl?.message}</p>}
                    {errors?.password?.type === 'minLength' && <p className='text-red-500'>{errors?.password?.message}</p>}
                    
                </div>
                <button  type='submit' className="btn bg-primary hover:bg-white hover:text-accent w-[100px] mt-6 mb-2" >SignUp</button>
                
            </form>
        </div>
    );
};

export default SignUp;