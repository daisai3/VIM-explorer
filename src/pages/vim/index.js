import React, { useState, useEffect } from "react";
import Axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import VimExplorer from "../../components/vim-explorer";
import "./index.scss";

const walletArressList = [
  "0x77b84275f3ea02979d4c662bded73a2081916c15",
  "0xCD2c84E26D6089c25e630c07EaE72bA777C0a567",
];

const fetchVimList = (walletAddress) => {
  const url = "https://api.8hoursfoundation.org";
  return Axios.post(`${url}/tokensOfOwner`, {
    wallet: walletAddress,
  });
};

const fetchVimDetail = (vimId) => {
  const url = `https://data.testnet.8hoursfoundation.org/metadata/${vimId}`;
  const options = {
    headers: {
      "CF-Access-Client-Id":
        "744ad1c298530d92f50b1b99d4c94880.access.8hoursfoundation.org",
      "CF-Access-Client-Secret":
        "5f782e48ad8d776b04b118a37923cdb51fdc521b6c69e5207fdf6f22629c1093",
    },
  };

  return Axios.get(url, options);
};

function VimPage() {
  const [activeWalletAddr, setActiveWalletAddr] = useState("");
  const [vimList, setVimList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function vimListFetch() {
      setIsFetching(true);
      const {
        data: { vimList: _vimList },
      } = await fetchVimList(activeWalletAddr);
      let vimListWithDetail = [];
      for (let i = 0; i < _vimList.length; i++) {
        const { data } = await fetchVimDetail(_vimList[i]);
        vimListWithDetail = [...vimListWithDetail, data];
      }
      setVimList(vimListWithDetail);
      setIsFetching(false);
    }

    vimListFetch();
  }, [activeWalletAddr]);

  const onChangeWallet = (event) => {
    const { value } = event.target;
    setActiveWalletAddr(value);
  };

  return (
    <div className="vim-container">
      <div className="vim-select-wrapper">
        <select
          className="custom-select"
          value={activeWalletAddr}
          onChange={(e) => {
            onChangeWallet(e);
          }}
        >
          <option>Choose Wallet Address to load VIMs...</option>
          {walletArressList.map((walletAddr, id) => (
            <option key={id} value={walletAddr}>
              {walletAddr}
            </option>
          ))}
        </select>
      </div>
      {isFetching ? (
        <div className="vim-loader-wrapper">
          <MoonLoader size={50} color="#179DFA" loading={isFetching} />
        </div>
      ) : (
        <VimExplorer vimList={vimList} />
      )}
    </div>
  );
}

export default VimPage;
