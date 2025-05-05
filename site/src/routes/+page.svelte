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
                  console.log("error fetching utxo");
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
                  console.log("error fetching utxo");
                    state.utxos = [];
              });
        }
    });

    let state: { utxos: Utxo[], txHash: Option } = $state({
        utxos: [],
        txHash: Option.none
    });
</script>

<div class="">
    <main
        class={``}
    >
        <h1 class="">
            <a href="https://meshjs.dev/" class="mesh-text-sky-600">
                Mesh
            </a>{" "}
            SvelteKit
        </h1>

        <div class="">
            <CardanoWallet isDark={true} />
            <button onclick={send_ada}>send</button>
            <LearnMore />

            {#if BrowserWalletState.connected}
                <UtxoView utxos={state.utxos} />
                <p>Browser Wallet {BrowserWalletState.name} is connected!</p>
            {/if}
        </div>

        <div
            class=""
        >
            <a
                href="https://meshjs.dev/apis"
                class=""
            >
                <h2 class="">
                    Documentation
                </h2>
                <p class="">
                    Our documentation provide live demos and code samples; great
                    educational tool for learning how Cardano works.
                </p>
            </a>

            <a
                href="https://meshjs.dev/guides"
                class=""
            >
                <h2 class="">Guides</h2>
                <p class="">
                    Whether you are launching a new NFT project or ecommerce
                    store, these guides will help you get started.
                </p>
            </a>

            <a
                href="https://meshjs.dev/svelte"
                class=""
            >
                <h2 class="">
                    Svelte components
                </h2>
                <p class="">
                    Useful Svelte UI components, seamlessly integrate them into
                    your app, and bring the user interface to life.
                </p>
            </a>
        </div>
    </main>
    <footer
        class=""
    ></footer>
</div>
