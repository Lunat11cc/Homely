'use client';

import axios from "axios";
import { FaYandex } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {useCallback, useState} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
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
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Успешно!')
                registerModal.onClose();
                loginModal.onOpen();
            }).catch((error) => {
                toast.error('Что-то пошло не так!');
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
       <div className="flex flex-col gap-4">
           <Heading
               title="Добро пожаловать в Homely!"
               subtitle="Пожалуйста, зарегистрируйтесь"
           />
           <Input
               id="name"
               label="Имя"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
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
                        Уже есть аккаунт?
                    </div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Войти
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Регистрация"
            actionLabel="Продолжить"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;