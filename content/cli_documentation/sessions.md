# Sessions

A Seer session is a remote Solana validator instance that records full transaction traces and links them to your source code.

## What a Session Is

When you run `seer run`, Seer starts a remote validator on its infrastructure. This validator works the same as a local `solana-test-validator`, but with two key differences:

- It has access to **mainnet state** — you can test against real on-chain accounts without syncing a full node.
- Every transaction processed by the validator is **recorded with a full call stack** and linked back to your source code, visible in the [Seer Dashboard](https://app.seer.run/dashboard).

You interact with the session exactly like any other Solana RPC endpoint: deploy programs to it, send transactions, run tests — everything works the same way.

## Starting a Session

From your Solana project root, run:

```sh
seer run
```

When the session is ready, the CLI prints the RPC URL:

```
New Seer session at: https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT
```

This URL is your session endpoint. All deployments and transactions must be directed here.

## Session Timeout

Sessions automatically shut down after **30 minutes of inactivity** (no transactions received).

To reactivate a timed-out session, run `seer run` again from the same project. If your code has not changed since the last build, you can save time by skipping the build step:

```sh
seer run --skip-build
```

## Consistent RPC URL

The RPC URL is derived from your API key, not the session state. This means **the URL stays the same** across sessions as long as you use the same API key. You can safely hardcode the URL in your test scripts and it will continue to work after timeouts and restarts.

## File Upload and Consent

Before starting a session, the CLI uploads your compiled program artifacts (`.so` binaries, `.debug` files, public keys, `.rs` source files). This is required so the validator can execute your programs and map execution back to your source code.

Before uploading, the CLI lists all files and their sizes and asks for your consent:

```
You are about to upload the following files to Seer:

  ./target/deploy/my_program.so    (1.23 MB)
  ./target/deploy/my_program.debug (2.87 MB)
  ./target/deploy/my_program-pubkey.json (44 B)
  ./src/lib.rs (22.5 KB)

Seer stores uploaded files temporarily and deletes them automatically after 7 days.
Do you consent? (yes/no):
```

**Uploaded files are stored temporarily and deleted automatically after 7 days.**

To skip the consent prompt (for scripting or CI), use the `--consent` flag:

```sh
seer run --consent
```

## What Gets Uploaded

The CLI uploads the following files per program:

<table>
  <thead>
    <tr><th style="white-space:nowrap">File</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td style="white-space:nowrap"><code>.so</code></td><td>The compiled Solana program binary. Executed by the validator.</td></tr>
    <tr><td style="white-space:nowrap"><code>.debug</code></td><td>DWARF debug symbols. Used to map execution addresses to source lines.</td></tr>
    <tr><td style="white-space:nowrap"><code>-pubkey.json</code></td><td>The program's public key (derived from the keypair). Used to identify the program in the session. <strong>The secret key is never uploaded.</strong></td></tr>
    <tr><td style="white-space:nowrap"><code>.rs</code></td><td>Rust source files. Enables source-level traces in the dashboard.</td></tr>
  </tbody>
</table>

## Viewing Traces

After your session is running and you have sent transactions to it, open the [Seer Dashboard](https://app.seer.run/dashboard), find your session, and click on any transaction to see the full execution trace with call stacks and source context.
