import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PropertiesClient from "@/app/properties/PropertiesClient";
import getListings from "@/app/actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Вы не авторизированы"
                    subtitle="Пожалуйста, авторизируйтесь!"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({ userId: currentUser.id });
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Объявлений не найдено"
                    subtitle="Похоже, что у вас нет жилья на бронирование"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;