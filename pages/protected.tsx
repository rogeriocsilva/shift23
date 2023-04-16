import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

import { useProtected } from "../hooks/useProtected";
import { useAccount } from "wagmi";
import GeneratePhase from "../components/GeneratePhase";

function Protected() {
  const handleLogout = useProtected();
  const [{ data: accountData }] = useAccount();

  return (
    <main>
      <section className="flex flex-col gap-6">
        <p>Web3 Session with NextAuth.js, Protected Route</p>
        <p>My address</p>
        <p>{accountData?.address}</p>
        <GeneratePhase />

        <button
          className="w-full rounded-xl bg-cyan-500 px-4 py-2 font-medium text-white hover:bg-black/80"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </main>
  );
}

export default Protected;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
