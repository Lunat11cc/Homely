'use client';

import React from 'react';
import { IconType } from "react-icons";

interface ListingSpecialProps {
    icon: IconType;
    label: string;
}

const ListingSpecial: React.FC<ListingSpecialProps> = ({
    icon: Icon,
    label,
}) => {
    return (
        <div className="flex flex-col gap-6 mt-2">
            <div className="flex flex-row items-center gap-4">
                <Icon
                    size={25}
                    className="text-black"
                />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingSpecial;