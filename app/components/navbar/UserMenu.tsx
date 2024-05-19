'use client';

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
        } else {
            rentModal.onOpen();
            closeMenu();
        }
    }, [currentUser, loginModal, rentModal, closeMenu]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar size={30} src={currentUser?.image}/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        router.push('/')
                                        closeMenu()
                                    }}
                                    label="Главная"
                                    className="md:hidden block"
                                />
                                <hr className="md:hidden" />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/trips')
                                        closeMenu()
                                    }}
                                    label="Поездки"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/favorites')
                                        closeMenu()
                                    }}
                                    label="Избранное"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => {
                                        onRent()
                                        closeMenu()
                                    }}
                                    label="Сдать жилье"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/properties')
                                        closeMenu()
                                    }}
                                    label="Мое жилье"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/reservations')
                                        closeMenu()
                                    }}
                                    label="Бронирования"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Выйти"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Вход"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Регистрация"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;