# Commands Reference

This page documents all commands available in the Seer CLI.

---

## `seer login`

Authenticate the CLI with your Seer API key.

```sh
seer login [API_KEY]
```

**Arguments:**

| Argument | Required | Description |
|---|---|---|
| `API_KEY` | No | Your Seer API key. If omitted, you will be prompted interactively (input hidden). |

**Examples:**

```sh
# Interactive prompt (recommended)
seer login

# Inline key
seer login sk_live_...
```

See the [Authentication](authentication.md) page for full details, including the environment variable and per-run flag options.

## `seer build`

Compile all Solana programs in the current project for Seer. This is the same build step that runs automatically as part of `seer run`.

```sh
seer build [OPTIONS]
```

**Options:**

<table>
  <thead>
    <tr><th style="white-space:nowrap">Flag</th><th>Default</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td style="white-space:nowrap"><code>--silent</code></td><td><code>false</code></td><td>Suppress build output. Only errors and the summary are shown.</td></tr>
    <tr><td style="white-space:nowrap"><code>--force</code></td><td><code>false</code></td><td>Proceed with the build even when the Solana CLI version is below v3. The resulting artifacts are not guaranteed to work with Seer.</td></tr>
  </tbody>
</table>

**What it does:**

1. Detects all Solana programs.
2. Build each detected program for Seer.
3. Prints a build summary showing which programs succeeded and which failed.

**When to use it:**

- When you want to build without starting a session (e.g., to inspect artifacts or run separate deployment scripts).
- When you want to pre-build so a later `seer run --skip-build` completes faster.

**Example:**

```sh
# Build all programs with verbose output
seer build

# Build silently
seer build --silent
```

## `seer run`

Build programs (unless skipped), upload artifacts, and start a Seer session. This is the primary command for starting a tracing session.

```sh
seer run [OPTIONS]
```

**Options:**

<table>
  <thead>
    <tr><th style="white-space:nowrap">Flag</th><th>Default</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td style="white-space:nowrap"><code>--skip-build</code></td><td><code>false</code></td><td>Skip the build step and use already-built artifacts. Useful when code has not changed since the last build.</td></tr>
    <tr><td style="white-space:nowrap"><code>--consent</code></td><td><code>false</code></td><td>Automatically approve the file upload without being prompted. Useful for non-interactive or scripted environments.</td></tr>
    <tr><td style="white-space:nowrap"><code>--silent</code></td><td><code>true</code></td><td>Build programs without showing detailed compiler output. Set to <code>false</code> to see full output.</td></tr>
    <tr><td style="white-space:nowrap"><code>--artifacts &lt;PATH&gt;</code></td><td><code>./target/deploy</code></td><td>Path to the directory containing built program artifacts (<code>.so</code>, <code>.debug</code>, <code>-keypair.json</code>). Override this if your project uses a non-standard output directory.</td></tr>
    <tr><td style="white-space:nowrap"><code>--api-key &lt;API_KEY&gt;</code></td><td><em>none</em></td><td>API key to use for this run, overriding the stored key and <code>SEER_API_KEY</code> environment variable.</td></tr>
    <tr><td style="white-space:nowrap"><code>--force</code></td><td><code>false</code></td><td>Force build even if Solana CLI version is below v3.</td></tr>
  </tbody>
</table>

**What it does:**

1. Runs `seer build` (unless `--skip-build` is set).
2. Locates compiled artifacts in the artifacts directory.
3. Lists all files to be uploaded and asks for consent (unless `--consent` is set).
4. Uploads the artifacts to Seer.
5. Starts a remote validator session.
6. Prints the session RPC URL.

**Output:**

When the session starts successfully, you will see output like:

```
New Seer session at: https://rpc.seer.run/3AXR11hQSS7nNf9C3DnwkSqzWRT
```

Point your Solana tooling at this URL to have your transactions traced. See [Tracing Transactions](tracing.md) for details.

**Examples:**

```sh
# Full flow: build, upload, start session
seer run

# Skip build — use artifacts from the last build
seer run --skip-build

# Full flow with automated consent (no prompt)
seer run --consent

# Show verbose build output
seer run --silent=false

# Use a custom artifacts directory
seer run --artifacts ./my-custom-build/deploy

# Override API key for this run only
seer run --api-key sk_live_...
```

## `seer install`

Copy the current `seer` binary to a directory on your `PATH`, making it available globally.

```sh
seer install
```

This command has no options. It copies the running executable to:

- **Linux / macOS:**
  - Prefers `$HOME/.local/bin/seer` if writable
  - Falls back to `/usr/local/bin/seer` if writable
  - Otherwise creates and installs to `$HOME/.local/bin/seer`
- **Windows:** `<home>\.cargo\bin\seer.exe`

This is used as the final step when [installing from source](installation.md#option-2-build-from-source).

## Global Options

These options are accepted by the top-level `seer` command:

| Flag | Description |
|---|---|
| `--version` | Print the current version of the CLI and exit. |
| `--help` | Print help text for the command or subcommand. |

**Examples:**

```sh
seer --version
seer --help
seer run --help
```
