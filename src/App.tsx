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
        Welcome to <span className='disclaimer-accent'>Wontopia</span>.<br/>
        It's the place where we have a big utopic dream.<br/>
        The Dream to find the luckiest man in the Universe!
      </p> 
      <p className='disclaimer'>
        Will you dare to challenge the Universe and rise to the top of <span className='disclaimer-accent'>Wontopia</span>?
      </p>
      <p className='disclaimer'>
        The rules are simple.
        <ul>
          <li>At each level, <span className='disclaimer-accent'>you</span> are against two other challengers</li>
          <li>One is a <span className='disclaimer-accent'>winner</span> and receives it all. The <span className='disclaimer-accent'>winner</span> gets a unique <span className='disclaimer-accent'>NFT</span> item, with the price of the <span className='disclaimer-accent'>prize</span></li>
          <li>The <span className='disclaimer-accent'>winner</span> can withdraw and take his <span className='disclaimer-accent'>prize</span>, or move forward to the next <span className='disclaimer-accent'>level</span> to challenge the other two lucky persons</li>
          <li>The <span className='disclaimer-accent'>win</span> on each <span className='disclaimer-accent'>level</span> will upgrade your <span className='disclaimer-accent'>NFT</span> item to the more valuable one</li>
          <li>Play to the end! <span className='disclaimer-accent'>Win</span> it all!</li>
          <li>All the <span className='disclaimer-accent'>losers</span> will receive unique memorable <span className='disclaimer-accent'>NFT</span> Items</li>
        </ul>
      </p>
      <p className='disclaimer'>All you need to do to enter the game is press the button and connect to the Wallet. Don't know what the wallet is? Just press the button and choose the help button to learn more about wallets and their kinds.</p>
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
