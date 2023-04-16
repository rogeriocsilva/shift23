import { useSession, signOut } from "next-auth/react";
import { useEffect, useCallback } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { usePrevious } from "./usePrevious";

export function useProtected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const session = useSession();
  const prevAddress = usePrevious(address);

  const handleSignout = useCallback(async () => {
    await signOut({ callbackUrl: "/" });
    await disconnect();
  }, [disconnect]);

  useEffect(() => {
    if (prevAddress && !address) {
      handleSignout();
    }
    if (session.status !== "loading" && !address && prevAddress) {
      handleSignout();
    }
  }, [address, handleSignout, prevAddress, session.status]);

  return handleSignout;
}
