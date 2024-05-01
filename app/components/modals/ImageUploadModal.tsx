import React, { useCallback, useState } from "react";
import MenuItem from "@/app/components/navbar/MenuItem";

interface ImageUploadModalProps {
    onDelete: () => void;
    onEdit: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center justify-center">
                <div
                    onClick={toggleOpen}
                    className="
                        relative
                        h-8
                        w-8
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                        text-black
                        text-2xl
                        bg-white
                        opacity-80
                        hover:opacity-100
                    "
                >
                    <div className="absolute top-[-5px] left-[7.5px]">
                        ...
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-md
                            bg-white
                            text-black
                            overflow-hidden
                            right-0
                            top-[40px]
                            text-sm
                            min-w-[150px]
                            z-50
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                            <MenuItem onClick={onEdit} label="Редактировать" />
                            <hr />
                            <MenuItem onClick={onDelete} label="Удалить" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadModal;