#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/prototype"

if [[ ! -d "$APP_DIR" ]]; then
  echo "Pasta do prototipo nao encontrada: $APP_DIR" >&2
  exit 1
fi

PORT=8000
if python3 - "$PORT" <<'PY' >/dev/null 2>&1
import socket
import sys

port = int(sys.argv[1])
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.bind(("127.0.0.1", port))
PY
then
  :
else
  PORT=8001
fi

URL="http://localhost:$PORT"

cd "$APP_DIR"

echo "Abrindo Sun Neo AI em $URL"
echo "Pressione Ctrl+C neste terminal para parar o servidor."

if command -v xdg-open >/dev/null 2>&1; then
  (sleep 1 && xdg-open "$URL" >/dev/null 2>&1) &
elif command -v google-chrome >/dev/null 2>&1; then
  (sleep 1 && google-chrome "$URL" >/dev/null 2>&1) &
fi

python3 -m http.server "$PORT"
