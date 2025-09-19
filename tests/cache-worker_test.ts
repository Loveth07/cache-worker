import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: "Cache Worker: User can register and manage access",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const user = accounts.get('wallet_1')!;
    const consumer = accounts.get('wallet_2')!;

    // User registration
    let block = chain.mineBlock([
      Tx.contractCall('cache-worker', 'register-user', [], user.address)
    ]);
    assertEquals(block.receipts[0].result, '(ok true)');

    // Device registration
    block = chain.mineBlock([
      Tx.contractCall('cache-worker', 'register-device', ['device-123', 'smartwatch'], user.address)
    ]);
    assertEquals(block.receipts[0].result, '(ok true)');
  }
});