
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { ethers } from "https://esm.sh/ethers@6.8.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const INFURA_API_KEY = Deno.env.get('INFURA_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, params } = await req.json()

    switch (action) {
      case 'getBalance': {
        if (!params.address || !params.network) {
          throw new Error('Address and network are required')
        }

        const provider = new ethers.JsonRpcProvider(
          `https://${params.network}.infura.io/v3/${INFURA_API_KEY}`
        )
        
        const balance = await provider.getBalance(params.address)
        const formattedBalance = ethers.formatEther(balance)
        
        return new Response(
          JSON.stringify({ balance: formattedBalance }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'generateSmartContract': {
        if (!params.contractType) {
          throw new Error('Contract type is required')
        }

        // Modèles de contrats intelligents simples
        const contractTemplates = {
          token: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}`,
          nft: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CustomNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}`
        }

        const contractCode = contractTemplates[params.contractType] || 'Contract type not found'
        
        return new Response(
          JSON.stringify({ 
            contractCode,
            instructions: "Pour déployer ce contrat, utilisez Remix (https://remix.ethereum.org) ou Truffle."
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      default:
        throw new Error('Action not supported')
    }
  } catch (error) {
    console.error('Error in blockchain-api function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
