<script lang="ts">
  import { Option } from "effect";
  import { onMount } from "svelte";
  import { BrowserWallet, type Wallet } from "@meshsdk/core";
    import { BrowserWalletState } from "@meshsdk/svelte";

  let state: { available_wallets: Wallet[] } = $state({
    available_wallets: [],
  });

  onMount(async () => {
    const available_wallets = await BrowserWallet.getAvailableWallets();
    state.available_wallets = available_wallets;
  })

  async function connect_wallet(name: string) {
    let wallet = await BrowserWallet.enable(name);
    console.log("success");
    let addres = await wallet.getChangeAddress();
    console.log(addres);
  }
</script>

<ul>
{#each state.available_wallets as wallet}
  <li>
    <strong>{wallet.name}</strong>
    <img src="{wallet.icon}" alt="{wallet.name}" width="80" />
    <button onclick={async () => await connect_wallet(wallet.name)}>connect</button>
  </li>
{/each}
</ul>
