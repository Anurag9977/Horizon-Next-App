import { IconType } from "react-icons";
import {
  LuAirVent,
  LuBed,
  LuChefHat,
  LuPalmtree,
  LuParkingCircle,
  LuRefrigerator,
  LuRockingChair,
  LuShowerHead,
  LuUtensils,
  LuWaves,
  LuWifi,
} from "react-icons/lu";
import {
  TbShoppingBag,
  TbFlame,
  TbWashDry3,
  TbBath,
  TbFirstAidKit,
  TbPicnicTable,
  TbSquareRoundedCheck,
  TbSolarPanel,
  TbDroplet,
  TbCampfire,
} from "react-icons/tb";

export type Amenity = {
  label: string;
  icon: IconType;
  selected: boolean;
};

export const amenities: Amenity[] = [
  { label: "parking", icon: LuParkingCircle, selected: false },
  { label: "fire pit", icon: TbCampfire, selected: false },
  { label: "wifi", icon: LuWifi, selected: false },
  {
    label: "outdoor furniture",
    icon: LuRockingChair,
    selected: false,
  },
  { label: "private bathroom", icon: TbBath, selected: false },
  { label: "hot shower", icon: LuShowerHead, selected: false },
  { label: "kitchenette", icon: LuChefHat, selected: false },
  { label: "heating", icon: LuWaves, selected: false },
  { label: "air conditioning", icon: LuAirVent, selected: false },
  { label: "bed linens", icon: LuBed, selected: false },
  { label: "laundry", icon: TbWashDry3, selected: false },
  { label: "picnic table", icon: TbPicnicTable, selected: false },
  { label: "hammock", icon: LuPalmtree, selected: false },
  { label: "solar power", icon: TbSolarPanel, selected: false },
  { label: "water supply", icon: TbDroplet, selected: false },
  { label: "cooking utensils", icon: LuUtensils, selected: false },
  { label: "groceries", icon: TbShoppingBag, selected: false },
  { label: "refridgerator", icon: LuRefrigerator, selected: false },
  { label: "lanterns", icon: TbFlame, selected: false },
  { label: "first aid kit", icon: TbFirstAidKit, selected: false },
];

export function getAmenityIcon(amenityName: string): IconType {
  const amenity = amenities.find((item) => item.label === amenityName);
  return amenity?.icon || TbSquareRoundedCheck;
}
