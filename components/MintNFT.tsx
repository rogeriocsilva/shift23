import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import abi from "../utils/abi.json";

const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0xaf37490876a48634b39351178c6d5b92c6f6bb72";

const getEtherscanUrl = (tokenId: string | number) =>
  `https://goerli.etherscan.io/${CONTRACT_ADDRESS}/${tokenId}`;

export function MintNFT({ imageURL }: { imageURL: string }) {
  const { address } = useAccount();

  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    abi,
  };

  const preparedContract = usePrepareContractWrite({
    ...contractConfig,
    functionName: "safeMint",
    address: CONTRACT_ADDRESS,
    args: [address, imageURL],
  });

  console.log(preparedContract);

  const { data, write } = useContractWrite(preparedContract.config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={!write || isLoading}
        onClick={write}
        className="inline-flex items-center rounded-md bg-sky-metamask px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-metamask"
      >
        {isLoading ? "Minting..." : "Save as NFT"}
      </button>
      {isSuccess && data && (
        <a
          className="inline-flex items-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-metamask"
          href={getEtherscanUrl(data?.hash)}
        >
          NFT
        </a>
      )}
    </div>
  );
}
