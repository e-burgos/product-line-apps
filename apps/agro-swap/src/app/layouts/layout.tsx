import { Suspense, useEffect } from "react";
import { QueryClientProvider } from "@/app/config/query-client-provider";
import { BrowserRouter, useLocation } from "react-router-dom";
import WagmiConfig from "@/app/config/wagmi/wagmi-config";
import ModalsContainer from "@/components/modal-views/container";
import DrawersContainer from "@/components/drawer-views/container";
import SettingsButton from "@/components/settings/settings-button";
import SettingsDrawer from "@/components/settings/settings-drawer";
import { LAYOUT_OPTIONS } from "@/themes/config";
import { useTheme } from "@/themes/use-theme";
import MinimalLayout from "@/app/layouts/minimal/layout";
import ClassicLayout from "@/app/layouts/classic/layout";
import RetroLayout from "@/app/layouts/retro/layout";
import ModernLayout from "@/app/layouts/modern/layout";

// base css file
import "overlayscrollbars/overlayscrollbars.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/css/scrollbar.css";
import "@/assets/css/globals.css";
import "@/assets/css/range-slider.css";
import "@/assets/css/fonts.css";
import { routePaths } from "@/app/router/routes";
import AuthLayout from "./authentication/layout";

const LayoutType = ({ children }: React.PropsWithChildren) => {
  const { layout } = useTheme();
  const location = useLocation();
  if (
    location.pathname === routePaths.signIn ||
    location.pathname === routePaths.signUp ||
    location.pathname === routePaths.forgetPassword ||
    location.pathname === routePaths.resetPin
  ) {
    return <AuthLayout>{children}</AuthLayout>;
  }
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalLayout>{children}</MinimalLayout>;
  }
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicLayout>{children}</ClassicLayout>;
  }
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroLayout>{children}</RetroLayout>;
  }
  return <ModernLayout>{children}</ModernLayout>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useTheme();
  const htmlTag = document.documentElement;

  useEffect(() => {
    if (htmlTag) {
      if (mode === "dark") {
        htmlTag.classList.remove("light");
        htmlTag.classList.add("dark");
      } else {
        htmlTag.classList.remove("dark");
        htmlTag.classList.add("light");
      }
    }
  }, [htmlTag, mode]);

  return (
    <BrowserRouter>
      <WagmiConfig>
        <QueryClientProvider>
          <SettingsButton />
          <SettingsDrawer />
          <Suspense fallback={null}>
            <ModalsContainer />
            <DrawersContainer />
          </Suspense>
          <LayoutType>{children}</LayoutType>
        </QueryClientProvider>
      </WagmiConfig>
    </BrowserRouter>
  );
}
