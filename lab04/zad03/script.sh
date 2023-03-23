#!/bin/bash

volumes=$(docker volume ls --format '{{.Name}}')

for volume in $volumes
do
  usage=$(docker run --rm -v $volume:/data alpine sh -c "df /data | tail -1 | awk '{print $5}' | sed 's/%//'")
  echo "Zużycie przestrzeni dyskowej dla woluminu $volume: $usage%"
done
