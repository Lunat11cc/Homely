import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";
import HomeButton from "@/app/components/HomeButton";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Вы не авторизированы"
                    subtitle="Пожалуйста, авторизируйтесь"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <HomeButton
                    title="Поездок не найдено"
                    subtitle="Похоже, что вы не забронировали ни одной поездки"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default TripsPage;