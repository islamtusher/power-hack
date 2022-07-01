import React, { useEffect, useState } from 'react';

const Navbar = ({ data }) => {
    const [totalPaid, setTotalPaid] = useState(0)
    useEffect(() => {
        let a = 0
        if (data) {
            for (const element of data) {
                a = a + parseInt(element.paidAmount)
            }
        }
        setTotalPaid(a)
    },[data])
    return (
        <header className="navbar bg-gray-300 px-6">
                <div className="flex-1">
                    <a href='/' className="btn btn-ghost normal-case text-xl">Power Hack</a>
                </div>
                <div className="flex-none">
                    <ul className="">
                        <li>
                            <p className='font-bold text-lg'>Paid Total: {totalPaid}</p>
                                
                        </li>
                    </ul>
                </div>
            </header>
    );
};

export default Navbar;