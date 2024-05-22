'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/components/modals/Modal';
import axios from 'axios';
import Heading from '@/app/components/Heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CountrySelect from '@/app/components/inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '@/app/components/inputs/Counter';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { categories } from '@/app/data/Categories';
import { conveniences } from '@/app/data/Conveniences';
import { specials } from '@/app/data/Specials';
import { safeties } from '@/app/data/Safety';
import ConvenienceInput from '@/app/components/inputs/ConvenienceInput';
import SpecialInput from '@/app/components/inputs/SpecialInput';
import SafetyInput from '@/app/components/inputs/SafetyInput';
import useCountries from "@/app/hooks/useCountries";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    CONVENIENCE = 4,
    DESCRIPTION = 5,
    PRICE = 6
}

interface UpdateRentModalProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: string;
}

const UpdateRentModal: React.FC<UpdateRentModalProps> = ({ isOpen, onClose, listingId }) => {
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState<any>(null);
    const [selectedConveniences, setSelectedConveniences] = useState<string[]>([]);
    const [selectedSpecials, setSelectedSpecials] = useState<string[]>([]);
    const [selectedSafeties, setSelectedSafeties] = useState<string[]>([]);
    const { getByValue } = useCountries();

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            convenience: '',
            special: '',
            safety: '',
            price: 0,
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        if (isOpen) {
            axios.get(`/api/listings/${listingId}`).then(response => {
                const data = response.data;
                setListingData(data);
                const location = getByValue(data.locationValue);
                reset({
                    category: data.category,
                    location: location,
                    guestCount: data.guestCount,
                    roomCount: data.roomCount,
                    bathroomCount: data.bathroomCount,
                    imageSrc: data.imageSrc,
                    price: data.price,
                    title: data.title,
                    description: data.description
                });
                setSelectedConveniences(data.convenience || []);
                setSelectedSpecials(data.special || []);
                setSelectedSafeties(data.safety || []);
            }).catch(error => {
                toast.error('Не удалось загрузить данные объявления');
            });
        }
    }, []);

    const handleConvenienceSelection = (label: string) => {
        setSelectedConveniences(prevState => {
            const isSelected = prevState.includes(label);
            return isSelected ? prevState.filter(item => item !== label) : [...prevState, label];
        });
    };

    const handleSpecialSelection = (label: string) => {
        setSelectedSpecials(prevState => {
            const isSelected = prevState.includes(label);
            return isSelected ? prevState.filter(item => item !== label) : [...prevState, label];
        });
    };

    const handleSafetySelection = (label: string) => {
        setSelectedSafeties(prevState => {
            const isSelected = prevState.includes(label);
            return isSelected ? prevState.filter(item => item !== label) : [...prevState, label];
        });
    };

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false
    }), []);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        const formData = {
            ...data,
            convenience: selectedConveniences,
            special: selectedSpecials,
            safety: selectedSafeties
        };

        toast.promise(
            axios.post(`/api/listings/${listingId}`, formData)
                .then(() => {
                    router.refresh();
                    reset();
                    setStep(STEPS.CATEGORY);
                    onClose();
                }),
            {
                loading: 'Обновление объявления...',
                success: 'Объявление обновлено!',
                error: 'Что-то пошло не так!'
            }
        ).finally(() => {
            setIsLoading(false);
        });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Обновить';
        }

        return 'Далее';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Назад';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Что из этого лучше описывает ваше место?"
                subtitle="Выберите категорию"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Где расположено ваше место?"
                    subtitle="Помогите гостям найти вас!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Расскажите немного о своем месте"
                    subtitle="Какими удобствами вы располагаете?"
                />
                <Counter
                    title="Количество гостей"
                    subtitle="Сколько вы принимаете гостей?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Комнаты"
                    subtitle="Сколько у вас комнат?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Ванные комнаты"
                    subtitle="Сколько у вас ванных комнат?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Добавьте фото вашего места"
                    subtitle="Покажите гостям, как выглядит ваше место!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        );
    }

    if (step === STEPS.CONVENIENCE) {
        bodyContent = (
            <div className="overflow-scroll overflow-x-hidden max-h-[60vh]">
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Какие удобства у вас есть?"
                        subtitle="Расскажите гостям о своих удобствах!"
                    />
                    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        {conveniences.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <ConvenienceInput
                                    onClick={(convenience) => handleConvenienceSelection(convenience)}
                                    selected={selectedConveniences.includes(item.label)}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <Heading
                        title="Есть ли у вас что-то особенное?"
                    />
                    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        {specials.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <SpecialInput
                                    onClick={(special) => handleSpecialSelection(special)}
                                    selected={selectedSpecials.includes(item.label)}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <Heading
                        title="Отметьте средства безопасности"
                    />
                    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        {safeties.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <SafetyInput
                                    onClick={(safety) => handleSafetySelection(safety)}
                                    selected={selectedSafeties.includes(item.label)}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Как вы опишите свое место?"
                    subtitle="Опишите коротко и ясно!"
                />
                <Input
                    id="title"
                    label="Название"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={{
                        value: true,
                        message: 'Обязательно для заполнения!'
                    }}
                />
                <hr />
                <Input
                    id="description"
                    label="Описание"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={{
                        value: true,
                        message: 'Обязательно для заполнения!'
                    }}
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Назовите свою цену"
                    subtitle="Сколько вы берете за 1 ночь?"
                />
                <Input
                    id="price"
                    label="Цена"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={{
                        value: true,
                        message: 'Обязательно для заполнения!'
                    }}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Редактирование объявления"
            body={bodyContent}
        />
    );
};

export default UpdateRentModal;