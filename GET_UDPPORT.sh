#!/bin/bash
. /opt/IBM/ace/server/bin/mqsiprofile

chmod 777 /home/scripts/Rohit_PORT/*
> /home/scripts/Rohit_PORT/BROKER_UDP.txt_tmp

for i in `mqsilist | grep -i node | grep -v HEART_BEAT |grep -v CACHE   | cut -d "'" -f2`
do
port=` mqsireportproperties $i -r  | grep -i RestAdminListener  -A 25 | grep -i port | cut -d "'" -f2`
echo "$i:$port" >> /home/scripts/Rohit_PORT/BROKER_UDP.txt_tmp
done

cat /home/scripts/Rohit_PORT/BROKER_UDP.txt_tmp > /home/scripts/Rohit_PORT/BROKER_UDP.txt
