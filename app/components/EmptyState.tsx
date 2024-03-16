'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "Нет точных совпадений",
    subtitle = "Попробуйте изменить или удалить некоторые фильтры",
    showReset
}) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Очистить все фильтры"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;