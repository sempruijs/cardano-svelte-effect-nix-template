<script lang="ts">
    import { Effect } from 'effect';
    import LearnMore from '$lib/components/LearnMore.svelte';
    import { provideWallet } from '$lib/wallet';
    import type { Utxo } from "$lib/types";
    import ConnectWallet from "$lib/components/ConnectWallet.svelte";
    import { Option } from "effect";
    import { getUtxos } from "$lib/wallet/getUtxos";
    import UtxoView from "$lib/components/UtxoView.svelte";
    import { donateAda } from "$lib/wallet/donateAda";
    import { connectedWallet } from "../stores/wallet";

    function send_ada() {
        Effect.runPromise(provideWallet($connectedWallet)(donateAda('1')))
          .then(result => {
            state.txHash = Option.some(result);
          })
          .catch(err => {
              console.log("error sending ADA");
              state.utxos = [];
          });
    }

    $effect(() => {
        if ($connectedWallet) {
            Effect.runPromise(provideWallet($connectedWallet)(getUtxos()))
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

    let state: { utxos: Utxo[], txHash: Option.Option<String> } = $state({
        utxos: [],
        txHash: Option.none
    });
</script>

<div class="">
    <main class="">
        <div class="bg-black text-center p-20">
            <h1 class="text-6xl p-5">
                🎉 Congratulations
            </h1>
            <p>You've successfully setup this template</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-10 m-5">
          <div class="bg-gray-700 border-10 border-gray-600 rounded-3xl p-5">
            <ConnectWallet />
            <button
                class=""
                onclick={send_ada}
            >
                Send 1 ADA
            </button> 
          </div>
          <div class="bg-black p-4">
              <LearnMore />
          </div>
        </div>

        <div class="">

            {#if connectedWallet}
                <UtxoView utxos={state.utxos} />
                <p class="">
                    ✅ Browser Wallet {$connectedWallet?._walletName} is connected!
                </p>
            {/if}
        </div>

    </main>
</div>

