#!/bin/bash

# set up nvm
. ~/.nvm/nvm.sh
nvm use --lts

# update repo
git checkout master
git pull origin master

# check npm deps up to date
npm install
npm run prod_build

# start new instances
pm2 delete process.yml
echo 'Sleeping for 10s' && sleep 10
pm2 start process.yml
