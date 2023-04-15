import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

import { useProtected } from "../hooks/useProtected";
import { useAccount } from "wagmi";
import Chat from "../components/Chat";

function Protected() {
  const handleLogout = useProtected();
  const [{ data: accountData }] = useAccount();

  return (
    <main>
      <section className="flex flex-col gap-6">
        <p>Web3 Session with NextAuth.js, Protected Route</p>
        <p>My address</p>
        <p>{accountData?.address}</p>
        <p>
          We are now connected using our metamask account and can access
          connected routes. However, users can manually disconnect from the
          Metamask interface. To make sure we log them out, we can create a
          custom hook.
        </p>
        <Chat />

        <button onClick={handleLogout}>Logout</button>
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
