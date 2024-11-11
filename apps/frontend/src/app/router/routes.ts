export const routePaths: Record<string, string> = {
  home: '/',
  swap: '/swap',
  notFound: '*',
  notification: '/notification',
  profile: '/profile',
  liquidity: '/liquidity',
  liquidityPosition: '/liquidity/liquidity-position',
  proposals: '/proposals',
  createProposals: '/proposals/create-proposals',
  vote: '/vote',
  forgetPassword: '/forget-password',
  resetPin: '/reset-pin',
  signIn: '/sign-in',
  signUp: '/sign-up',
};

export const routeLabels = {
  home: 'Home',
  swap: 'Swap',
  notification: 'Notification',
  profile: 'Profile',
  liquidity: 'Liquidity',
  liquidityPosition: 'Liquidity Position',
  proposals: 'Proposals',
  createProposals: 'Create Proposals',
  vote: 'Vote',
  forgetPassword: 'Forget Password',
  resetPin: 'Reset Pin',
  signIn: 'Sign In',
  signUp: 'Sign Up',
};

export const routes = [
  {
    label: routeLabels.home,
    path: routePaths.home,
    isPublic: true,
  },
  {
    label: routeLabels.swap,
    path: routePaths.swap,
    isPublic: true,
  },
  {
    label: routeLabels.notification,
    path: routePaths.notification,
    isPublic: true,
  },
  {
    label: routeLabels.profile,
    path: routePaths.profile,
    isPublic: true,
  },
  {
    label: routeLabels.liquidity,
    path: routePaths.liquidity,
    isPublic: true,
  },
  {
    label: routeLabels.liquidityPosition,
    path: routePaths.liquidityPosition,
    isPublic: true,
  },
  {
    label: routeLabels.proposals,
    path: routePaths.proposals,
    isPublic: true,
  },
  {
    label: routeLabels.createProposals,
    path: routePaths.createProposals,
    isPublic: true,
  },
  {
    label: routeLabels.vote,
    path: routePaths.vote,
    isPublic: true,
  },
  {
    label: routeLabels.forgetPassword,
    path: routePaths.forgetPassword,
    isPublic: true,
  },
  {
    label: routeLabels.resetPin,
    path: routePaths.resetPin,
    isPublic: true,
  },
  {
    label: routeLabels.signIn,
    path: routePaths.signIn,
    isPublic: true,
  },
  {
    label: routeLabels.signUp,
    path: routePaths.signUp,
    isPublic: true,
  },
];
