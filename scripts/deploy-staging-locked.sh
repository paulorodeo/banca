#!/usr/bin/env bash
set -euo pipefail
umask 077

bun scripts/deploy-staging.ts --initial-preflight
exec bun scripts/with-staging-lock.ts --run bun scripts/deploy-staging.ts --locked
