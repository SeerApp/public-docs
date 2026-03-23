# Getting Started with Seer

Seer is a drop-in replacement for `solana-test-validator` that records full transaction traces and links them to your source code. Instead of guessing what went wrong from logs, you open the [Seer Dashboard](https://app.seer.run/dashboard) and inspect the exact call path — down to the line of Rust that caused the error.

This guide takes you from a fresh install to your first traced transaction.

## Prerequisites

Before you begin, make sure you have:

- **Rust toolchain** — install via [rustup](https://rustup.rs)
- **Solana CLI v3.0.0 or higher** — Seer requires `cargo-build-sbf` from Solana CLI v3+
- **A Seer account** — create a free account at [app.seer.run](https://app.seer.run)

> **Warning:** Seer will not work correctly with Solana CLI versions below v3.0.0. Update before continuing.



## Step 1 — Install the Seer CLI

Run the install script in your terminal:

```sh
curl -fsSL https://seer.run/install.sh | sh
```

Verify the installation:

```sh
seer --version
```

You should see the current version number printed to stdout. If the command is not found, make sure `$HOME/.local/bin` is on your `PATH`.

> **Building from source?** See the full [Installation](../cli_documentation/installation.md) page.



## Step 2 — Authenticate

Go to [app.seer.run](https://app.seer.run), create an account, and generate an API key. Then run:

```sh
seer login
```

You will be prompted to paste your API key (input is hidden):

```
Enter your Seer API key:
✅ API key saved to /home/user/.config/seer/cli/api_key
```

You only need to do this once. The key is stored locally and reused for every subsequent `seer run`.

> **CI/CD or scripting?** Set the `SEER_API_KEY` environment variable instead of storing the key on disk. See [Authentication](../cli_documentation/authentication.md) for details.



## Step 3 — Start a Session

Navigate to your Solana project root and run:

```sh
seer run
```

Seer will:

1. Compile all detected Solana programs.
2. List the files it needs to upload.
  - For details on what gets uploaded and why, see: [What Gets Uploaded](../cli_documentation/sessions.md#what-gets-uploaded)
3. Ask for your consent before uploading.
4. Start a remote validator session and print the RPC URL.

The output looks like this:

```
New Seer session at: https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT
```

This URL is your session endpoint — a live Solana validator running on Seer's infrastructure with access to mainnet state. Every transaction sent to it is recorded with a full call stack.

> **Tip:** To skip the consent prompt (useful in scripts), add the `--consent` flag:
> ```sh
> seer run --consent
> ```



## Step 4 — Deploy Your Programs

For **native Solana** projects, deploy your compiled programs to the session URL using the Solana CLI:

```sh
solana --url https://rpc.seer.run/<session-id> \
  program deploy target/deploy/my_program.so
```

For **Anchor** projects, no manual deploy step is needed — `anchor test` deploys your programs automatically before running tests. Skip ahead to [Step 5](#step-5-send-transactions).

> The program ID is derived from the keypair file at `target/deploy/<program-name>-keypair.json`. It stays the same across builds as long as you do not delete that file.



## Step 5 — Send Transactions

Run your tests or send transactions to the session URL exactly as you would against a local validator.

**Rust tests:**

```sh
RPC_URL=https://rpc.seer.run/<session-id> cargo test
```

Or set the URL in your test setup code:

```rust
let client = RpcClient::new("https://rpc.seer.run/<session-id>".to_string());
```

**Anchor tests (TypeScript):**

```sh
anchor test --provider.cluster https://rpc.seer.run/<session-id>
```

Or set the cluster in `Anchor.toml` so you don't need to pass the flag every time:

```toml
[provider]
cluster = "https://rpc.seer.run/<session-id>"
```

Then run tests without any extra flags:

```sh
anchor test
```

**Custom TypeScript/JavaScript:**

```ts
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://rpc.seer.run/<session-id>", "confirmed");
```



## Step 6 — Inspect Traces

1. Open the [Seer Dashboard](https://app.seer.run/dashboard).
2. Find your active session.
3. Click on any transaction.
4. Explore the full execution trace: call stack, instruction flow, and source-level context.

Traces are available immediately — there is no delay after the transaction is processed.



## Full Workflow at a Glance

```sh
# 1. Install (once)
curl -fsSL https://seer.run/install.sh | sh

# 2. Log in (once)
seer login

# 3. From your project root — build, upload, and start a session
seer run

# 4. Run tests — Anchor deploys programs automatically
anchor test --provider.cluster https://rpc.seer.run/<session-id>

# 5. Open the dashboard to inspect traces
# https://app.seer.run/dashboard
```



## Session Management

| Topic | Detail |
|||
| **Timeout** | Sessions automatically shut down after 30 minutes of inactivity. |
| **Restart** | Run `seer run` again to restart. If your code has not changed, use `seer run --skip-build` to skip compilation. |
| **Stable URL** | The RPC URL is derived from your API key, not the session state. It stays the same across restarts — safe to hardcode in test scripts. |



## Iterating on Your Code


When you change a program and want fresh traces:

```sh
# 1. Rebuild and restart the session
seer run

# 2. Rerun your tests — Anchor redeploys programs automatically
anchor test --provider.cluster https://rpc.seer.run/<session-id>
```

If you only changed your test code (no changes to your program code):

- **If your Seer RPC session is still running:** You do not need to redeploy or rebuild anything. Just rerun your tests:
  ```sh
  anchor test --provider.cluster https://rpc.seer.run/<session-id>
  ```
- **If your Seer RPC session has timed out or stopped:** Reactivate it with:
  ```sh
  seer run --skip-build
  ```
  Then rerun your tests as above.



## Next Steps

- [Commands Reference](../cli_documentation/commands.md) — all flags and options
- [Sessions](../cli_documentation/sessions.md) — how sessions work in depth
- [Tracing Transactions](../cli_documentation/tracing.md) — advanced tracing setup
- [Authentication](../cli_documentation/authentication.md) — API key management and CI/CD usage
