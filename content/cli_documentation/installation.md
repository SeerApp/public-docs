# Installation

The Seer CLI can be installed in two ways: via the install script (recommended) or by building from source.


## Option 1: Install Script (Recommended)

Run the following command in your terminal:

```sh
curl -fsSL https://seer.run/install.sh | sh
```

This downloads and runs the official install script, which places the `seer` binary in a directory on your `PATH`.

## Option 2: Build from Source

Use this method if you want to build the CLI yourself.

### Prerequisites

- Rust toolchain (install via [rustup](https://rustup.rs))
- A [Buf](https://buf.build/) account and registry token (required to pull protobuf dependencies)

### Steps

**1. Clone the repository:**

```sh
git clone https://github.com/SeerApp/cli
cd cli
```

**2. Log in to the Buf registry:**

Replace `{token}` with your Buf registry token:

```sh
cargo login --registry buf "Bearer {token}"
```

**3. Build the release binary:**

```sh
cargo build --release
```

**4. Install the binary to your PATH:**

```sh
./target/release/seer install
```

This copies the compiled `seer` binary to a directory on your `PATH` so it can be run from anywhere.

**Installation locations:**

- **Linux / macOS:** 
  - Prefers `$HOME/.local/bin/seer` if writable
  - Falls back to `/usr/local/bin/seer` if writable
  - Otherwise creates and installs to `$HOME/.local/bin/seer`
- **Windows:** `<home>\.cargo\bin\seer.exe`

## Verifying the Installation

After installing, confirm the binary is available:

```sh
seer --version
```

You should see the current version number printed to stdout.

## Updating

To update to a newer version, re-run the install script or rebuild from source and run `seer install` again. The new binary will overwrite the previous one at the same path.
