import { PiTelevisionSimpleBold, PiCarProfileFill } from "react-icons/pi";
import { TbAirConditioningDisabled, TbToolsKitchen3 } from "react-icons/tb";
import { IoIosWifi } from "react-icons/io";
import { LuParkingCircle } from "react-icons/lu";

export const conveniences = [
    {
        label: 'Wi-Fi',
        icon: IoIosWifi,
    },
    {
        label: 'Телевизор',
        icon: PiTelevisionSimpleBold,
    },
    {
        label: 'Кухня',
        icon: TbToolsKitchen3,
    },
    {
        label: 'Платная парковка',
        icon: LuParkingCircle,
    },
    {
        label: 'Бесплатная парковка',
        icon: PiCarProfileFill,
    },
    {
        label: 'Кондиционер',
        icon: TbAirConditioningDisabled,
    }
]
