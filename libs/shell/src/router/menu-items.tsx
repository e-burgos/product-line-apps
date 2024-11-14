import { FlashIcon, LockIcon, ProfileIcon } from 'libs/ui/src/components';
import { commonRouteLabels, commonRoutePaths } from './routes';
import { IMenuItem } from 'libs/ui/src/types';
import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  ForgetPasswordPage,
  NotificationPage,
  ResetPinPage,
} from '../components';

export const commonMenuItems: IMenuItem[] = [
  {
    name: commonRouteLabels.profile,
    icon: <ProfileIcon />,
    href: commonRoutePaths.profile,
    hide: true,
    component: <ProfilePage />,
  },
  {
    name: commonRouteLabels.notification,
    icon: <FlashIcon />,
    href: commonRoutePaths.notification,
    hide: true,
    component: <NotificationPage />,
  },
  {
    name: commonRouteLabels.auth,
    icon: <LockIcon className="w-[18px]" />,
    href: commonRoutePaths.signIn,
    hide: true,
    dropdownItems: [
      {
        name: commonRouteLabels.signIn,
        href: commonRoutePaths.signIn,
        component: (
          <SignInPage
            signUpPath={commonRoutePaths.signUp}
            forgetPasswordPath={commonRoutePaths.forgetPassword}
          />
        ),
      },
      {
        name: commonRouteLabels.signUp,
        href: commonRoutePaths.signUp,
        component: <SignUpPage signInPath={commonRoutePaths.signIn} />,
      },
      {
        name: commonRouteLabels.resetPin,
        href: commonRoutePaths.resetPin,
        component: <ResetPinPage signInPath={commonRoutePaths.signIn} />,
      },
      {
        name: commonRouteLabels.forgetPassword,
        href: commonRoutePaths.forgetPassword,
        component: (
          <ForgetPasswordPage resetPinPath={commonRoutePaths.resetPin} />
        ),
      },
    ],
  },
];
