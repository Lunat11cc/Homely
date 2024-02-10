import { create } from "zustand";

interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const UseRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default UseRentModal;