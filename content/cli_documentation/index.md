# Seer CLI Documentation

The Seer CLI is a command-line tool for tracing Solana transactions. It builds your programs, uploads them to a Seer session, and gives you an RPC endpoint that records every transaction's full execution trace — visible in the [Seer Dashboard](https://app.seer.run/dashboard).

Seer is designed as a drop-in replacement for `solana-test-validator`. You don't need to change your programs or tests — just point your tooling at the Seer RPC URL instead of `localhost`, and every transaction will show up in the dashboard with a full call stack linked to your source code.

When something goes wrong, instead of adding log statements and re-running tests in a loop, you can open the trace, see exactly which instruction failed, and follow the call chain back to the line in your source code that caused it.

## How It Works

1. Run `seer run` from inside your Solana project directory.
2. The CLI compiles all detected programs.
3. It lists the files it needs to upload and asks for your consent.
4. Once you confirm, it uploads the artifacts and starts a remote validator session.
5. The session URL is printed — point your tests or Solana tooling at that URL.
6. Every transaction sent to that URL is recorded with a full call stack and source-level trace.

## Sections

- [Installation](installation.md) — How to install the Seer CLI
- [Authentication](authentication.md) — Logging in with your API key
- [Commands Reference](commands.md) — All available commands and flags
- [Sessions](sessions.md) — How Seer sessions work
- [Tracing Transactions](tracing.md) — How to point your tooling at a Seer session

## Requirements

- Rust toolchain
- Solana CLI **v3.0.0 or higher** (`cargo-build-sbf`)
- A Seer API key — create a free account at [app.seer.run](https://app.seer.run)

> **Warning:** Seer will not work correctly with Solana CLI versions below v3.0.0. If your version is older, update it before using Seer.
