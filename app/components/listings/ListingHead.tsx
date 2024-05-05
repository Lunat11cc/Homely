import React from 'react';
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
     title,
     locationValue,
     imageSrc,
     id,
     currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
    const [coverPhoto, ...otherPhotos] = imageSrc;

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="relative">
                <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                    <div className="flex h-full w-full items-center justify-center">
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

                <div className="grid grid-cols-3 gap-4 mt-4">
                    {otherPhotos.map((imageSrc, index) => (
                        <div key={index} className="relative flex">
                            <Image
                                src={imageSrc}
                                alt="Дополнительная фотография"
                                width={330}
                                height={200}
                                className="object-cover rounded-md cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListingHead;
