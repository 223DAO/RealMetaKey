import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();
  const hiddenIds = [0,1,2,3,4,5]

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          // Manually hide undesired tokens. 
          if (hiddenIds.includes(parseInt(tokenInfo.tokenId))){
            return
          }
          return (
            <NFTPreview
              initialData={token}
              key={tokenInfo.tokenId}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={(evt) =>
                router.push(
                  `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                )
              }
              useBetaIndexer={true}
            />
          );
        })}
    </div>
  );
};
