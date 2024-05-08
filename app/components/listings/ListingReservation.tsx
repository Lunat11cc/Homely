'use client';

import React from 'react';
import { Range } from "react-date-range";
import Calendar from "@/app/components/inputs/Calendar";
import Button from "@/app/components/Button";
import {SafeUser} from "@/app/types";
import Avatar from "@/app/components/Avatar";

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    user: SafeUser;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    user
}) => {
    return (
        <>
            <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                <div className="flex flex-row items-center gap-1 p-4">
                    <div className="text-2xl font-semibold">
                        ₽ {price}
                    </div>
                    <div className="font-light text-neutral-600">
                        ночь
                    </div>
                </div>
                <hr/>
                <Calendar
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) => onChangeDate(value.selection)}
                />
                <hr/>
                <div className="p-4">
                    <Button
                        disabled={disabled}
                        label="Резерв"
                        onClick={onSubmit}
                    />
                </div>
                <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                    <div>
                        Всего
                    </div>
                    <div>
                        ₽ {totalPrice}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <p className="font-bold text-xl mb-8">Вас принимает</p>
                <div
                    className="
                        font-semibold
                        flex
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border-neutral-200
                        border-[1px]
                        w-full
                        h-44
                        shadow-sm
                        transition
                    "
                    >
                    <Avatar size={75} src={user?.image}/>
                    <div className="text-2xl font-bold">{user?.name}</div>
                    <p>Хозяин</p>
                </div>
            </div>

        </>
    );
};

export default ListingReservation;