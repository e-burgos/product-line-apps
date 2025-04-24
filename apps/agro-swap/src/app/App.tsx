import { Route, Routes } from "react-router-dom";
import Layout from "@/app/layouts/layout";
import NotFoundPage from "./pages/not-found";
import SwapPage from "./pages/swap";
import { routePaths } from "./router/routes";
import HomePage from "./pages/home";
import NotificationPage from "./pages/notifications";
import AuthorProfilePage from "./pages/profile";
import ProposalsPage from "./pages/proposals";
import CreateProposalPage from "./pages/create-proposals";
import LiquidityPage from "./pages/liquidity";
import LiquidityPositionPage from "./pages/liquidity-position";
import VotePage from "./pages/vote";
import ForgetPasswordPage from "./pages/authentication/forget-password";
import SignUpPage from "./pages/authentication/sign-up";
import SignInPage from "./pages/authentication/sign-in";
import ResetPinPage from "./pages/authentication/reset-pin";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.swap} element={<SwapPage />} />
        <Route path={routePaths.notification} element={<NotificationPage />} />
        <Route path={routePaths.profile} element={<AuthorProfilePage />} />
        <Route path={routePaths.proposals} element={<ProposalsPage />} />
        <Route
          path={routePaths.createProposals}
          element={<CreateProposalPage />}
        />
        <Route path={routePaths.liquidity} element={<LiquidityPage />} />
        <Route
          path={routePaths.liquidityPosition}
          element={<LiquidityPositionPage />}
        />
        <Route path={routePaths.vote} element={<VotePage />} />
        <Route path={routePaths.resetPin} element={<ResetPinPage />} />
        <Route path={routePaths.signIn} element={<SignInPage />} />
        <Route path={routePaths.signUp} element={<SignUpPage />} />
        <Route
          path={routePaths.forgetPassword}
          element={<ForgetPasswordPage />}
        />
        <Route path={routePaths.notFound} element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
