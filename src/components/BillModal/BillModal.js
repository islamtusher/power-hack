import React from 'react';
import { useForm } from 'react-hook-form';

const BillModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <input type="checkbox" id="billing-modal" class="modal-toggle " />
            <div class="modal ">
                <div class="modal-box relative">
                    <label for="billing-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-4'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Name</span>
                            </label>
                            <input
                                type='text'
                                className="input input-bordered focus:outline-0 focus:border-primary w-full "
                                {...register("name", { 
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                    })}
                            />
                            {errors?.name?.type === 'required' && <p className='text-red-500'>{errors?.name?.message}</p>}
                        </div>
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
                                <span className="label-text text-lg">Phone</span>
                            </label>
                            <input
                                type='tel'
                                className="input input-bordered focus:outline-0 focus:border-primary w-full  "
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'Mobile Number Must Required'
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'Need Minimum 11 Digit'
                                    }
                                    
                                })}
                            />
                            {errors?.phone?.type === 'required' && <p className='text-red-500'>{errors?.phone?.message}</p>}
                            {errors?.phone?.type === 'minLength' && <p className='text-red-500'>{errors?.phone?.message}</p>}
                            
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Paid Amount</span>
                            </label>
                            <input
                                type='number'
                                className="input input-bordered focus:outline-0 focus:border-primary w-full  "
                                {...register("amount", {
                                    required: {
                                        value: true,
                                        message: 'Amount Must Required'
                                    },
                                    validate: {
                                        positive: v => parseInt(v) > 0 || 'Should be greater than 0',
                                        
                                      }
                                    
                                })}
                            />
                            {errors?.amount?.type === 'required' && <p className='text-red-500'>{errors?.amount?.message}</p>}
                            {errors?.amount?.type === 'minLength' && <p className='text-red-500'>{errors?.amount?.message}</p>}
                            {errors?.amount?.type === 'positive' && <p className='text-red-500'>{errors?.amount?.message}</p>}
                            
                        </div>

                        <button  type='submit' className="btn bg-primary hover:bg-white hover:text-accent w-[100px] mt-6 mb-2" >Submit</button>
                       
                    </form> 
                </div>
            </div>
        </div>
    );
};

export default BillModal;