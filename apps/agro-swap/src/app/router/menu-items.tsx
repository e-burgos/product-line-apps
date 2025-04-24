import { routePaths } from '@/app/router/routes';
import { HomeIcon } from '@/components/icons/home';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { LockIcon } from '@/components/icons/lock-icon';
import { FlashIcon } from '@/components/icons/flash';
// import { DiskIcon } from "@/components/icons/disk";
// import { FarmIcon } from "@/components/icons/farm";
// import { PlusCircle } from "@/components/icons/plus-circle";
// import { CompassIcon } from "@/components/icons/compass";
// import { LivePricing } from "@/components/icons/live-pricing";
// import { TradingBotIcon } from "@/components/icons/trading-bot-icon";

export interface MenuItem {
  name: string;
  icon?: JSX.Element;
  href: string;
  dropdownItems?: MenuItem[];
}

export const defaultMenuItems: MenuItem[] = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routePaths.home,
  },
  // {
  //   name: "Live Pricing",
  //   icon: <LivePricing />,
  //   href: routePaths.livePricing,
  // },
  // {
  //   name: "Trading Bot",
  //   icon: <TradingBotIcon />,
  //   href: routePaths.tradingBot,
  // },
  // {
  //   name: "NFTs",
  //   icon: <CompassIcon />,
  //   href: routePaths.search,
  //   dropdownItems: [
  //     {
  //       name: "Explore NFTs",
  //       icon: <CompassIcon />,
  //       href: routePaths.search,
  //     },
  //     {
  //       name: "Create NFT",
  //       icon: <PlusCircle />,
  //       href: routePaths.createNft,
  //     },
  //     {
  //       name: "NFT Details",
  //       icon: <DiskIcon />,
  //       href: routePaths.nftDetails,
  //     },
  //   ],
  // },
  // {
  //   name: "Farm",
  //   icon: <FarmIcon />,
  //   href: routePaths.farms,
  // },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routePaths.swap,
  },
  {
    name: 'Liquidity',
    icon: <PoolIcon />,
    href: routePaths.liquidity,
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routePaths.profile,
  },
  {
    name: 'Notification',
    icon: <FlashIcon />,
    href: routePaths.notification,
  },
  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routePaths.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routePaths.vote,
      },
      {
        name: 'Vote with Agro Swap',
        href: routePaths.proposals,
      },
      {
        name: 'Create proposal',
        href: routePaths.createProposals,
      },
    ],
  },
  {
    name: 'Authentication',
    icon: <LockIcon className="w-[18px]" />,
    href: routePaths.signIn,
    dropdownItems: [
      {
        name: 'Sign in',
        href: routePaths.signIn,
      },
      {
        name: 'Sign up',
        href: routePaths.signUp,
      },
      {
        name: 'Reset pin',
        href: routePaths.resetPin,
      },
      {
        name: 'Forget password',
        href: routePaths.forgetPassword,
      },
    ],
  },
];

export const MinimalMenuItems: MenuItem[] = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routePaths.home,
  },
  // {
  //   name: "Live Pricing",
  //   icon: <LivePricing />,
  //   href: routePaths.livePricing,
  // },
  // {
  //   name: "Trading Bot",
  //   icon: <TradingBotIcon />,
  //   href: routePaths.tradingBot,
  // },
  // {
  //   name: "NFTs",
  //   icon: <CompassIcon />,
  //   href: routePaths.search,
  //   dropdownItems: [
  //     {
  //       name: "Explore NFTs",
  //       icon: <CompassIcon />,
  //       href: routePaths.search,
  //     },
  //     {
  //       name: "Create NFT",
  //       icon: <PlusCircle />,
  //       href: routePaths.createNft,
  //     },
  //     {
  //       name: "NFT Details",
  //       icon: <DiskIcon />,
  //       href: routePaths.nftDetails,
  //     },
  //   ],
  // },
  // {
  //   name: "Farm",
  //   icon: <FarmIcon />,
  //   href: routePaths.farms,
  // },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routePaths.swap,
  },
  {
    name: 'Pages',
    icon: <VoteIcon />,
    href: '#',
    dropdownItems: [
      {
        name: 'Profile',
        icon: <ProfileIcon />,
        href: routePaths.profile,
      },
      {
        name: 'Liquidity',
        icon: <PoolIcon />,
        href: routePaths.liquidity,
      },
      {
        name: 'Vote',
        icon: <VoteIcon />,
        href: routePaths.vote,
        dropdownItems: [
          {
            name: 'Explore',
            href: routePaths.vote,
          },
          {
            name: 'Vote with agro-swap',
            href: routePaths.proposals,
          },
          {
            name: 'Create proposal',
            href: routePaths.createProposals,
          },
        ],
      },
      {
        name: 'Authentication',
        icon: <LockIcon className="w-[18px]" />,
        href: routePaths.signIn,
        dropdownItems: [
          {
            name: 'Sign in',
            href: routePaths.signIn,
          },
          {
            name: 'Sign up',
            href: routePaths.signUp,
          },
          {
            name: 'Reset pin',
            href: routePaths.resetPin,
          },
          {
            name: 'Forget password',
            href: routePaths.forgetPassword,
          },
        ],
      },
    ],
  },
];
