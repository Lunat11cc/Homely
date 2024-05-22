import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListing from "@/app/actions/getFavoriteListings";
import FavoritesClient from "@/app/favorites/FavoritesClient";
import HomeButton from "@/app/components/HomeButton";

const ListingPage = async () => {
    const listings = await getFavoriteListing();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <HomeButton
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
