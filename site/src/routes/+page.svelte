<script lang="ts">
    import { CardanoWallet, BrowserWalletState } from "@meshsdk/svelte";
    import { Effect } from 'effect';
    import LearnMore from '$lib/components/LearnMore.svelte';
    import type { Utxo } from "$lib/types";
    import { Option } from "effect";
    import { getUtxos } from "$lib/wallet/getUtxos";
    import UtxoView from "$lib/components/UtxoView.svelte";
    import { donateLovelace } from "$lib/wallet/donateLovelace";

    function send_ada() {
        if (BrowserWalletState.wallet) {
            Effect.runPromise(donateLovelace(BrowserWalletState.wallet, '1000000'))
              .then(result => {
                state.txHash = Option.some(result);
              })
              .catch(err => {
                  console.log("error sending ADA");
                  state.utxos = [];
              });
        }
    }

    $effect(() => {
        if (BrowserWalletState.wallet) {
            Effect.runPromise(getUtxos(BrowserWalletState.wallet))
              .then(result => {
                state.utxos = result;
                console.log(result);
              })
              .catch(err => {
                  console.log("error fetching utxos");
                  state.utxos = [];
              });
        }
    });

    let state: { utxos: Utxo[], txHash: Option } = $state({
        utxos: [],
        txHash: Option.none
    });
</script>

<div class="bg-red-200 min-h-screen bg-gray-100 text-gray-900 p-6">
    <main class="max-w-4xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center text-blue-600">
            🎉 Congratulations
        </h1>

        <div class="space-y-4">
            <CardanoWallet isDark={true} />
            <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                on:click={send_ada}
            >
                Send 1 ADA
            </button>
            <LearnMore />

            {#if BrowserWalletState.connected}
                <UtxoView utxos={state.utxos} />
                <p class="text-green-600 font-medium">
                    ✅ Browser Wallet {BrowserWalletState.name} is connected!
                </p>
            {/if}
        </div>

        <div class="grid md:grid-cols-3 gap-4">
            <a
                href="https://meshjs.dev/apis"
                class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"
            >
                <h2 class="text-xl font-semibold mb-2">Documentation</h2>
                <p>
                    Our documentation provides live demos and code samples — a great tool for learning how Cardano works.
                </p>
            </a>

            <a
                href="https://meshjs.dev/guides"
                class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"
            >
                <h2 class="text-xl font-semibold mb-2">Guides</h2>
                <p>
                    Launching a new NFT project or store? These guides will help you get started quickly.
                </p>
            </a>

            <a
                href="https://meshjs.dev/svelte"
                class="bg-white rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"
            >
                <h2 class="text-xl font-semibold mb-2">Svelte Components</h2>
                <p>
                    Integrate Mesh's Svelte UI components to enhance your Cardano dApp experience.
                </p>
            </a>
        </div>
    </main>

    <footer class="text-center text-sm text-gray-500 mt-12">
        &copy; {new Date().getFullYear()} Zoofpay
    </footer>
</div>
