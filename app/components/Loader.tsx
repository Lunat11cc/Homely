'use client';

import React from 'react';
import { GridLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            <GridLoader size={15} color="beige" />
        </div>
    );
};

export default Loader;