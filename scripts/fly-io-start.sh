#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code or unset variables used
set -o errexit
set -o nounset
# Exit with status code of rightmost failing command in pipeline, or zero if all commands succeed
set -o pipefail

# Deliberately hang so setup can be completed over SSH before app startup
if [[ ! -f /postgres-volume/run/postgresql/data/postgresql.conf ]]; then
  echo "❗️ No PostgreSQL database found, run the setup script"
  sleep infinity
fi

echo "Setting up PostgreSQL on Fly.io..."
su postgres -c "pg_ctl start --pgdata=/postgres-volume/run/postgresql/data"

pnpm migrate up
./node_modules/.bin/next start
