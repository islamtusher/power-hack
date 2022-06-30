import React, { useState } from 'react';
import BillModal from '../BillModal/BillModal';

const Home = () => {
    const [openBillingMOdal, setOpenBillingModal] = useState(false)

    const handleAddNewBill = () => {
        setOpenBillingModal(true)
    }
    return (
        <div className='max-w-[1400px] mx-auto'>
            <header class="navbar bg-gray-300">
                <div class="flex-1">
                    <a href='/' class="btn btn-ghost normal-case text-xl">Power Hack</a>
                </div>
                <div class="flex-none">
                    <ul class="">
                        <li><p>Paid Total</p></li>
                    </ul>
                </div>
            </header>

            <main className='mt-12'>
                <div class="navbar bg-gray-200">
                    <div class="flex-1 gap-6">
                        <h4 class=" normal-case text-xl">Blling</h4>
                        <div class="form-control">
                            <input type="text" placeholder="Search" class="input input-bordered" />
                        </div>
                    </div>
                    <div class="flex-none gap-2">
                        
                        <div class="">
                            <label
                                for="billing-modal"
                                onClick={handleAddNewBill}
                                class="btn modal-button">
                                open modal
                            </label>
                            {/* <button className='btn bth-primary'>Add Item</button> */}
                        </div>
                    </div>
                </div>
                {/* table */}

                <div class="overflow-x-auto mt-8">
                    <table class="table table-zebra w-[95%] mx-auto">
                        {/* <!-- head --> */}
                        <thead>
                            <tr className='text-center'>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th>Favorite Color</th>
                                <th>Favorite Color</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            <tr className=''>
                                <th >1</th>
                                <td className='border border-l-2'></td>
                                <td className='border border-l-2'></td>
                                <td className='border border-l-2'></td>
                                <td className='border border-l-2'></td>
                                <td className='border border-l-2'></td>
                                <td className='border border-l-2 flex justify-evenly items-center'>
                                    <button className='btn btn-primary'>Edit</button>
                                    <span className='text-3xl'>|</span>
                                    <button className='btn bg-red-600'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            
                        </tbody>
                    </table>
                    </div>
            </main>
            {openBillingMOdal && <BillModal></BillModal>}
        </div>
    );
};

export default Home;