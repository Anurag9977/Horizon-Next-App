import { IconType } from "react-icons";
import { LuContainer, LuCrown, LuShip, LuSparkles } from "react-icons/lu";
import {
  TbCaravan,
  TbTent,
  TbWindmill,
  TbBuildingCottage,
} from "react-icons/tb";
import {
  HiOutlineBuildingLibrary,
  HiOutlineBuildingOffice,
  HiOutlineBuildingStorefront,
  HiOutlineHomeModern,
} from "react-icons/hi2";

export type CategoryLabel =
  | "apartment"
  | "luxury"
  | "cabin"
  | "tent"
  | "windmill"
  | "cottage"
  | "container"
  | "caravan"
  | "cruise"
  | "magic"
  | "barn"
  | "lodge";

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export const categories: Category[] = [
  {
    label: "apartment",
    icon: HiOutlineBuildingOffice,
  },
  {
    label: "luxury",
    icon: LuCrown,
  },
  {
    label: "cabin",
    icon: HiOutlineBuildingStorefront,
  },
  {
    label: "tent",
    icon: TbTent,
  },
  {
    label: "windmill",
    icon: TbWindmill,
  },
  {
    label: "cottage",
    icon: HiOutlineHomeModern,
  },
  {
    label: "container",
    icon: LuContainer,
  },
  {
    label: "caravan",
    icon: TbCaravan,
  },
  {
    label: "cruise",
    icon: LuShip,
  },
  {
    label: "magic",
    icon: LuSparkles,
  },
  {
    label: "barn",
    icon: TbBuildingCottage,
  },
  {
    label: "lodge",
    icon: HiOutlineBuildingLibrary,
  },
];
