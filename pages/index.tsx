import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Protected from "../components/Protected";

function Home() {
  const { isConnected } = useAccount();

  return (
    <main className={`w-full ${isConnected ? "" : "h-full"}`}>
      <div
        className={`flex  ${
          isConnected ? "justify-end" : "h-full justify-center items-center"
        }`}
      >
        <ConnectButton />
      </div>
      <section className="flex flex-col items-center justify-center w-full h-full">
        {isConnected && <Protected />}
      </section>
    </main>
  );
}

export default Home;
