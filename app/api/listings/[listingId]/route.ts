import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Неверный ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Неверный ID');
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId,
        },
    });

    if (!listing) {
        return NextResponse.error();
    }

    return NextResponse.json(listing);
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
        convenience,
        special,
        safety
    } = body;

    const { listingId } = params

    const listing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            title,
            description,
            imageSrc,
            category,
            convenience,
            special,
            safety,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}
