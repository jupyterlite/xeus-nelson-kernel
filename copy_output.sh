#!/bin/bash
set -e

mkdir -p /src/src

cd /tmp/xeus-nelson-kernel
ls
cp *nelson*.{js,wasm,data} /src/src

cd /tmp/xeus-nelson-kernel/envs/xeus-nelson-kernel/share/xeus-lite
cp *.ts /src/src

echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="

