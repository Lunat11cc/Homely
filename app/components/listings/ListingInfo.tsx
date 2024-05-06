'use client';

import React from 'react';
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import dynamic from "next/dynamic";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Map = dynamic(() => import('@/app/components/Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    locationValue: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    locationValue,
    guestCount,
    roomCount,
    bathroomCount
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <hr/>
                <div className="text-xl font-semibold flex flex-row items-center gap-2 mt-4 mb-4">
                    <Avatar src={user?.image}/>
                    <div>Хозяин: {user?.name}</div>
                </div>
                <hr/>
            </div>
            <div className="flex flex-col items-start gap-4 text-xl font-semibold text-black mt-3">
                <div className="flex flex-row gap-4">
                    <IoIosCheckmarkCircle size={25} color="#F8C07E" />
                    Принимает гостей: {guestCount}
                </div>
                <div className="flex flex-row gap-4">
                    <IoIosCheckmarkCircle size={25} color="#F8C07E" />
                    Всего комнат: {roomCount}
                </div>
                <div className="flex flex-row gap-4">
                    <IoIosCheckmarkCircle size={25} color="#F8C07E" />
                    Ванных комнат: {bathroomCount}
                </div>
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
};

export default ListingInfo;