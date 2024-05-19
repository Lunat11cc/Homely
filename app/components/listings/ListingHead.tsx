import React from 'react';
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import ListingCategory from "@/app/components/listings/ListingCategory";
import {IconType} from "react-icons";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
}

const ListingHead: React.FC<ListingHeadProps> = ({
     title,
     locationValue,
     imageSrc,
     id,
     currentUser,
     category,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
    const [coverPhoto, ...otherPhotos] = imageSrc;

    return (
        <>
            <Heading
                title={title}
            />
            <div className="relative">
                <div className="w-full max-h-[60vh] overflow-hidden rounded-xl relative">
                    <div>
                        <Image
                            src={coverPhoto}
                            alt="Обложка"
                            width={500}
                            height={500}
                            className="object-cover w-full"
                        />
                        <div className="absolute top-2 right-2">
                            <HeartButton
                                listingId={id}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {otherPhotos.map((imageSrc, index) => (
                        <div key={index} className="relative flex">
                            <Image
                                src={imageSrc}
                                alt="Дополнительная фотография"
                                width={330}
                                height={200}
                                className="object-cover w-full rounded-md cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
                <h1 className="text-2xl font-bold mt-10">{`${location?.region}, ${location?.label}`}</h1>
                {category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )}
            </div>
        </>
    );
};

export default ListingHead;
