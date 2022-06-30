import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const BillModal = ({setOpenBillingModal, refetch, isUpdate, updateId}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Handle submit the add bill form
    const onSubmit = formData => {
        console.log(updateId);
        
        // if requst for post new bill
        if (!isUpdate) {
            fetch('http://localhost:5000/addBill', {
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
                        setOpenBillingModal(false)
                        refetch()
                        reset()
                        toast('New Bill Add Successfully')
                    }
                })
            return
        }

        // if requst for update a old bill
        fetch(`http://localhost:5000/updateBill/${updateId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged === true) {
                    setOpenBillingModal(false)
                    refetch()
                    reset()
                    toast('New Bill Add Successfully')
                }
            })
    }

    // handle close modal
    const handleCloseModal = () => {
        reset()
    }

    return (
        <div>
            
            
            <input type="checkbox" id="billing-modal" class="modal-toggle " />
            <div class="modal ">
                <div class="modal-box relative">
                    <label onClick={handleCloseModal} for="billing-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-4'>
                        {
                            isUpdate? <h1 className='text-dark'> Make Some Update</h1> : <h1 className='text-dark'>Add An New Bill</h1>
                        }
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
                                {...register("paidAmount", {
                                    required: {
                                        value: true,
                                        message: 'Amount Must Required'
                                    },
                                    validate: {
                                        positive: v => parseInt(v) > 0 || 'Should be greater than 0',
                                        
                                      }
                                    
                                })}
                            />
                            {errors?.paidAmount?.type === 'required' && <p className='text-red-500'>{errors?.paidAmount?.message}</p>}
                            {errors?.paidAmount?.type === 'minLength' && <p className='text-red-500'>{errors?.paidAmount?.message}</p>}
                            {errors?.paidAmount?.type === 'positive' && <p className='text-red-500'>{errors?.paidAmount?.message}</p>}
                            
                        </div>

                        <button  type='submit' className="btn bg-primary hover:bg-white hover:text-accent w-[100px] mt-6 mb-2" >{isUpdate ? 'Update' : 'Submit'}</button>
                       
                    </form> 
                </div>
            </div>
            
        </div>
    );
};

export default BillModal;