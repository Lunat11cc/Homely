'use client';

import React from "react";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    className=""
}) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${className}`}
        >
            {label}
        </div>
    );
};

export default MenuItem;