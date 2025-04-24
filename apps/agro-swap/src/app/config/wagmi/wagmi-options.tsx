import * as React from "react";
import { ChevronForward } from "@/components/icons/chevron-forward";
import { MenuItem } from "@headlessui/react";
import Image from "@/components/ui/image";
import metamaskLogo from "@/assets/images/metamask.svg";
import walletconnectLogo from "@/assets/images/walletconnect-logo.png";
import { Connector, useConnect } from "wagmi";

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  const switchConnectorLogo = () => {
    switch (connector.name) {
      case "MetaMask":
        return (
          <span className="h-auto w-9">
            <Image
              src={metamaskLogo}
              alt="metamask"
              className="h-8 w-8 rounded-full border-2 border-solid border-white dark:border-gray-700"
            />
          </span>
        );
      case "WalletConnect":
        return (
          <span className="h-auto w-9">
            <Image
              src={walletconnectLogo}
              alt="walletconnect"
              className="h-8 w-8 rounded-full border-2 border-solid border-white  dark:border-gray-700"
            />
          </span>
        );
      default:
        return (
          <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
        );
    }
  };

  return (
    <MenuItem>
      <div className=" p-1 dark:border-gray-700">
        <button
          disabled={!ready}
          onClick={onClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
        >
          {switchConnectorLogo()}
          <span className="grow uppercase">{connector.name}</span>
          <ChevronForward />
        </button>
      </div>
    </MenuItem>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  return connectors.map((connector) => {
    if (connector.id === "metaMaskSDK") return;
    return (
      <WalletOption
        key={connector.uid}
        connector={connector}
        onClick={() => connect({ connector })}
      />
    );
  });
}
