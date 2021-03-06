# Generating Certs to Secure gRPC

GoAlert can use x509 certificates to serve as authorization for sysapi access.

## Using GoAlert's Built-In Tools

The GoAlert binary has built-in sub-commands to simplify generating required certifications for secure gRPC communication.
It is broken into three steps:

1. Generate CA files for creating & verifying future certificates
2. Generate 1 or more server certificates to give to GoAlert
3. Generate 1 or more client certificates to give to plugins

If setting up GoAlert for the first time, you can generate all files at once with `goalert gen-cert all`.

### 1. Generating CA Files

Run `goalert gen-cert ca` to generate the CA files:

- `system.ca.pem`
- `system.ca.key`
- `plugin.ca.pem`
- `plugin.ca.key`

Keep these files secure (esp. the `.key` files), as they are only used to generate the deployment cert files.

### 2. Generating the Server Certificates

Run `goalert gen-cert server` to generate the server files:

- `goalert-server.ca.pem` (gets passed to `--sysapi-ca-file`)
- `goalert-server.pem` (gets passed to `--sysapi-cert-file`)
- `goalert-server.key` (gets passed to `--sysapi-key-file`)

These files should be deployed/provided to GoAlert itself.

### 3. Generating the Plugin Certificates

Run `goalert gen-cert client` to generate the client files:

- `goalert-client.ca.pem`
- `goalert-client.pem`
- `goalert-client.key`

These files should be deployed/provided to the plugin/services that need access to the GoAlert SystemAPI.
