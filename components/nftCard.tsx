import { CopyIcon } from './CopyIcon';

interface Media {
  gateway: string;
}

interface Contract {
  address: string;
}

interface NFTId {
  tokenId: string;
}

interface NFT {
  media: Media[];
  title: string;
  id: NFTId;
  contract: Contract;
  description: string;
}

export const NFTCard = ({ nft }: { nft: NFT }) => {

  //console.log("nft:", nft)

  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div>
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {parseInt(nft.id.tokenId)}</p>
          <p className="flex text-gray-600" >
            {(nft.contract.address).slice(0, 5)}...{(nft.contract.address).slice(-5)}
            <CopyIcon textToCopy={nft.contract.address} />
          </p>
        </div>
        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>

    </div>
  )
}