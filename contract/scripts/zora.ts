import { constructMediaData, sha256FromBuffer, generateMetadata, isMediaDataVerified, Zora } from '@zoralabs/zdk'
import { BigNumber } from 'ethers';
import { Ask, Bid, BidShares, EIP712Domain, EIP712Signature, MediaData, constructBidShares } from '@zoralabs/zdk'

async function uploadToDecentralizedStorage(data: Buffer) {
  // function that uploads buffer to decentralized storage
  // and returns url of uploaded file from a gateway.
  return 'https://ipfs.io/ipfs/CID';
}

async function mintZNFT(
  zora: Zora,
  content: Buffer,
  mimeType: string,
  name: string,
  description: string,
  previewImageUrl?: string,
  animationUrl?: string
) {

  const metadataJSON = generateMetadata('zora-20210604', {
    description,
    mimeType: 'text/plain',
    image: previewImageUrl,
    animation_url: animationUrl,
    name,
    version: 'zora-20210604',
  })

  const contentURI = await uploadToDecentralizedStorage(content);
  const metadataURI = await uploadToDecentralizedStorage(Buffer.from(metadataJSON));

  const contentHash = sha256FromBuffer(content);
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
  const mediaData = constructMediaData(
    contentURI,
    metadataURI,
    contentHash,
    metadataHash
  );

  // Verifies hashes of content to ensure the hashes match
  const verified = await isMediaDataVerified(mediaData);
  if (!verified) {
    throw new Error("MediaData not valid, do not mint");
  }

  // BidShares should sum up to 100%
  const bidShares = constructBidShares(
    10, // creator share percentage
    90, // owner share percentage
    0 // prevOwner share percentage
  );

  const tx = await zora.mint(mediaData, bidShares);
  return new Promise((resolve) => {
    // This listens for the nft transfer event
    zora.media.on(
      "Transfer",
      (from: string, to: string, tokenId: BigNumber) => {
        if (
          from === "0x0000000000000000000000000000000000000000" &&
          to === tx.from
        ) {
          resolve(tokenId);
        }
      });
  });
}
