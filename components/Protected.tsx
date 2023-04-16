import Image from "next/image";
import { useAccount } from "wagmi";
import GeneratePhase from "./GeneratePhase";

import metamask from "../assets/metamask.svg";

function Protected() {
  const { address } = useAccount();

  return (
    <main>
      <section className="flex flex-col gap-6 m-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {address}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Image
                src={metamask}
                width={20}
                height={20}
                alt="Metamask logo"
              />
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
