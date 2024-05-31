import {
  CommunityIcon,
  ExploreIcon,
  HomeIcon,
  SearchIcon,
  SquarePenIcon,
  UserRoundIcon,
} from "@/utils/Icons";
import { GalleryVerticalEnd, Tags, TextQuote, Users } from "lucide-react";

export const sidebarItems = [
  {
    icon: <HomeIcon />,
    route: "/",
    label: "Home",
  },
  {
    icon: <SearchIcon />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <ExploreIcon />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <SquarePenIcon />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <CommunityIcon />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <UserRoundIcon />,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: <GalleryVerticalEnd size={14} /> },
  { value: "replies", label: "Replies", icon: <TextQuote size={16} /> },
  { value: "tagged", label: "Tagged", icon: <Tags size={16} /> },
];

export const communityTabs = [
  { value: "posts", label: "Posts", icon: <GalleryVerticalEnd size={16} /> },
  { value: "members", label: "Members", icon: <TextQuote size={16} /> },
  { value: "requests", label: "Requests", icon: <Users size={16} /> },
];
