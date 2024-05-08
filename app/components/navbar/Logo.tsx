'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
    size?: number;
}

const Logo: React.FC<LogoProps> = ({
    size
}) => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height={size}
            width={size}
            src="/images/Logo.svg"
        />
    )
}

export default Logo;