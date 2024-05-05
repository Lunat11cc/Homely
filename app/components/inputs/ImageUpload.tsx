import React, { useCallback, useRef } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import ImageUploadModal from "@/app/components/modals/ImageUploadModal";

interface ImageUploadProps {
    onChange: (value: string[]) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const fileInputRefs = useRef<HTMLInputElement[]>([]);

    const handleUpload = useCallback((index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: string[] = [];
            const promises = Array.from(files).map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const imageDataUrl = reader.result as string;
                        newImages.push(imageDataUrl);
                        resolve(imageDataUrl);
                    };
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(promises).then(() => {
                const updatedImages = [...value];
                updatedImages[index] = newImages[0];
                onChange(updatedImages);
            });
        }
    }, [onChange, value]);

    const handleDelete = useCallback((index: number) => {
        const newImages = [...value];
        newImages.splice(index, 1);
        onChange(newImages);
    }, [onChange, value]);

    const handleEdit = useCallback((index: number) => {
        fileInputRefs.current[index].click();
    }, []);

    return (
        <div>
            {value.length === 0 ? (
                <div
                    className="
                        relative
                        cursor-pointer
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                    "
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleUpload(0, event)}
                        className="hidden"
                        id="file-input"
                        ref={(input) => fileInputRefs.current[0] = input as HTMLInputElement}
                    />
                    <label htmlFor="file-input" className="hover:opacity-70">
                        <TbPhotoPlus size={40}/>
                        <div className="font-semibold text-lg">Загрузить фото обложки</div>
                    </label>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {value.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={`
                                relative
                                cursor-pointer
                                transition
                                border-dashed
                                border-2
                                p-20
                                border-neutral-300
                                flex
                                flex-col
                                justify-center
                                items-center
                                text-neutral-600
                                ${index === 0 ? 'w-full h-72' : 'w-[227px] h-32'} 
                            `}
                        >
                            <div className="absolute w-full h-full">
                                <Image src={imageUrl} alt="Загрузка" layout="fill" objectFit="cover"/>
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-1">
                                <ImageUploadModal onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)}/>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleUpload(index, event)}
                                className="hidden"
                                ref={(input) => fileInputRefs.current[index] = input as HTMLInputElement}
                            />
                        </div>
                    ))}
                    {[...Array(Math.max(0, 4 - value.length))].map((_, index) => (
                        <div
                            key={index}
                            className="
                                relative
                                cursor-pointer
                                transition
                                border-dashed
                                border-2
                                p-20
                                border-neutral-300
                                flex
                                flex-col
                                justify-center
                                items-center
                                gap-4
                                text-neutral-600
                                w-[227px]
                                h-32
                            "
                        >
                            <label htmlFor={`file-input-${index}`} className="hover:opacity-70 cursor-pointer">
                                <TbPhotoPlus size={40}/>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleUpload(value.length + index, event)}
                                className="hidden"
                                id={`file-input-${index}`}
                                ref={(input) => fileInputRefs.current[value.length + index] = input as HTMLInputElement}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
