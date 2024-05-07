'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/data/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";
import {IconType} from "react-icons";
import {conveniences} from "@/app/data/Conveniences";
import {specials} from "@/app/data/Specials";
import {safeties} from "@/app/data/Safety";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Объявление забронировано!');
            setDateRange(initialDateRange);
            router.push('/trips');
        })
        .catch(() => {
            toast.error('Что-то пошло не так');
        })
            .finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const findConvenience = (label: string) => conveniences.find(convenience => convenience.label === label);

    const matchedConveniences = listing.convenience.map(label => {
        const convenience = findConvenience(label);
        if (convenience) {
            return {
                label: label,
                icon: convenience.icon
            };
        }
        return null;
    }).filter(convenience => convenience !== null) as { label: string; icon: IconType; }[];

    const findSpecial = (label: string) => specials.find(special => special.label === label);

    const matchedSpecials = listing.special.map(label => {
        const special = findSpecial(label);
        if (special) {
            return {
                label: label,
                icon: special.icon
            };
        }
        return null;
    }).filter(special => special !== null) as { label: string; icon: IconType; }[];

    const findSafety = (label: string) => safeties.find(safety => safety.label === label);

    const matchedSafeties = listing.safety.map(label => {
        const safety = findSafety(label);
        if (safety) {
            return {
                label: label,
                icon: safety.icon
            };
        }
        return null;
    }).filter(safety => safety !== null) as { label: string; icon: IconType; }[];

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                        category={category}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            description={listing.description}
                            locationValue={listing.locationValue}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            convenience={matchedConveniences}
                            special={matchedSpecials}
                            safety={matchedSafeties}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;