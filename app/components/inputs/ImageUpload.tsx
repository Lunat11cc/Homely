import React, { useCallback } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import ImageUploadModal from "@/app/components/modals/ImageUploadModal";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                onChange(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange]);

    const handleDelete = useCallback(() => {
        onChange("");
    }, [onChange]);

    const handleEdit = useCallback(() => {
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        fileInput.click();
    }, []);

    return (
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
                onChange={handleUpload}
                className="hidden"
                id="file-input"
            />
            <label htmlFor="file-input" className="hover:opacity-70">
                <TbPhotoPlus size={40} />
                <div className="font-semibold text-lg">Нажмите, чтобы загрузить</div>
            </label>
            {value && (
                <>
                    <div className="absolute inset-0 w-full h-full">
                        <Image src={value} alt="Загрузка" layout="fill" objectFit="cover" />
                    </div>
                    <div
                        className="absolute top-2 right-2 px-2 py-1">
                        <ImageUploadModal onDelete={handleDelete} onEdit={handleEdit} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageUpload;
