#! /bin/bash

fuser -k 3000/tcp
fuser -k 5000/tcp
fuser -k 6379/tcp

# service redis redis_6379 start
redis-server --daemonize yes

cd ./oj-server
nodemon server.js &

cd ../executor
pip install -r requirements.txt
python executor_server.py &

echo  *===============================*
read -p "PRESS [enter] to terminate processes." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
redis-cli shutdown
