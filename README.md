# D-Drive-A-Blockchain-Based-Decentralized-File-System-Using-IPFS

- Traditional centralized cloud storage systems, though widely used, are often insecure and lack confidentiality due to third-party control. To address these challenges, we propose D-Drive, a new file storage         system based on the InterPlanetary File System (IPFS) and blockchain technology.

- Users can upload, store, and share files within a peer-to-peer network on a blockchain-based file system that ensures confidentiality and integrity.

- Fine-grained access control is achieved through smart contracts, allowing users to grant or revoke access to other Ethereum accounts.

- Integrated with MetaMask and Ganache, the system performs Ether-based transactions for file operations.

- Real-time transaction notifications enhance user trust and transparency.

# Features

- Upload and retrieve files securely on IPFS  
- Fine-grained access control via smart contracts  
- Grant/revoke access to specific Ethereum accounts  
- MetaMask integration for authentication and transactions  
- Real-time transaction notifications  
- User-friendly React.js interface  

# Technologies Used

- Frontend: React.js, CSS

- Blockchain: Ethereum (Ganache), Solidity Smart Contracts, Hardhat

- Storage: IPFS (Pinata / Cloudflare Gateway)

- Wallet: MetaMask

- Libraries: Ethers.js, Web3 Provider

# Installation & Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/d-drive.git
     ```
2. Install dependencies for the hardhat:

   ```
   cd d-drive
   npm install
   ```

3. Compile the smart contract for artifacts:

   ```
   npx hardhat compile
   ```

4. Deploy the Solidity smart contract to an Ethereum testnet or local development environment.

   ```
   npx hardhat run --network localhost scripts/deploy.js
   ```

5. Install dependencies for the React front end:

   ```
   cd client
   npm install
   ```

6. Run the react application:

   ```
   npm start
   ```

# Configuration

1. Set up environment variables:

      - Obtain API keys for Pinata to interact with IPFS.
   
      - Update the React component (FileUpload.js) with your Pinata API keys.

# Usage

Once the setup and configuration are complete, follow these steps to utilize the decentralized image upload and sharing system:

1. Install Metamask:

      - Ensure Metamask is installed and configured in your browser for Ethereum interactions.

2. Update Contract Address:

      - After smart contract deployment, make sure to update the contract address in App.js within the React application.

# Output

<p align="center">
  <img src="https://github.com/user-attachments/assets/eceda872-9ff9-4435-9b3b-45222694c440" alt="Screenshot (11)" width="1500" height="800"/>
  <br>
  <em>Fig: User interface. </em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7b4e9b86-8379-4fa4-8dc4-a4d06b0f04fa" alt="Screenshot (10)" width="1500" height="800"/>
  <br>
  <em>Fig: User Interface after files are uploaded .</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/33a63b47-49eb-4db9-b044-5a289886cf12" alt="Screenshot (14)" width="1500" height="800"/>
  <br>
  <em>Fig: Interface for sharing access to uploaded files with other MetaMask accounts .</em>
</p>

           
