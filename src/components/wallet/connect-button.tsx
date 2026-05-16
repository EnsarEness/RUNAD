"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { useState } from "react";
import {
  ChevronDown,
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
  Check,
  Loader2,
} from "lucide-react";
import { formatUnits } from "viem";
import { GlassCard } from "@/components/runad/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { monadTestnet } from "@/lib/chain";

type ConnectButtonProps = {
  variant?: "default" | "hero" | "compact";
  className?: string;
};

export function ConnectButton({
  variant = "default",
  className,
}: ConnectButtonProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  function truncateAddress(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  const formattedBalance = balance
    ? parseFloat(formatUnits(balance.value, balance.decimals))
    : 0;

  function copyAddress() {
    if (address) {
      navigator.clipboard?.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleConnect() {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  }

  // Not connected — show connect button
  if (!isConnected) {
    if (variant === "hero") {
      return (
        <button
          type="button"
          onClick={handleConnect}
          disabled={isPending}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-sm font-medium text-foreground backdrop-blur transition-all hover:border-primary/30 hover:bg-white/10 active:scale-[0.97] disabled:opacity-50",
            className
          )}
        >
          {isPending ? (
            <Loader2 className="size-4 text-primary animate-spin" />
          ) : (
            <Wallet className="size-4 text-primary" />
          )}
          {isPending ? "Connecting..." : "Connect Wallet"}
        </button>
      );
    }

    if (variant === "compact") {
      return (
        <button
          type="button"
          onClick={handleConnect}
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl bg-primary/15 px-3 py-2 text-xs font-medium text-primary transition-all hover:bg-primary/25 active:scale-[0.97] disabled:opacity-50",
            className
          )}
        >
          {isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Wallet className="size-3.5" />
          )}
          {isPending ? "..." : "Connect"}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleConnect}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground neon-glow transition-all hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50",
          className
        )}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Wallet className="size-4" />
        )}
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  // Connected — show wallet info
  const isCorrectChain = chain?.id === monadTestnet.id;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium backdrop-blur transition-all hover:bg-white/10 hover:border-primary/20",
          className
        )}
      >
        {/* Status dot */}
        <span
          className={cn(
            "size-2 rounded-full",
            isCorrectChain ? "bg-emerald-400" : "bg-amber-400"
          )}
        />
        <span className="font-mono text-xs">
          {truncateAddress(address!)}
        </span>
        {balance && (
          <Badge className="border-0 bg-primary/15 text-[9px] text-primary ml-1">
            {formattedBalance.toFixed(3)} {balance.symbol}
          </Badge>
        )}
        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform",
            showMenu && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-64">
            <GlassCard strong className="overflow-hidden p-0">
              {/* Header */}
              <div className="border-b border-white/[0.06] p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
                    <Wallet className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-mono text-xs">
                      {truncateAddress(address!)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {isCorrectChain ? "Monad Testnet" : chain?.name ?? "Wrong Network"}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      isCorrectChain
                        ? "bg-emerald-400"
                        : "bg-amber-400 animate-pulse"
                    )}
                  />
                </div>
                {balance && (
                  <div className="mt-3 rounded-lg bg-white/[0.04] p-2.5 text-center">
                    <p className="text-lg font-bold tabular-nums">
                      {formattedBalance.toFixed(4)}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {balance.symbol}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => {
                    copyAddress();
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs transition-colors hover:bg-white/[0.06]"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5 text-muted-foreground" />
                  )}
                  <span>{copied ? "Copied!" : "Copy Address"}</span>
                </button>
                <a
                  href={`https://testnet.monadexplorer.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs transition-colors hover:bg-white/[0.06]"
                >
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                  <span>View on Explorer</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    disconnect();
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut className="size-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
}
