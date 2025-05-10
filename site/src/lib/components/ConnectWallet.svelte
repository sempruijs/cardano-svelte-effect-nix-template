<script lang="ts">
  import { onMount } from "svelte";
  import { BrowserWallet, type Wallet } from "@meshsdk/core";

  let state: { available_wallets: Wallet[] } = {
    available_wallets: [],
  };

  let showWallets = false;

  onMount(async () => {
    const available_wallets = await BrowserWallet.getAvailableWallets();
    state.available_wallets = available_wallets;
  });

  async function connect_wallet(name: string) {
    const wallet = await BrowserWallet.enable(name);
    console.log("success");
    const address = await wallet.getChangeAddress();
    console.log(address);
    showWallets = false;
  }
</script>

<style>
  .wallet-button-container {
    position: relative;
    display: inline-block;
  }

  .wallet-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background: white;
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .wallet-button-container:hover .wallet-dropdown {
    display: block;
  }

  .wallet-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
    padding: 0.25rem;
  }

  .wallet-option:hover {
    background: #f0f0f0;
  }
</style>

<div class="wallet-button-container">
  <button>Connect Wallet</button>
  <div class="wallet-dropdown">
    {#each state.available_wallets as wallet}
      <div class="wallet-option" on:click={() => connect_wallet(wallet.name)}>
        <img src="{wallet.icon}" alt="{wallet.name}" width="24" />
        <span>{wallet.name}</span>
      </div>
    {/each}
  </div>
</div>
