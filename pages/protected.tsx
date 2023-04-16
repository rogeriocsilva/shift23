import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

import { useProtected } from "../hooks/useProtected";
import { useAccount } from "wagmi";
import GeneratePhase from "../components/GeneratePhase";
import Image from "next/image";

import metamask from "../assets/metamask.svg"
import logout from "../assets/log-out.png"

function Protected() {
  const handleLogout = useProtected();
  const [{ data: accountData }] = useAccount();

  return (
    <main>
      <section className="flex flex-col gap-6 m-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{accountData?.address || '0x123107770431774123641298371'}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Image src={metamask} width={20} height={20} alt="Metamask logo" />
              <span className="ml-1">Metamask address</span>
            </div>
          </div>
        </div>

        <GeneratePhase />
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
