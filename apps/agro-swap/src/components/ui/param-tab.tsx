import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from "@/components/ui/tab";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useClickAway } from "@/hooks/use-click-away";
import TabSelect from "./tab-select";

interface TabMenuItem {
  title: React.ReactNode;
  path: string;
}

interface ParamTabTypes {
  tabMenu: TabMenuItem[];
  children: React.ReactNode;
  tabListClassName?: string;
}

export { TabPanel };

export default function ParamTab({
  tabMenu,
  children,
  tabListClassName,
}: ParamTabTypes) {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("view");
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const dropdownEl = useRef<HTMLDivElement>(null);
  let [selectedTabIndex, setSelectedTabIndex] = useState(0);
  let [_visibleMobileMenu, setVisibleMobileMenu] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function handleTabChange(index: number) {
    router(pathname + "?" + createQueryString("view", tabMenu[index].path), {
      replace: true,
    });
  }

  useEffect(() => {
    if (query)
      setSelectedTabIndex(tabMenu.findIndex((item) => query === item.path));
  }, [query]);

  useClickAway(dropdownEl, () => {
    setVisibleMobileMenu(false);
  });

  return (
    <TabGroup
      selectedIndex={selectedTabIndex}
      onChange={(index: any) => handleTabChange(index)}
    >
      <TabList
        className={cn(
          "relative mb-6 bg-body text-sm uppercase before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-sm before:bg-gray-200 dark:bg-dark dark:before:bg-gray-800 sm:gap-8 sm:rounded-none md:before:h-0.5",
          tabListClassName
        )}
      >
        {isMounted && ["xs", "sm"].indexOf(breakpoint) !== -1 ? (
          <TabSelect tabMenu={tabMenu} selectedTabIndex={selectedTabIndex} />
        ) : (
          <div className="flex gap-6 md:gap-8 xl:gap-10 3xl:gap-12">
            {tabMenu.map((item) => (
              <TabItem tabItemLayoutId="activeTabIndicator-two" key={item.path}>
                {item.title}
              </TabItem>
            ))}
          </div>
        )}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
}
