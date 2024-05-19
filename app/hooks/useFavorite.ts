import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
// @ts-ignore
import { SafeUser } from "@/app/types";
// @ts-ignore
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

        try {
            let request;
            let message;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
                message = 'Вы убрали из избранного!'
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
                message = 'Вы добавили в избранное!'
            }

            await request();
            router.refresh();
            toast.success(message);
        } catch (error) {
            toast.error('Что-то пошло не так')
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;