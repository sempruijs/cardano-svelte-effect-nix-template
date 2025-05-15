import { Effect } from "effect";
import type { BrowserWallet } from "@meshsdk/core";
import { MeshTxBuilder } from "@meshsdk/core";
import { Wallet } from "$lib/wallet";

export function donateAda(
  ada: string,
): Effect.Effect<string, Error, Wallet> {
  return Effect.gen(function* (_) {
    const lovelace = yield* _(parseAdaToLovelace(ada));
    console.log(lovelace);
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

    const txHash = _(w.submitTx(signedTx));

    return txHash;
  });
}

export const parseAdaToLovelace = (input: string): Effect.Effect<string, Error> =>
  Effect.gen(function* (_) {
    const cleaned = input.trim();

    const dotCount = (cleaned.match(/\./g) || []).length;
    const commaCount = (cleaned.match(/,/g) || []).length;

    // If both dot and comma are present → ambiguous
    if (dotCount > 0 && commaCount > 0) {
      yield* _(Effect.fail(new Error(
        `Ambiguous ADA format: "${input}". Please use only one type of decimal separator.`
      )));
    }

    // Normalize: if only comma is used, treat it as a decimal separator
    const normalized =
      commaCount > 0 && dotCount === 0
        ? cleaned.replace(",", ".")
        : cleaned;

    // Parse the normalized number
    const ada = Number(normalized);
    if (isNaN(ada)) {
      yield* _(Effect.fail(new Error(
        `Invalid ADA amount: "${input}"`
      )));
    }

    const lovelace = Math.round(ada * 1_000_000);
    return lovelace.toString();
  });
