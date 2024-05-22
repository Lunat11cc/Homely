'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface HomeButtonProps {
    title?: string;
    subtitle?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({
    title = "",
    subtitle = "",
}) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-40 mt-4">
                <Button
                    outline
                    label="Главная"
                    onClick={() => router.push('/')}
                />
            </div>
        </div>
    );
};

export default HomeButton;