import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { NFTCard } from "../components/nftCard"

export default function Home() {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts", process.env.NEXT_PUBLIC_MUMBAI_RPC);

    const baseURL = `${process.env.NEXT_PUBLIC_MUMBAI_RPC}/getNFTs/`;

    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const baseURL = `${process.env.MUMBAI_RPC}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <>
      <Head>
        <title>NFT Gallery</title>
        <meta name="description" content="Sample NFT Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> {/* replace with your own favicon */}
      </Head>
      <div className="flex flex-col items-center justify-center py-8 gap-y-3">
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <input
            className={`border border-solid border-black w-1/5 px-2 ${fetchForCollection ? "disabled:bg-slate-50  disabled:border-slate-200 cursor-not-allowed" : ""}`}
            onChange={(e) => { setWalletAddress(e.target.value) }}
            value={wallet}
            type={"text"}
            disabled={fetchForCollection}
            placeholder="Add your wallet address"
          />
          <input
            className='border border-solid border-black w-1/5 px-2'
            onChange={(e) => { setCollectionAddress(e.target.value) }}
            value={collection}
            type={"text"}
            placeholder="Add the collection address"
          />
          <label className="text-gray-600 ">
            <input type={"checkbox"} className="mr-2" onChange={(e) => { setFetchForCollection(e.target.checked) }} />
            Fetch for collection
          </label>
          <button
            className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
            onClick={() => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              } else fetchNFTs()
            }}
          >
            Let's go!
          </button>
        </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
          {
            NFTs.length && NFTs.map(nft => {
              return (
                <NFTCard nft={nft}></NFTCard>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
