#!/bin/bash

VOLUME_NAME="all_volumes"

ARCHIVE_NAME="$VOLUME_NAME.tar"

TEMP_DIR=$(pwd)

VOLUME_PATH="//wsl$/docker-desktop-data/data/docker/volumes/$VOLUME_NAME"

tar -czf "$TEMP_DIR/$ARCHIVE_NAME" "$VOLUME_PATH"

gpg --symmetric --cipher-algo AES256 --output "$TEMP_DIR/$ARCHIVE_NAME.gpg"  "$TEMP_DIR/$ARCHIVE_NAME"

echo "Zakończono archiwizację wolumenu $VOLUME_NAME. Zapisano jako $ARCHIVE_NAME.gpg."
