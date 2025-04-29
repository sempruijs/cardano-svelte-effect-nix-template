export type Utxo = {
  input: {
    outputIndex: number;
    txHash: string;
  };
  output: {
    address: string;
    amount: {
      unit: string;
      quantity: string;
    }[];
  };
};
