<script lang="ts">
  import { onMount } from "svelte";
  import { BrowserWallet, type Wallet } from "@meshsdk/core";

  let availableWallets: Wallet[] = [];
  let selectedWallet: Wallet | null = null;
  let walletBalance: string | null = null;
  let isDialogOpen = false;

  onMount(async () => {
    availableWallets = await BrowserWallet.getAvailableWallets();

    // Add escape key listener
    window.addEventListener("keydown", handleKeyDown);
  });

  function openDialog() {
    isDialogOpen = true;
  }

  function closeDialog() {
    isDialogOpen = false;
  }

  async function selectWallet(name: string) {
    const wallet = await BrowserWallet.enable(name);
    selectedWallet = wallet;

    const utxos = await wallet.getUtxos();
    const balanceLovelace = utxos.reduce((acc, utxo) => {
      const amount = utxo.output.amount.find(a => a.unit === "lovelace");
      return acc + (amount ? BigInt(amount.quantity) : 0n);
    }, 0n);

    walletBalance = `${Number(balanceLovelace) / 1_000_000} ₳`;
    closeDialog();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeDialog();
    }
  }
</script>

<!-- Trigger Button -->
<button
  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  on:click={openDialog}
>
  {#if walletBalance}
    Balance: {walletBalance}
  {:else}
    Connect Wallet
  {/if}
</button>

<!-- Dialog -->
{#if isDialogOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Select a Wallet</h2>

      <ul class="space-y-4">
        {#each availableWallets as wallet}
          <li class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img src="{wallet.icon}" alt="{wallet.name}" aria-hidden="true" class="w-10 h-10" />
              <span class="font-medium">{wallet.name}</span>
            </div>
            <button
              class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              on:click={() => selectWallet(wallet.name)}
            >
              Connect
            </button>
          </li>
        {/each}
      </ul>

      <div class="flex justify-end">
        <button
          class="mt-4 px-3 py-1 text-gray-600 hover:text-gray-800"
          on:click={closeDialog}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
