# Authentication

The Seer CLI authenticates using an API key tied to your Seer account. The key is used when starting a session with `seer run`.

## Getting an API Key

1. Go to [app.seer.run](https://app.seer.run) and create an account.
2. Generate an API key from your account settings.

## Logging In

### Interactive prompt

Run the login command without arguments. The CLI will prompt you to enter your key (input is hidden):

```sh
seer login
```

```
Enter your Seer API key: 
✅ API key saved to /home/user/.config/seer/cli/api_key
```

### Inline argument

Alternatively, pass the key directly as an argument:

```sh
seer login <YOUR_API_KEY>
```

This is convenient for scripting but will expose the key in your shell history. Prefer the interactive prompt or the environment variable method in sensitive environments.

## Environment Variable

You can override the stored key (or avoid storing it entirely) by setting the `SEER_API_KEY` environment variable:

```sh
export SEER_API_KEY=<YOUR_API_KEY>
seer run
```

When `SEER_API_KEY` is set, the CLI uses it and ignores any key saved in the config file. This is the recommended approach for CI/CD pipelines and automated environments.

You can also set it inline for a single command:

```sh
SEER_API_KEY=<YOUR_API_KEY> seer run
```

## Per-Run API Key Override

If you need to use a specific key for a single `seer run` invocation without changing your stored key or environment variable, use the `--api-key` flag:

```sh
seer run --api-key <YOUR_API_KEY>
```

This takes the highest precedence — it overrides both the environment variable and the stored config file key.

## Key Resolution Order

The CLI resolves the API key using the following priority order (first match wins):

1. `--api-key` flag passed directly to `seer run`
2. `SEER_API_KEY` environment variable
3. Key stored in the config file via `seer login`

If no key is found through any of these methods, the command will fail with an error asking you to log in.

## API Key Management

### One Key Per Account

Each Seer account has **one active API key** at a time. You can regenerate this key from your account settings at [app.seer.run](https://app.seer.run).

### Regenerating Your Key

You can regenerate your API key once every **24 hours**. When you regenerate your key:
- The new key becomes active immediately
- The old key stops working
- Your **RPC URL changes** (since it is derived from your API key)

**Important:** If you have scripts or tests hardcoded with your old RPC URL, they will stop working after regeneration. Update them to use the new URL from the next `seer run` output.

If you need to regenerate your key frequently (more than once per 24 hours), contact support.
