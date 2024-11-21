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
    <Flex gap='middle' align='start' vertical className='zhopa'>
      <Flex vertical={false} gap='middle' justify='space-between' className='caption'>
        <div className='main-title'>WONTOPIA</div>
        <div className='version'>v0.1.0</div>
      </Flex>
      <div className='disclaimer'>
        Welcome to <span className='wontopia'>Wontopia</span>! The place where we have a big utopic dream to find the luckiest man in the Universe.
      </div>
      <Flex vertical={false} gap="middle" align='flex-start' className='zhopa2'>
          <Space>
              <TonConnectButton/>
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
