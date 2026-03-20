# Tracing Transactions

Once your Seer session is running, you need to point your Solana tooling at the session RPC URL so that transactions are routed through the Seer validator and recorded.

## The Session URL

After running `seer run`, the CLI prints a URL in the following format:

```
New Seer session at: https://rpc.seer.run/<session-id>
```

Use this URL as the RPC endpoint in your deployment and test commands. Anything you would normally point at `http://localhost:8899` (the default local test validator URL) should be pointed at the Seer session URL instead.

## Deploying Programs

You must deploy your programs to the Seer session before sending transactions. The programs must be the same ones built by `seer build` or `seer run` — do not deploy binaries built outside of Seer, as the session will not have the matching debug context.

**Using the Solana CLI:**

```sh
solana --url https://rpc.seer.run/<session-id> program deploy target/deploy/your_program.so
```

**Using Anchor:**

```sh
anchor deploy --provider.cluster https://rpc.seer.run/<session-id>
```

Or set the cluster in `Anchor.toml`:

```toml
[provider]
cluster = "https://rpc.seer.run/<session-id>"
```

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

## Finding Program IDs After Build

When `seer build` or `seer run` compiles your programs, each program gets a keypair file saved at `target/deploy/<program-name>-keypair.json`. The program ID is the public key of that keypair.

You can always retrieve a program ID without deploying:

```sh
solana-keygen pubkey ./target/deploy/<program-name>-keypair.json
```

Note that the program ID is stable across builds as long as the keypair file is not deleted. If you delete the keypair file, a new one will be generated on the next build and the program ID will change.

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

# 3. Deploy your programs to the session
solana --url https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT \
  program deploy target/deploy/my_program.so

# 4. Run your tests against the session
RPC_URL=https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT cargo test

# 5. Open the dashboard to inspect traces
# https://app.seer.run/dashboard
```

## Iterating on Code

When you make changes to your programs and want to re-trace:

1. Run `seer run` again — this rebuilds changed programs and restarts the session.
2. Redeploy your programs to the session URL.
3. Rerun your tests.

If only your test code changed (no program changes), you can skip the build and redeploy step:

```sh
seer run --skip-build
```

Then rerun tests as usual.
