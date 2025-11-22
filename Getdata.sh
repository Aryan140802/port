#!/bin/bash


        >/home/scripts/Rohit_PORT/FINAL_DATA.txt
        > /home/scripts/Rohit_PORT/netstat.txt
        > /home/scripts/Rohit_PORT/FINAL_DATA.json
        > /home/scripts/Rohit_PORT/`hostname -i`_FINAL_DATA.json
        > /home/scripts/Rohit_PORT/FILE_NAME




        netstat -atn >> /home/scripts/Rohit_PORT/netstat.txt

        echo '{"'    >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo `hostname` >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo '" :{"ip" : "' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo `hostname -i`  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

                echo '","date" : "' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo `date`  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt




#--------------------------ISOLATORDATA
        echo '","ISOLATOR" : {' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        for i in `cat /home/scripts/Rohit_PORT/BROKER_PORT.txt | grep ISOLATOR`
        do
        BKNM=`echo $i| cut -d ":" -f1`
        echo '"'   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo "${BKNM}"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo '":['  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        PORT=`echo $i| cut -d ":" -f2`
        echo "${PORT},"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        if [ "`cat /home/scripts/Rohit_PORT/netstat.txt | grep -i 0.0.0.0:${PORT} | grep -i listen`" == "" ]
        then
                echo "0,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        else
           echo "1,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        fi
        # dateiso=`date | cut -d " " -f2,3`
        #dateiso=`date | cut -c 5-11`
        dateiso=`date | cut -c 5-11`
        #countis=`cat   /var/log/user.log  |  grep -w "${dateiso}" | grep -w ISOLATOR | grep "The integration server has established a connection to the embedded global cache." | sort -u| wc -l`;
        countis=`cat   /var/log/user.log  |  grep -i "${dateiso}" | grep -w "${BKNM}" | grep "The integration server has established a connection to the embedded global cache." | sort -u| wc -l`;
        echo "${countis}" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo "],"   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        done

        cat  /home/scripts/Rohit_PORT/FINAL_DATA.txt  | tr -d '\n'   | sed 's/\(.*\),/\1}/'  >  /home/scripts/Rohit_PORT/FINAL_DATA.txtiso

        cat /home/scripts/Rohit_PORT/FINAL_DATA.txtiso >  /home/scripts/Rohit_PORT/FINAL_DATA.txt

#--------------------------ISOLATORDATA#--------------------------

#-----------------------------for broker restart

echo ',"BROKER_RESTART" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
value=`cat /var/log/user.log | grep -i "BIP9332I" | grep -iv ISOLATOR | tail -1 | awk '{print $3}'`
echo ${value}>>/home/scripts/Rohit_PORT/FINAL_DATA.txt
echo '","' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt


time=`cat /var/log/user.log | grep -i "BIP9332I" | grep -iv ISOLATOR | tail -1 | awk '{print $3}'`
year=`date | awk '{print $6}'`
day=`cat /var/log/user.log | grep -i "BIP9332I" | grep -iv ISOLATOR | tail -1 | awk '{print $2}'`
month=`cat /var/log/user.log | grep -i "BIP9332I" | grep -iv ISOLATOR | tail -1 | awk '{print $1}'`

T1="$month $day $time"
echo "`cat  /home/scripts/cache/CacheAudit| awk '{print $3" "$4" "$5 }'`" > /home/scripts/cache/cachedata.txt

mapfile -t timestamps < /home/scripts/cache/cachedata.txt
found=0

ts1=$(date -d "$T1 $year IST" +%s)
ts1_plus_5=$((ts1 + 300))


for line in "${timestamps[@]}";do
    ts=$(date -d "$line $year IST" +%s 2>/dev/null)

    if [ "$ts" -ge "$ts1" ] && [ "$ts" -le "$ts1_plus_5" ]; then
       echo '1'>>/home/scripts/Rohit_PORT/FINAL_DATA.txt
       found=1
      break;
    fi
done

if [ "$found" -eq 0 ]; then
  echo '0'>>/home/scripts/Rohit_PORT/FINAL_DATA.txt
fi

echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt




#--------------------------CACHEDATA


echo ',"CACHE" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
#thisip=`hostname -i`
#cac=`tail /home/scripts/cache/CacheAudit | grep -i ${thisip} -B1 | grep "IST"  | tail -1 | awk '{print $5}'`
DATE=`date | cut -c 5-11`
cac=`tail /home/scripts/cache/CacheAudit | grep PORT -A 1 | grep -i "${DATE}" | tail -1 | sed -e 's/\x1b\[[0-9;]*m//g'|awk '{print $4}'`
echo ${cac} >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
echo '","' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

#----------random CACHE CHECK
random_ln=$((1 + $RANDOM % 30000 ))
#echo $random_ln
DB_JS=/home/scripts/cache/cache_files/CACHE_DB_`date +%d%m%y`.json

if [[ ! -f "$DB_JS" ]]
then
echo "NO_FILE" >>  /home/scripts/Rohit_PORT/FINAL_DATA.txt
else

cat $DB_JS | tail -n $random_ln   | grep -m 1 "FIELD_NAME" -A 1  > /home/scripts/Rohit_PORT/cac.txt
FN=`cat /home/scripts/Rohit_PORT/cac.txt | grep -i "FIELD_NAME" | cut -d '"' -f4`
FV=`cat /home/scripts/Rohit_PORT/cac.txt  | grep -i "FIELD_VALUE"  | cut -d '"' -f4`
FV_get=$(curl -s -X GET http://`hostname -i`:8002/cache/v1/loadCache?"FIELD_NAME"="$FN")
FN_GOT=$(printf  "$FV_get" |cut -d '"' -f4 | sed 's/\\//g')

if [[ "$FV" == "$FN_GOT" ]]
then
echo "1" >>  /home/scripts/Rohit_PORT/FINAL_DATA.txt
else
echo "0" >>  /home/scripts/Rohit_PORT/FINAL_DATA.txt
fi
fi


echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt


#--------------------------CACHEDATA#--------------------------



#--------------------------.API POINTING

echo ',"system.api" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
timeout 0.5  ping system.api  > /home/scripts/Rohit_PORT/pingcbs
result=`cat /home/scripts/Rohit_PORT/pingcbs  | head -1 | awk '{print $3}' | cut -d '(' -f2 | cut -d ')' -f1`
echo ${result} >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt


echo ',"cbssi.sbi.co.in" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
timeout 0.5  ping cbssi.sbi.co.in  > /home/scripts/Rohit_PORT/pingcbs
result=`cat /home/scripts/Rohit_PORT/pingcbs  | head -1 | awk '{print $3}' | cut -d '(' -f2 | cut -d ')' -f1`
echo ${result} >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt




echo ',"imagedb.core" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
result=`sudo cat $ODBCINI  | grep -F  "[SIGNATURE]"  -A 20 | grep -i "ServiceName" | grep -v  "#" | cut -d '=' -f2`
echo ${result} >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

#--------------------------.API POINTING#--------------------------






#--------------------------CBSAADHAR
echo ',"AADHAR_POINTING" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
#LB when Aadhar in PR
APR="10.191.171.68 aadharsi.sbi.co.in"
#LB when Aadhar in DR
ADR="10.191.171.70 aadharsi.sbi.co.in"

result=`sudo cat /etc/hosts | grep -v "#"`
if [[ $result == *"$APR"* ]]
then
echo "PR" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
elif [[ $result =~ $ADR ]]
then
echo "DR" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
else
echo "NO Data" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
fi
echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

echo ',"CBS_POINTING" : ["' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
#LB when CBS in PR
CPR="10.191.171.68 cbssi.sbi.co.in"
#LB when CBS in NR
CNR="10.191.171.69 cbssi.sbi.co.in"
#LB when CBS in DR
CDR="10.191.171.70 cbssi.sbi.co.in"
if [[ $result =~ $CPR ]]
then
echo "PR" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
elif [[ $result =~ $CDR ]]
then
echo "DR" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
elif [[ $result =~ $CNR ]]
then
echo "NR" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
else
echo "NO Data" >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
fi
echo '"]'  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

#--------------------------CBSAADHAR#--------------------------
#--------------------------BROKERDATA

        echo ',"BROKER" : {' >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        for i in `cat /home/scripts/Rohit_PORT/BROKER_PORT.txt | grep -v ISOLATOR`
        do
        BKNM=`echo $i| cut -d ":" -f1`
        echo '"'   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo "${BKNM}"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo '":['  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        PORT=`echo $i| cut -d ":" -f2`
        echo "${PORT},"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        if [ "`cat /home/scripts/Rohit_PORT/netstat.txt | grep -i 0.0.0.0:${PORT} | grep -i listen`" == "" ]
        then
                echo "0,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        else
           echo "1,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        fi


        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT} | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT} |grep TIME_WAIT | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT}  |grep CLOSE_WAIT | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt


        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT}  |grep ESTABLISHED | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/BROKER_UDP.txt |grep -i $BKNM | cut -d ':' -f2 `"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "],"   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        done
#--------------------------BROKERDATA#--------------------------

#--------------------------EXTRAPORTS#--------------------------

                for i in `cat /home/scripts/Rohit_PORT/ATM_PORTS.txt`
        do
        BKNM=`echo $i| cut -d ":" -f1`
        echo '"'   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo "${BKNM}"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo '":['  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        PORT=`echo $i| cut -d ":" -f2`
        echo "${PORT},"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        if [ "`cat /home/scripts/Rohit_PORT/netstat.txt | grep -i 0.0.0.0:${PORT} | grep -i listen`" == "" ]
        then
                echo "0,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        else
           echo "1,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        fi


        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT} | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT} |grep TIME_WAIT | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT}  |grep CLOSE_WAIT | wc -l`,"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        echo "`cat /home/scripts/Rohit_PORT/netstat.txt | grep  :${PORT}  |grep ESTABLISHED | wc -l`"  >> /home/scripts/Rohit_PORT/FINAL_DATA.txt
        echo "],"   >> /home/scripts/Rohit_PORT/FINAL_DATA.txt

        done

#--------------------------EXTRAPORTS#--------------------------







 cat /home/scripts/Rohit_PORT/FINAL_DATA.txt  | tr -d '\n'   | sed 's/\(.*\),/\1}}}/' >> /home/scripts/Rohit_PORT/`hostname -i`_FINAL_DATA.json
 echo "/home/scripts/Rohit_PORT/`hostname -i`_FINAL_DATA.json" > /home/scripts/Rohit_PORT/FILE_NAME
 sudo chmod 750  /home/scripts/Rohit_PORT/FILE_NAME
sudo chmod 750 /home/scripts/Rohit_PORT/`hostname -i`_FINAL_DATA.json





### LOGGING SCP


echo "----------------------------LOG FOR THE DATE: `date`" >> /home/scripts/Rohit_PORT/scp_log.txt
timeout 2s  echo " put `cat /home/scripts/Rohit_PORT/FILE_NAME`  /home/scripts/Rohit_portal/DATA/  " | sftp -q 10.188.24.100


if [ $? == 0 ]
        then
             date >>  /home/scripts/Rohit_PORT/scp_log.txt
             echo "ho gya"   >> /home/scripts/Rohit_PORT/scp_log.txt
        else
           echo "nahi hua" >> /home/scripts/Rohit_PORT/scp_log.txt
                   timeout 2s    echo " put `cat /home/scripts/Rohit_PORT/FILE_NAME`  /home/scripts/Rohit_portal/DATA/  " | sftp -q 10.188.24.100
                   echo "$?" >>  /home/scripts/Rohit_PORT/scp_log.txt
                   date >>  /home/scripts/Rohit_PORT/scp_log.txt

        fi


timeout 2s    echo " put `cat /home/scripts/Rohit_PORT/FILE_NAME`  /home/scripts/Rohit_portal/DATA/  " | sftp -q 10.188.25.100
timeout 2s    echo " put `cat /home/scripts/Rohit_PORT/FILE_NAME`  /EIS_NFS_archive/PR_PORT_MONITORING_R  " | sftp -q 10.191.171.80
