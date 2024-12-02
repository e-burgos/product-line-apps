import { FC } from 'react';
import { MonitorCog, ChevronLeftIcon } from 'lucide-react';
import Button from 'libs/ui/src/components/button';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  header: {
    title: string;
    titleIcon?: React.ReactNode;
    headerContent?: React.ReactNode;
    linkToBack?: string;
  };
  variant?: 'card' | 'classic';
  children: React.ReactNode;
  className?: string;
}

const Layout: FC<LayoutProps> = ({
  header,
  className,
  children,
  variant = 'classic',
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col align-middle w-full rounded-lg p-4 sm:p-6 h-full 2xl:px-8 ${
        variant === 'card' ? 'shadow-card dark:bg-light-dark' : ''
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-2">
        <div className="flex items-center gap-2">
          {header?.linkToBack && (
            <Button
              className="w-4"
              size="mini"
              variant="transparent"
              onClick={() => navigate(header.linkToBack as string)}
            >
              <ChevronLeftIcon className="h-6 w-6 " />
            </Button>
          )}
          {header?.titleIcon || <MonitorCog className="h-6 w-6" />}
          <h1 className="text-3xl font-bold">{header.title}</h1>
        </div>
        {header?.headerContent && (
          <div className="flex gap-2">{header.headerContent}</div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
