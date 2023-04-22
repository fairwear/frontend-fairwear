#!/bin/bash
docker build  -t fairwear/fairwear-frontend --platform linux/amd64 .
docker push fairwear/fairwear-frontend