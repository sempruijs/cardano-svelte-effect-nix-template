<script lang="ts">
  import { Effect } from 'effect';
  import { donateAda } from "$lib/wallet/donateAda";
  import { provideWallet } from '$lib/wallet';
  import { connectedWallet } from '../../stores/wallet';

  let state: { utxos: Utxo[], txHash: Option.Option<String> } = $state({
    utxos: [],
    txHash: Option.none
  });



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
</script>
<div>
  <h1>make donation</h1>
  <button
    class=""
    onclick={send_ada}
>
    Send 1 ADA
</button> 
</div>
