import {
  CommunityIcon,
  ExploreIcon,
  HomeIcon,
  SearchIcon,
  SquarePenIcon,
  UserRoundIcon,
} from "@/utils/Icons";

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
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
