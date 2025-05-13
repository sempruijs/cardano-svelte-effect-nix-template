import { Effect } from "effect";
import type { BrowserWallet } from "@meshsdk/core";
import { MeshTxBuilder } from "@meshsdk/core";
import { Wallet } from "$lib/wallet";

export function donateLovelace(
  wallet: BrowserWallet,
  lovelace: string,
): Effect.Effect<string, Error, Wallet> {
  return Effect.gen(function* (_) {
    const w = yield* _(Wallet);
    const utxos = yield* _(w.getUtxos);
    const changeAddress = yield* _(w.getChangeAddress)

    const txBuilder = new MeshTxBuilder();

    const unsignedTx = yield* _(Effect.tryPromise({
      try: () =>
        txBuilder
          .txOut(
            "addr1qyvt4enyyra4ss3q7qugzwf60r8lxggj8tvdd356pj5ez93024gfv5ckw0h2vg0t64ww3aep2gljy3nyyjrgs2ua0e4smx5sxa",
            [{ unit: "lovelace", quantity: lovelace }],
          )
          .changeAddress(changeAddress)
          .selectUtxosFrom(utxos)
          .complete(),
      catch: (e) => new Error("Failed to build transaction: " + String(e)),
    }));

    const signedTx = yield* _(w.signTx(unsignedTx));

    const txHash = yield* _(Effect.tryPromise({
      try: () => wallet.submitTx(signedTx),
      catch: (e) => new Error("Failed to submit transaction: " + String(e)),
    }));

    return txHash;
  });
}
