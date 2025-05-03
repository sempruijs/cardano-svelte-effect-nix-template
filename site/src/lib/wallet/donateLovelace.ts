import { Effect } from "effect";
import type { BrowserWallet } from "@meshsdk/core";
import { MeshTxBuilder } from "@meshsdk/core"; 

export function donateLovelace(wallet: BrowserWallet, lovelace: string): Effect.Effect<String, Error, never> {
  return Effect.tryPromise({
    try: async () => {
      const utxos = await wallet.getUtxos();
      const changeAddress = await wallet.getChangeAddress();

      const txBuilder = new MeshTxBuilder();

      const unsignedTx = await txBuilder
        .txOut('addr1qyvt4enyyra4ss3q7qugzwf60r8lxggj8tvdd356pj5ez93024gfv5ckw0h2vg0t64ww3aep2gljy3nyyjrgs2ua0e4smx5sxa', [{ unit: "lovelace", quantity: lovelace }])
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();

      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      return txHash;
    },
    catch: (e) => new Error("Failed to send lovelace: " + String(e))
  });
}

