# /usr/bin/env bash

sips -Z 16 --out extension/16-icon.png $1
sips -Z 32 --out extension/32-icon.png $1
sips -Z 48 --out extension/48-icon.png $1
sips -Z 128 --out extension/128-icon.png $1