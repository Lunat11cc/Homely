import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        let request;
        let successMessage;

        if (hasFavorited) {
            request = () => axios.delete(`/api/favorites/${listingId}`);
            successMessage = 'Вы убрали из избранного!';
        } else {
            request = () => axios.post(`/api/favorites/${listingId}`);
            successMessage = 'Вы добавили в избранное!';
        }

        toast.promise(
            request().then(() => {
                router.refresh();
            }),
            {
                loading: 'Обновление избранного...',
                success: successMessage,
                error: 'Что-то пошло не так'
            }
        );
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
