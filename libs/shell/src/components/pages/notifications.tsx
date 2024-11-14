import Button from 'libs/ui/src/components/button';
import NotificationCard, {
  NotificationCardProps,
} from 'libs/ui/src/components/notification-card';
//images
import User1 from 'libs/ui/src/assets/images/avatar/8.jpg';
import User2 from 'libs/ui/src/assets/images/avatar/9.jpg';
import User3 from 'libs/ui/src/assets/images/avatar/10.jpg';
import User4 from 'libs/ui/src/assets/images/avatar/11.jpg';
import User5 from 'libs/ui/src/assets/images/avatar/1.png';
import User6 from 'libs/ui/src/assets/images/avatar/2.png';
import User7 from 'libs/ui/src/assets/images/avatar/3.png';

const notifications = [
  {
    id: 1,
    type: 'followed',
    actor: {
      name: 'dolcemariposa',
      avatar: User1,
    },
    time: 'Just Now',
    url: '#',
    notifier: 'you',
  },
  {
    id: 2,
    type: 'liked',
    actor: {
      name: 'pimptronot',
      avatar: User2,
    },
    time: '10 minutes ago',
    url: '#',
    notifier: 'Cryppo #1491',
  },
  {
    id: 3,
    type: 'purchased',
    actor: {
      name: 'centralgold',
      avatar: User3,
    },
    time: '20 minutes ago',
    url: '#',
    notifier: 'Pepe mfer #16241',
  },
  {
    id: 4,
    type: 'followed',
    actor: {
      name: 'theline',
      avatar: User4,
    },
    time: '30 minutes ago',
    url: '#',
    notifier: 'you',
  },
  {
    id: 5,
    type: 'followed',
    actor: {
      name: 'daniel',
      avatar: User5,
    },
    time: '30 minutes ago',
    url: '#',
    notifier: 'you',
  },
  {
    id: 6,
    type: 'followed',
    actor: {
      name: 'andrea',
      avatar: User6,
    },
    time: '30 minutes ago',
    url: '#',
    notifier: 'you',
  },
  {
    id: 7,
    type: 'followed',
    actor: {
      name: 'piacquadio',
      avatar: User7,
    },
    time: '30 minutes ago',
    url: '#',
    notifier: 'you',
  },
];

export const NotificationPage = () => {
  return (
    <div className="mx-auto w-[660px] max-w-full">
      <div className="mb-7 flex items-center justify-between gap-6">
        <h2 className="text-center text-lg font-medium text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
          Notifications
        </h2>
        <Button color="white" variant="transparent" size="mini" shape="rounded">
          <span className="text-xs tracking-tighter">Mark all as read</span>
        </Button>
      </div>

      {notifications.map((notification) => {
        const notificationItem = notification as NotificationCardProps;
        return <NotificationCard key={notification.id} {...notificationItem} />;
      })}
    </div>
  );
};

export default NotificationPage;
