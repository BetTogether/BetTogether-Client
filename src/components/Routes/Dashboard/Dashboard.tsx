import React, { useState, useContext, useEffect } from "react";
import { Dai as DaiIcon } from "@rimble/icons";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { NotificationsActive, NotificationsOff } from "@rimble/icons";
import Switch from "react-switch";
import { providers, Contract, utils } from "ethers";

import BTMarketContract from "abis/BTMarket.json";
import Container from "components/Routes/RoutesContainer";
import { ModalContext } from "store/context/ModalContext";
import { ContractContext } from "store/context/ContractContext";
import {
  Content,
  Top,
  Title,
  Wrapper,
  GetDaiButton,
  CreateMarketButton,
  IconStyled,
} from "./Dashboard.style";
import MarketCard from "./MarketCard";

declare let window: any;

const Dashboard = () => {
  const { active } = useWeb3React<Web3Provider>();
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState } = useContext(ContractContext);
  const factoryContract = contractState[0];
  const daiMockupContract = contractState[2];
  const [checked, setChecked] = useState(false);
  const [marketContract, setMarketContract] = useState<any>();
  const [newMarketAddress, setNewMarketAddress] = useState();

  factoryContract.on("MarketCreated", (address: any) =>
    setNewMarketAddress(address)
  );

  const IconOn = () => {
    return (
      <IconStyled>
        <NotificationsActive size={15} color="white" />
      </IconStyled>
    );
  };

  const IconOff = () => {
    return (
      <IconStyled>
        <NotificationsOff size={15} color="white" />
      </IconStyled>
    );
  };

  const mintDai = async () => {
    let daiToMint = 100;
    let formattedDaiToMint = utils.parseUnits(daiToMint.toString(), 18);
    try {
      let tx = await daiMockupContract.mint(formattedDaiToMint);
      let result = await tx.wait();
      console.log("result:", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const provider = new providers.Web3Provider(window.web3.currentProvider);
      const wallet = provider.getSigner();
      try {
        let deployedMarkets = await factoryContract.getMarkets();
        if (deployedMarkets.length !== 0) {
          let mostRecentlyDeployedAddress =
            deployedMarkets[deployedMarkets.length - 1];
          console.log(
            "Most Recently Deployed Address:",
            mostRecentlyDeployedAddress
          );

          const marketInstance: any = new Contract(
            mostRecentlyDeployedAddress,
            BTMarketContract.abi,
            wallet
          );
          setMarketContract(marketInstance);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [factoryContract, newMarketAddress]);

  return (
    <Container>
      <Content>
        <Top>
          <Title>Dashboard</Title>
          <Switch
            onColor="#f1404b"
            offColor="#dddfe6"
            width={40}
            height={20}
            checkedIcon={<IconOn />}
            uncheckedIcon={<IconOff />}
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="react-switch"
          />
        </Top>

        <Wrapper>
          {marketContract ? (
            <MarketCard marketContract={marketContract} />
          ) : (
            <CreateMarketButton
              disabled={!active}
              onClick={() =>
                modalDispatch({
                  type: "TOGGLE_CREATE_MARKET_MODAL",
                  payload: !modalState.createMarketModalIsOpen,
                })
              }
            >
              Create Market
            </CreateMarketButton>
          )}

          {active && (
            <GetDaiButton onClick={() => mintDai()}>
              <DaiIcon />
            </GetDaiButton>
          )}
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
