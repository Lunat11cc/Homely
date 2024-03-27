import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListing from "@/app/actions/getFavoriteListings";
import FavoritesClient from "@/app/favorites/FavoritesClient";

const ListingPage = async () => {
    const listings = await getFavoriteListing();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="У вас нет избранных объявлений"
                    subtitle="Похоже, что вы не добавили никаких объявлений в избранное"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;