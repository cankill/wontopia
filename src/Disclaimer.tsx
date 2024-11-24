import { TonConnectButton } from "@tonconnect/ui-react";
import { Flex } from "antd";

export const Disclaimer = () => {
  return (
    <Flex gap='smll' align='start' vertical>
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
      <div className='disclaimer'>
        The rules are simple.
        <ul>
          <li>At each level, <span className='disclaimer-accent'>you</span> are against two other challengers</li>
          <li>One is a winner and receives it all. The winner gets a unique <span className='disclaimer-accent'>NFT</span> item, with the price of the prize</li>
          <li>The winner can withdraw and take his prize, or move forward to the next level to challenge the other two lucky persons</li>
          <li>The win on each level will upgrade your <span className='disclaimer-accent'>NFT</span> item to the more valuable one</li>
          <li>Play to the end! Win it all!</li>
          <li>All the losers will receive unique memorable <span className='disclaimer-accent'>NFT</span> Items</li>
        </ul>
      </div>
      <p className='disclaimer'>All you need to do to enter the game is press the button and connect to the Wallet.
        Don't know what the wallet is? Don't know how secure is it?
        Just press the button and choose the help icon to learn more about wallets and their kinds.
      </p>
      <Flex vertical={false} gap='middle' justify='space-between' className='caption'>
          <div className='letsdoit'>Let's do it!</div>
          <TonConnectButton/>
      </Flex>
    </Flex>    
  );
}