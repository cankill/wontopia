import './App.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown, Flex, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { globalUniversesHolder } from './store/GlobalUniversesHolder';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { tonAddress } from './lib/TonUtils';
import { useNftsStore } from './store/NftsStore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// window.Buffer = window.Buffer || require("buffer").Buffer;

export const testOnly = import.meta.env.VITE_TEST_ONLY === 'true' || true;

function App() {
  const nftStore = useNftsStore();
  const wallet = useTonWallet();
  const walletAddress = useMemo(() => tonAddress(wallet?.account.address), [ wallet ])
  const [ wontonPower, setWontonPower ] = useState(0);
  const [ ready, setReady ] = useState(false);
  const [ _, setUniverses ] = useState(globalUniversesHolder.universesHolder[0]);

  useEffect(() => {
    if (walletAddress) {
        nftStore.store(walletAddress.toString({ testOnly }));
        setReady(true);
    } else {
        setReady(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    setUniverses(globalUniversesHolder.universesHolder[wontonPower]);
  }, [ wontonPower ]);

  const onClick: MenuProps['onClick'] = useCallback(({ key }: { key: string }) => {
      setWontonPower(+key);
      console.log(`Setting new universe. wontonPower: ${key}, address: ${globalUniversesHolder.universesHolder[+key].wonTon.toString()}`);
  }, []);

  const items: MenuProps["items"] = useMemo(() => {
      return Object.values(globalUniversesHolder.universesHolder).map(universes => {
          return {
              key: universes.wonTonPower.toString(),
              label: `Universe ${universes.wonTonPower}`,
          }
      });
  }, []);

  return (
    <Flex gap='smll' align='start' vertical className='zhopa'>
      <Flex vertical={false} gap='middle' justify='space-between' className='caption'>
        <div className='main-title'>WONTOPIA</div>
        <div className='version'>v0.1.0</div>
      </Flex>
      <p className='disclaimer'>
        Welcome to <span className='wontopia'>Wontopia</span>.<br/>
        It's the place where we have a big utopic dream.<br/>
        The Dream to find the luckiest man in the Universe!
      </p> 
      <p className='disclaimer'>
        Will you dare to challenge the Universe and rise on the top of <span className='wontopia'>Wontopia</span>?
      </p>
      <p className='disclaimer'>
        The rools are simple. Each level you are against two other challengers.
        One is a winner and receives it all. The winner receives an unique NFT item, with the price of the prize.
        The winner is able to withdraw and take his prize, or move forward on the next level to challenge the other too lucky persons.
        The win on each level will upgrade your NFT item to the more valuable one.
        All the loosers will receive an unique memorable NFT Items.
      </p>
      <p className='disclaimer'>All you is to press the button and connect the Wallet. Don't know what the wallet is? Just press the button and choose the help button to know more about wallets and it's kinds.</p>
      <Flex vertical={false} gap="middle" align='flex-start' className='zhopa2'>
          <Space>
              <TonConnectButton/>
          </Space>
      </Flex>

      <Flex vertical={false} gap="middle" align='flex-start' className='zhopa2'>
          <Space>
              <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: [ '0' ], onClick }} trigger={[ 'click' ]}>
                  <a onClick={(e) => e.preventDefault()}>
                      <Space>
                          Universes
                          <DownOutlined/>
                      </Space>
                  </a>
              </Dropdown>
          </Space>
      </Flex>

      <Flex vertical={false} gap="middle">
          {ready && walletAddress ? (
              <Flex vertical={true} gap="middle">
                Connected...
              </Flex>
          ) : null}
      </Flex>
    </Flex>
  )
}

export default App
