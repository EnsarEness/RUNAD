"use client";

import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { monadTestnet } from "@/lib/chain";

export function useWallet() {
  const { address, isConnected, isConnecting, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  const isCorrectChain = chain?.id === monadTestnet.id;

  function truncateAddress(addr?: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return {
    address,
    isConnected,
    isConnecting,
    chain,
    isCorrectChain,
    balance: balance
      ? {
          formatted: parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4),
          symbol: balance.symbol,
          raw: balance.value,
        }
      : null,
    displayAddress: truncateAddress(address),
  };
}
