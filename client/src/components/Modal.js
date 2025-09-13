import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract, account }) => {
  const [metaAccounts, setMetaAccounts] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [txCount, setTxCount] = useState(0);

  const fetchAccessList = async () => {
    try {
      const accessArray = await contract.shareAccess();
      setAccessList(accessArray);

      const list = document.querySelector("#accessList");
      list.innerHTML = "";

      const activeUsers = accessArray.filter((entry) => entry.access === true);

      if (activeUsers.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No access shared yet";
        list.appendChild(empty);
      } else {
        activeUsers.forEach((entry) => {
          const li = document.createElement("li");
          li.textContent = entry.user;
          list.appendChild(li);
        });
      }
    } catch (error) {
      console.error("Error fetching access list:", error);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const filtered = accounts.filter(
          (addr) => addr.toLowerCase() !== account.toLowerCase()
        );
        setMetaAccounts(filtered);
      } catch (error) {
        console.error("MetaMask access error:", error);
      }
    };

    if (contract && account) {
      loadAccounts();
      fetchAccessList();
    }

    const handleAccountsChanged = () => {
      loadAccounts();
      fetchAccessList();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [contract, account]);

  const showNotification = (message) => {
    const newCount = txCount + 1;
    setTxCount(newCount);
    setNotification(`${message} (Transaction ${newCount})`);
    setTimeout(() => {
      setNotification(null);
      fetchAccessList();
    }, 3000);
  };

  const sharing = async () => {
    const address = document.querySelector(".address").value.trim().toLowerCase();

    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }

    if (address === account.toLowerCase()) {
      alert("Cannot give access to the same account.");
      return;
    }

    const alreadyShared = accessList.some(
      (entry) => entry.user.toLowerCase() === address && entry.access
    );

    if (alreadyShared) {
      alert("Access already granted to this address.");
      return;
    }

    try {
      await contract.allow(address);
      showNotification("Access granted");
    } catch (err) {
      alert("Error sharing access");
      console.error(err);
    }
  };

  const revokeAccess = async () => {
    const address = document.querySelector(".address").value.trim().toLowerCase();

    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }

    if (address === account.toLowerCase()) {
      alert("You cannot revoke access from your own account.");
      return;
    }

    const alreadyRevoked = accessList.some(
      (entry) => entry.user.toLowerCase() === address && !entry.access
    );

    if (alreadyRevoked) {
      alert("Access is already revoked for this address.");
      return;
    }

    try {
      await contract.disallow(address);
      showNotification("Access revoked");
    } catch (err) {
      console.error("Error revoking access:", err);
      alert("Failed to revoke access.");
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        {notification && <div className="notification">{notification}</div>}

        <div className="title">Share with</div>

        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Address"
          />
        </div>

        <div className="body">
          <select
            onChange={(e) => {
              document.querySelector(".address").value = e.target.value;
            }}
            className="dropdown"
          >
            {metaAccounts.length === 0 ? (
              <option disabled>No accounts to display</option>
            ) : (
              <>
                <option value="">Select from your MetaMask accounts</option>
                {metaAccounts.map((addr, i) => {
                  const shared = accessList.some(
                    (entry) =>
                      entry.user.toLowerCase() === addr.toLowerCase() &&
                      entry.access
                  );
                  return (
                    <option value={addr} key={i}>
                      {addr} {shared ? "(access shared)" : ""}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <div className="body access-list-section">
          <label className="access-label">People With Access:</label>
          <ul id="accessList" className="access-list"></ul>
        </div>

        <div className="footer">
          <button onClick={() => setModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={sharing} style={{ marginRight: "10px" }}>
            Share
          </button>
          <button
            onClick={revokeAccess}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 16px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Revoke Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
