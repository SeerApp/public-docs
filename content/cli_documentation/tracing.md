# Tracing Transactions

Once your Seer session is running, send transactions to it through your test suite. Your programs are automatically deployed to the session under their public keys (derived from the keypair files).

## The Session URL

After running `seer run`, the CLI prints a URL in the following format:

```
New Seer session at: https://rpc.seer.run/<session-id>
```

This URL is derived from your API key and will remain stable across session restarts and timeouts, as long as you don't [regenerate your API key](authentication.md#regenerating-your-key).

Use this URL as the RPC endpoint in your test commands. Anything you would normally point at `http://localhost:8899` (the default local test validator URL) should be pointed at the Seer session URL instead.
## Automatic Program Deployment

When you run `seer run`, Seer automatically deploys all your compiled programs to the session. Each program is deployed under the public key derived from its keypair file from `/<program-name>-keypair.json`.

**You do not need to manually deploy programs.** Simply run your tests against the session URL and Seer handles the deployment for you.

## Running Tests

Point your test suite at the session URL so that test transactions are captured by Seer.

**Native Solana (Rust tests):**

In your test code, set the RPC URL when creating the connection:

```rust
let rpc_url = "https://rpc.seer.run/<session-id>".to_string();
let client = RpcClient::new(rpc_url);
```

Or pass it via an environment variable and read it in your test setup.

**Anchor tests (TypeScript/JavaScript):**

```sh
anchor test --provider.cluster https://rpc.seer.run/<session-id>
```

Or set the cluster in `Anchor.toml`.

**Custom TypeScript/JavaScript tests:**

```ts
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://rpc.seer.run/<session-id>", "confirmed");
```

## Finding Program IDs

When `seer build` or `seer run` compiles your programs, each program gets a keypair file saved at `target/deploy/<program-name>-keypair.json`. The program ID is the public key of that keypair, and this is the public key under which your program is deployed in the Seer session.

You can always retrieve a program ID without deploying:

```sh
solana-keygen pubkey ./target/deploy/<program-name>-keypair.json
```

The program ID is stable across builds as long as the keypair file is not deleted. If you delete the keypair file, a new one will be generated on the next build and the program ID will change.

## Viewing Traces in the Dashboard

After sending transactions to your Seer session:

1. Open the [Seer Dashboard](https://app.seer.run/dashboard).
2. Find your active or recent session.
3. Click on any transaction in the session.
4. Explore the full execution trace: call stack, instruction flow, and source-level context.

Traces are available immediately after the transaction is processed — there is no delay.

## Common Workflow

A typical tracing workflow from start to finish:

```sh
# 1. Log in (only needed once)
seer login

# 2. From your project root, build and start a session
seer run

# Output:
# New Seer session at: https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT

# 3. Run your tests 
RPC_URL=https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT cargo test

# OR for Anchor:
anchor test --provider.cluster https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT

# 4. Open the dashboard to inspect traces
# https://app.seer.run/dashboard
```

## Iterating on Code

When you make changes to your programs and want to re-trace:

1. Run `seer run` again — this rebuilds changed programs, restarts the session, and redeploys programs automatically.
2. Rerun your tests.

If only your test code changed (no program changes), you can skip the build step:

```sh
seer run --skip-build
```

Then rerun tests as usual. Your programs remain deployed with their stable public keys.
