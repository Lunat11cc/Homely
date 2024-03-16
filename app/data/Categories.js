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
        description: 'Это место находится недалеко от пляжа!',
    },
    {
        label: 'Модерн',
        icon: MdOutlineVilla,
        description: 'Это современное место!'
    },
    {
        label: 'Бассейны',
        icon: TbPool,
        description: 'В этом месте есть прекрасный бассейн!'
    },
    {
        label: 'Острова',
        icon: GiIsland,
        description: 'Это место находится на острове!'
    },
    {
        label: 'Озера',
        icon: GiBoatFishing,
        description: 'Это место находится рядом с озером!'
    },
    {
        label: 'Лыжи',
        icon: FaSkiing,
        description: 'В этом месте можно заняться лыжным спортом!'
    },
    {
        label: 'Горы',
        icon: GiCaveEntrance,
        description: 'Это место находится возле красивых гор!'
    },
    {
        label: 'Кемпинг',
        icon: GiForestCamp,
        description: 'В этом месте можно заняться кемпингом!'
    },
    {
        label: 'Люкс',
        icon: IoDiamond,
        description: 'Это место роскошное и новое!'
    }
]
