import { signIn } from "next-auth/react";
import { useConnect, useAccount } from "wagmi";

function Home() {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();
  const metamaskInstalled = connectData.connectors[0].name === "MetaMask";

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      if (accountData?.address) {
        signIn("credentials", { address: accountData.address, callbackUrl });
        return;
      }
      const { data, error } = await connect(connectData.connectors[0]);
      if (error) {
        throw error;
      }
      signIn("credentials", { address: data?.account, callbackUrl });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <main className="w-full">
      <section className="flex flex-col space-y-4 gap-6">
        <p>Web3 Sessions with NextAuth.js</p>

        {metamaskInstalled ? (
          <>
            <p>Try it by logging in!</p>
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <p>
              Please install{" "}
              <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                Metamask
              </a>{" "}
              to use this example.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
