'use client';

import React from 'react';
import Container from "@/app/components/Container";
import { categories } from "@/app/data/Categories";
import CategoryBox from "@/app/components/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;