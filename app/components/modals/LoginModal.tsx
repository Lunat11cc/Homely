'use client';

import { signIn } from "next-auth/react";
import { FaYandex } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Вход');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="С возвращением!"
                subtitle="Пожалуйста, авторизируйтесь"
            />
            <Input
                id="email"
                label="Почта"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Пароль"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Продолжить с помощью Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Продолжить с помощью Яндекс"
                icon={FaYandex}
                onClick={() => signIn('yandex')}
                iconColor="red"
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        Нет аккаунта?
                    </div>
                    <div
                        onClick={() => {
                            loginModal.onClose();
                            registerModal.onOpen();
                        }}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Зарегистрироваться
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Авторизация"
            actionLabel="Продолжить"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;