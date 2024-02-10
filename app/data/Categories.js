import { TbBeach, TbPool } from "react-icons/tb";
import {
    GiBoatFishing,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: 'Пляж',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Модерн',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Бассейны',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Острова',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Озера',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Лыжи',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Горы',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Кемпинг',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Люкс',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    }
]
