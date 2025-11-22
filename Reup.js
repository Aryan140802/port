




//BUTTON FUCNTION

document.getElementById('GET_DATA_BUTTON').addEventListener('click', get_past);
var data = document.getElementById('DATE_TIME').value;

function get_past() {
    var data = document.getElementById('DATE_TIME').value;
    console.log("PRINTED BY JAVASCRIPT :", data)
    /////loader here

    let man = document.getElementById("tablecontainer_div");
    man.style.backgroundColor = "black";
    man.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    let timediv = document.getElementById("Datedisplay_div");
    let sh = data.replace("T", " ");
    console.log("JS PRINTS ON SCREEN " + sh);
    timediv.innerHTML = "DATA FOR TIME :" + sh;
    timediv.style.backgroundColor = "#d71111";



    function maketableforjson(Received) {
        console.log(Received)
        console.log("received this and now making table ");
        /////CLEARING TABLES
        let man = document.getElementById("tablecontainer_div");
        man.innerHTML = "";
        let timediv = document.getElementById("Datedisplay_div");
        let sh = data.replace("T", " ");
        console.log("JS PRINTS ON SCREEN " + sh);
        timediv.innerHTML = "DATA FOR TIME :" + sh;
        timediv.style.backgroundColor = "#d71111";
        ///////////////TIME BANNER AFTER CLICK \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        ///MAKING TABLE
       // const snex = JSON.parse(Received);
        //man.innetHTML = snex;
            fetch('W.json')
                .then(function (resp) {
                    return resp.json();
                }).then(function (W) {
                    maketables(table, Received , W , 'UNIFIED')
                    IGNORETHIS(IGNORE);


		setTimeout(() => {
   		 CBSCHECK();
		}, 500);


                    //CBSCHECK();
                })

        ///MAKING CHANGES TO REFLECT ITS THE PAST
        let ndiv = document.getElementById("tablecontainer_div");
        ndiv.style.backgroundColor = "rgb(165 6 8)";




    }


    function nodatafoundinresponse() {
        clearallintervals();
        let man = document.getElementById("tablecontainer_div");
        man.innerHTML = "";
        let timediv = document.getElementById("Datedisplay_div");
        let sh = data.replace("T", " ");
	 // let sh = data ;
        console.log("JS PRINTS ON SCREEN " + sh);
        timediv.innerHTML = "DATA FOR TIME :" + sh;
        timediv.style.backgroundColor = "#d71111";
        let tablecontainer = document.getElementById("tablecontainer_div");
        tablecontainer.innerHTML = `<h1 style="color :white ;" > NO DATA FOUND FOR THIS TIME KINDLY TRY OTHER TIME FRAME </h1>`
        console.log("abhi catach khatam ")
    }



    async function Main() {
        clearallintervals();
	    const url =  '/portal.api/unified/date'
	    let date = data ;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json ; charset=utf-8",
                },
                body: JSON.stringify({ date })
            })
            if (response.ok) {

                try {
                const data = await response.json();
		console.log(`the json is here `)
		//console.log(JSON.parse(data.Json))
                maketableforjson( {...data.Json} );
		console.log(`made table `)
                }
                catch (error) {
			console.log(`came to the catch    `, error )
               		 nodatafoundinresponse();
                }

            }
            else {
		    console.log(`response not ok`)
                nodatafoundinresponse();
            }

        }
        catch (error) {
		console.log(`this request failed `)
            nodatafoundinresponse();
        }
    }



    Main();

}





/////////////////////////////////////

function makeHtable(TABLE_STRUCT_DATA, snex , argdate  ) {

    Object.keys(TABLE_STRUCT_DATA).forEach(function (key) {


        //////////////////////////////MaIN snex has whole json
        let div_order = 0;
        let count = 0;
        let ROWs = [];
        let tablename = "";
        let ISOcount = 0;
        let ROW_IS = [];

        /////////////////STRICTLY FOR ISOLATOR
        TABLE_STRUCT_DATA[key].forEach(x => {

            // let divmain;
            // let table1;

            if (count == 0) {

                tablename = x;
                title_div_str = x;
                let title_table_div = document.createElement("div");
                const replaced = title_div_str.replace(/[0-9]/g, '');
                title_div_str = replaced.toUpperCase();
                title_table_div.setAttribute("class", "table_title_div");
                title_table_div.innerText = key;


                let divmain = document.createElement("div");
                divmain.setAttribute("class", "onetable_div");
                divmain.setAttribute("id", x + "_tablediv");
                let table1 = document.createElement("table");
                table1.setAttribute("class", "demonclass");
                table1.setAttribute("id", x + "_tb");
                divmain.appendChild(title_table_div);

                divmain.appendChild(table1);
                let tablecontainer = document.getElementById("tablecontainer_div");
                tablecontainer.appendChild(divmain);
                // body.appendChild(divmain);
                // let tablename = x;
            }
            //////////////////////////////////////FOR FIRST IP TABLE
            if (count == 0) {
                //to print IP
                ////////////////////////////////////////////////////////////////////////////////////

                let table1 = document.getElementById(x + "_tb")
                let trip = document.createElement("tr");
                trip.setAttribute("id", x + "_th")
                let tdb_ip = document.createElement("tr");
                tdb_ip.setAttribute("id", x + "IP_th");

                let td_ip_1 = document.createElement("td")
                td_ip_1.innerText = "HOSTNAME";
                td_ip_1.setAttribute("class", "HN_title");
                td_ip_1.setAttribute("colspan", "2");
                // td_ip_1.setAttribute("rowspan", "2")

                tdb_ip.appendChild(td_ip_1);


                ////////////////////////////////////////////////////////////////////////////////////




                let tdb1 = document.createElement("td")
                tdb1.innerText = "BROKER";
                tdb1.setAttribute("class", "BROKER_title")
                trip.appendChild(tdb1)

                let tdb2 = document.createElement("td")
                tdb2.innerText = "PORT";
                tdb2.setAttribute("class", "PORT_title")
                trip.appendChild(tdb2);


                let th1 = document.createElement("td");
                th1.innerText = x;
                th1.setAttribute("class", "TH_IP_ALL");
                trip.appendChild(th1);

                table1.appendChild(tdb_ip);
                table1.appendChild(trip);


                //to print for all brokers

                // let table1 = document.getElementById(x + "_tb")
                ////////////CACHE_MAINROW
                let cacherow = document.createElement("tr");
                cacherow.setAttribute("class", "cache_row");
                cacherow.setAttribute("id", tablename + "_cache");
                table1.appendChild(cacherow);
                let tdcachetitle = document.createElement("td");

                tdcachetitle.innerText = "CACHE";
                tdcachetitle.setAttribute("class", "CACHE_title");
                cacherow.appendChild(tdcachetitle);
                let tdcacheblank = document.createElement("td");
                tdcacheblank.innerText = "Last Hit Time";
                tdcacheblank.setAttribute("class", "lsthit_title")
                cacherow.appendChild(tdcacheblank);
                ////////////CACHE_MAINROW////////////////////////
                let chk = 0;
                ///////////to print all the ips and brokers
                try {
                    if (typeof snex[x] == "object") {
                        console.log(x + "this thing exists")



                        //////////////FOR IP


                        let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                        let rowip_td = document.createElement("td");
                        rowip_td.setAttribute("class", "Td_for_ipadd");
                        let stip = snex[x].ip;
                        const ipar = stip.split(".")
                        let ipadd = ipar[3];

                        let updatetime = document.createElement("div");
                        updatetime.setAttribute("class", "ip_update_div");
                        let tec = snex[x].date;
                        const iii = tec.split(" ");
                        let ip_jst_dt = `${iii[1]}-${iii[2]} ${iii[3]}`;
                        const fl = ip_jst_dt.split(":");
                        ip_jst_dt = `LAST UPDATED :${fl[0]}:${fl[1]}`;
                        updatetime.innerText = ip_jst_dt;

                        rowip_td.innerText = ipadd;
                        IP_N0_ROW.appendChild(rowip_td);
                        rowip_td.appendChild(updatetime)



                        //TIME CHECK
                        let diff = ggetdiff(snex[x].date);
                        if (diff > 3 || diff == "invalid month") {
                            rowip_td.style.background = "yellow";
                            updatetime.style.background = "red";
                            let printdate = `Updated ${Math.round(diff)} mins ago`
                            updatetime.innerText = printdate;
                            console.log(diff);
                        }
                        console.log(`for this ip is ${diff} mins behind `);
                        ////////////////////////


                        //////////////FOR IP /////

                        ///////////CACHE


                        let tdcache = document.createElement("td");
                        tdcache.innerText = snex[x].CACHE[0];
                        tdcache.setAttribute("class", "cachetdforip");
                        cacherow.appendChild(tdcache);

                        ///////////CACHE\\\\\\\\\\\\\\\\\\\\\

                        ///////////ISOLATOR

                        for (const iso in snex[x].ISOLATOR) {
                            // let isolatorrow = document.createElement("tr");
                            // isolatorrow.setAttribute("class", "isolator_row");
                            // isolatorrow.setAttribute("id", tablename + "_ISOLATOR" +"_tr");
                            // table1.appendChild(isolatorrow);
                            // let isolatorrow_title = document.createElement("td");
                            // isolatorrow_title.innerText = "ISOLATOR";

                            // isolatorrow.appendChild(isolatorrow_title);
                            // let td_isolatorblank = document.createElement("td");
                            // isolatorrow.appendChild(td_isolatorblank);
                            let currowid = tablename + "_" + iso + "_tr";
                            console.log(currowid);
                            let thisrow = document.getElementById(currowid);

                            if (thisrow == null) {
                                console.log("dekh isme to aya hai");
                                let table1 = document.getElementById(tablename + "_tb")
                                let newrow = document.createElement("tr");
                                newrow.setAttribute("id", currowid);
                                ROW_IS.push(currowid);
                                newrow.setAttribute("class", "isolator_row");
                                table1.appendChild(newrow);


                                let iso_td = document.createElement("td");
                                newrow.appendChild(iso_td);
                                iso_td.setAttribute("class", "isoltator_title")
                                iso_td.innerText = iso;

                                let iso_port = document.createElement("td");
                                newrow.appendChild(iso_port);
                                iso_port.setAttribute("class", "iso_port");
                                iso_port.innerText = snex[x].ISOLATOR[iso][0];



                                //print blanks before st
                                ///filling blanks before td
                                for (let i = 0; i < count; i++) {
                                    let blank = document.createElement("td");
                                    blank.style.backgroundColor = "black";
                                    newrow.appendChild(blank);
                                    console.log("dekh isme print kiya maine blank")

                                }


                                let iso_st = document.createElement("td");
                                newrow.appendChild(iso_st);
                                iso_st.setAttribute("id", x + "_" + iso + "_td");
                                let st = snex[x].ISOLATOR[iso][1];
                                iso_st.innerText = snex[x].ISOLATOR[iso][2];
                                if (st == 0) {
                                    iso_st.style.backgroundColor = "#d71111"
                                    div_order -= 2;

                                }

                                else {
                                    iso_st.style.backgroundColor = "#1bf0f0cf"

                                }

                            }
                            else {

                                console.log("dekh isme  bhi to aya hai ");
                                let table1 = document.getElementById(tablename + "_tb");
                                let newrow = document.getElementById(currowid);

                                let iso_st = document.createElement("td");
                                newrow.appendChild(iso_st);
                                let st = snex[x].ISOLATOR[iso][1];
                                iso_st.innerText = snex[x].ISOLATOR[iso][2];
                                iso_st.setAttribute("id", x + "_" + iso + "_td");

                                if (st == 0) {
                                    iso_st.style.backgroundColor = "#d71111"
                                    div_order -= 2;

                                }

                                else {
                                    iso_st.style.backgroundColor = "#1bf0f0cf"

                                }

                            }



                        }

                        ///////////ISOLATOR\\\\\\\\\\\\\\\\\\\\\



                    }
                    else {

                        ////NODATA IP
                        //////////////FOR IP


                        let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                        let rowip_td = document.createElement("td");
                        rowip_td.setAttribute("class", "NODATA_IP");
                        rowip_td.innerText = "NO DATA";
                        IP_N0_ROW.appendChild(rowip_td);

                        //////////////FOR IP /////



                        ////NODATA CACHE
                        console.log(x + "this thing doesnot exists")
                        let tdcache = document.createElement("td");
                        tdcache.innerText = "NODATA";
                        tdcache.setAttribute("class", "NODATA_CACHE");
                        cacherow.appendChild(tdcache);
                    }

                }
                catch (err) {
                    console.log(err);
                }

                count++;

            }
            /////////////////////////////FIRST IP TABLE END
            else {


                let idth = tablename + "_th";
                console.log(idth);
                let hEADrow = document.getElementById(idth);
                let ip = document.createElement("td");
                ip.innerText = x;
                ip.setAttribute("class", "TH_IP_ALL");
                ip.style.backgroundColor = "yellow";
                hEADrow.appendChild(ip);



                try {

                    if (typeof snex[x] == "object") {

                        //////////////FOR IP
                        let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                        let rowip_td = document.createElement("td");
                        rowip_td.setAttribute("class", "Td_for_ipadd");
                        let stip = snex[x].ip;
                        const ipar = stip.split(".")
                        let ipadd = ipar[3];
                        rowip_td.innerText = ipadd;
                        IP_N0_ROW.appendChild(rowip_td);

                        let updatetime = document.createElement("div");
                        updatetime.setAttribute("class", "ip_update_div");
                        let tec = snex[x].date;
                        const iii = tec.split(" ");
                        let ip_jst_dt = `${iii[1]}-${iii[2]} ${iii[3]}`;
                        const fl = ip_jst_dt.split(":");
                        ip_jst_dt = `LAST UPDATED :${fl[0]}:${fl[1]}`;
                        updatetime.innerText = ip_jst_dt;
                        rowip_td.appendChild(updatetime)


                        //TIME CHECK
                        let diff = ggetdiff(snex[x].date);
                        if (diff > 3 || diff == "invalid month") {
                            rowip_td.style.background = "yellow";
                            updatetime.style.background = "red";
                            let printdate = `Updated ${Math.round(diff)} mins ago`
                            updatetime.innerText = printdate;
                            console.log(diff);
                        }
                        console.log(`for this ip is ${diff} mins behind `);
                        ////////////////////////




                        //////////////FOR IP /////

                        //////////////FOR CACHE


                        let cacherow = document.getElementById(tablename + "_cache")
                        let tdcache = document.createElement("td");
                        tdcache.innerText = snex[x].CACHE[0];
                        tdcache.setAttribute("class", "cachetdforip");
                        cacherow.appendChild(tdcache);

                        //////////////FOR CACHE ////


                        //////////////////////////////////////////////////////////////// ///////////ISOLATOR

                        for (const iso in snex[x].ISOLATOR) {


                            let currowid = tablename + "_" + iso + "_tr";
                            console.log(currowid);
                            let thisrow = document.getElementById(currowid);

                            if (thisrow == null) {
                                console.log("dekh isme to aya hai ");
                                let table1 = document.getElementById(tablename + "_tb")
                                let newrow = document.createElement("tr");
                                newrow.setAttribute("id", currowid);
                                ROW_IS.push(currowid);
                                newrow.setAttribute("class", "isolator_row");
                                table1.appendChild(newrow);


                                let iso_td = document.createElement("td");
                                iso_td.setAttribute("class", "isoltator_title");
                                newrow.appendChild(iso_td);

                                iso_td.innerText = iso;

                                let iso_port = document.createElement("td");
                                iso_port.setAttribute("class", "iso_port");

                                newrow.appendChild(iso_port);
                                iso_port.innerText = snex[x].ISOLATOR[iso][0];

                                let iso_st = document.createElement("td");
                                iso_st.setAttribute("id", x + "_" + iso + "_td");


                                for (let i = 0; i < count; i++) {
                                    let blank = document.createElement("td");
                                    blank.style.backgroundColor = "black";
                                    newrow.appendChild(blank);
                                    console.log("dekh isme print kiya maine blank")

                                }

                                newrow.appendChild(iso_st);
                                let st = snex[x].ISOLATOR[iso][1];
                                iso_st.innerText = snex[x].ISOLATOR[iso][2];
                                if (st == 0) {
                                    iso_st.style.backgroundColor = "#d71111"
                                    div_order -= 2;


                                }

                                else {
                                    iso_st.style.backgroundColor = "#1bf0f0cf"

                                }

                            }
                            else {


                                console.log("dekh isme  bhi to aya hai ");
                                let table1 = document.getElementById(tablename + "_tb");
                                let newrow = document.getElementById(currowid);
                                let iso_st = document.createElement("td");
                                newrow.appendChild(iso_st);
                                iso_st.setAttribute("id", x + "_" + iso + "_td");

                                let st = snex[x].ISOLATOR[iso][1];
                                iso_st.innerText = snex[x].ISOLATOR[iso][2];
                                if (st == 0) {
                                    iso_st.style.backgroundColor = "#d71111"
                                    div_order -= 2;

                                }

                                else {
                                    iso_st.style.backgroundColor = "#1bf0f0cf"

                                }



                            }



                        }

                    }

                    else {
                        console.log(x + "does not exist")


                        //////////////FOR IP


                        let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                        let rowip_td = document.createElement("td");
                        rowip_td.setAttribute("class", "Td_for_ipadd");
                        rowip_td.innerText = "NO DATA";
                        IP_N0_ROW.appendChild(rowip_td);

                        //////////////FOR IP /////

                        //////////////FOR CACHE
                        let cacherow = document.getElementById(tablename + "_cache")
                        let tdcache = document.createElement("td");
                        tdcache.innerText = "NO DATA";
                        tdcache.setAttribute("class", "cachetdforip");
                        cacherow.appendChild(tdcache);

                        //////////////FOR CACHE /////


                    }
                }
                catch {
                    console.log("kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

                }
                count++;

            }

            console.log(count);
            console.log(ROWs.length);

            console.log("abhi count itna hai " + count);




            ROW_IS.forEach(row => {

                let ROWd = document.getElementById(row);

                let boxid = row.replace("_tr", "_td");
                boxid = boxid.replace(tablename, x);
                console.log(boxid);


                let BoxMain = document.getElementById(boxid);
                if (BoxMain == null) {
                    let blank = document.createElement("td");
                    // blank.style.backgroundColor = "black";
                    try {
                        // let blank = document.createElement("td");
                        let chk1 = snex[x];

                        if (typeof chk1 == "object") {

                            //blank.innerText = "nodata"
                            blank.style.backgroundColor = "black";

                            console.log("iska data tha to blank bhara")

                        }
                        else {
                            blank.innerText = "no data";
                            blank.setAttribute("class", "blinkbroker");
                            blank.style.backgroundColor = "black";
                            blank.style.color = "white";
                            console.log("iska data nhi tha to text bhara no data ")

                        }



                    }
                    catch (err) {
                        console.log("maine black bhara for the rest ");

                    }

                    //blank.style.border-collapse(collapse);
                    ROWd.appendChild(blank);
                }

            })





        })

        console.log(ROW_IS);
        /////////////////STRICTLY FOR BROKER
        count = 0;
        ROWs = [];
        tablename = "";
        ISOcount = 0;
        TABLE_STRUCT_DATA[key].forEach(x => {

            // let divmain;
            // let table1;

            if (count == 0) {

                tablename = x;

            }
            //////////////////////////////////////FOR FIRST IP TABLE
            if (count == 0) {
                count++;



                let chk = 0;
                ///////////to print all the ips and brokers
                try {
                    if (typeof snex[x] == "object") {
                        console.log(x + "this thing exists")

                        for (const bk in snex[x].BROKER) {

                            let table1 = document.getElementById(tablename + "_tb");
                            let TRID = x + "_" + bk + "_tr";
                            ROWs.push(TRID);
                            console.log(TRID);

                            let rownm = document.createElement("tr");
                            rownm.setAttribute("id", TRID);
                            let tdbknm = document.createElement("td");
                            tdbknm.innerText = bk;
                            rownm.appendChild(tdbknm);
                            tdbknm.setAttribute("class", "BROKERNAME_TD")

                            let tdport = document.createElement("td");
                            tdport.innerText = snex[x].BROKER[bk][0];
                            rownm.appendChild(tdport);
                            tdport.setAttribute("class", "BK_PORTno_TD")


                            let tdstatus = document.createElement("td");



                            let tooltipdiv = document.createElement("div");
                            //  tooltipdiv.innerText = `${snex[x].BROKER[bk][2]} ${snex[x].BROKER[bk][4]}`;



                            let stip = snex[x].ip;
                            const ipar = stip.split(".")
                            let ipadd = ipar[3];




                            tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                                                                     TOTAL : ${snex[x].BROKER[bk][2]}
                                                                     CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                                                                     ESTABLISHED : ${snex[x].BROKER[bk][5]}
                                                                     TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                                 `;
                            tooltipdiv.setAttribute("class", "tool_tip_div");



                            tdstatus.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][4];
                            tdid = x + "_" + bk + "_td";
                            tdstatus.setAttribute("id", tdid)

                            rownm.appendChild(tdstatus);
                            tdstatus.appendChild(tooltipdiv);

                            if (snex[x].BROKER[bk][1] == 0) {
                                tdstatus.style.backgroundColor = "#d71111";
                                tdstatus.innerText = "DOWN"
                                div_order -= 2;

                            }
                            else {
                                tdstatus.style.backgroundColor = "#289b28";
                            }
                            if (snex[x].BROKER[bk][4] > 100) {

                                tdstatus.style.backgroundColor = "coral";
                                div_order -= 1;


                            }
                            table1.appendChild(rownm);
                            // rownm.style.b = "2px solid red";
                        }


                    }
                    else {

                        console.log(x + "this thing doesnot exists")
                    }

                }
                catch (err) {
                    console.log(err);
                }

            }
            /////////////////////////////FIRST IP TABLE END


            else {

                try {
                    if (typeof snex[x] == "object") {

                        for (const bk in snex[x].BROKER) {
                            let id = tablename + "_" + bk + "_tr";

                            let MAINROW = document.getElementById(id);

                            if (MAINROW == null) {

                                let MAINROW = document.createElement("tr");
                                MAINROW.setAttribute("id", id);
                                ROWs.push(id);
                                let tdbknm = document.createElement("td");
                                tdbknm.setAttribute("class", "BROKERNAME_TD");
                                tdbknm.innerText = bk;
                                MAINROW.appendChild(tdbknm);

                                let tdport = document.createElement("td");
                                tdport.innerText = snex[x].BROKER[bk][0];
                                tdport.setAttribute("class", "BK_PORTno_TD")
                                MAINROW.appendChild(tdport);


                                /////filling blanks before td
                                for (let i = 0; i < count; i++) {
                                    let blank = document.createElement("td");
                                    blank.style.backgroundColor = "black";
                                    MAINROW.appendChild(blank);

                                }

                                let tdstatus = document.createElement("td");
                                tdstatus.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][4];
                                let stip = snex[x].ip;
                                const ipar = stip.split(".")
                                let ipadd = ipar[3];



                                let tooltipdiv = document.createElement("div");
                                tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                                 TOTAL : ${snex[x].BROKER[bk][2]}
                                 CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                                 ESTABLISHED : ${snex[x].BROKER[bk][5]}
                                 TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                                `;
                                tooltipdiv.setAttribute("class", "tool_tip_div");
                                tdstatus.appendChild(tooltipdiv);

                                tdid = x + "_" + bk + "_td";
                                tdstatus.setAttribute("id", tdid)

                                MAINROW.appendChild(tdstatus);
                                tdstatus.appendChild(tooltipdiv);


                                if (snex[x].BROKER[bk][1] == 0) {
                                    tdstatus.style.backgroundColor = "#d71111";
                                    tdstatus.innerText = "DOWN"
                                    div_order -= 2;

                                }
                                else {
                                    tdstatus.style.backgroundColor = "#289b28";
                                }

                                if (snex[x].BROKER[bk][4] > 100) {

                                    tdstatus.style.backgroundColor = "coral";
                                    div_order -= 1;


                                }


                                let maintable = document.getElementById(tablename + "_tb");
                                maintable.appendChild(MAINROW);
                            }
                            else {
                                //let td = x + bk + "_td";
                                let td = document.createElement("td");

                                tdid = x + "_" + bk + "_td";

                                td.setAttribute("id", tdid)
                                td.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][4];


                                let tooltipdiv = document.createElement("div");
                                let stip = snex[x].ip;
                                const ipar = stip.split(".")
                                let ipadd = ipar[3];
                                tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                                                                    TOTAL : ${snex[x].BROKER[bk][2]}
                                                                    CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                                                                    ESTABLISHED : ${snex[x].BROKER[bk][5]}
                                                                    TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                                `;
                                tooltipdiv.setAttribute("class", "tool_tip_div");
                                td.appendChild(tooltipdiv);

                                if (snex[x].BROKER[bk][1] == 0) {
                                    td.style.backgroundColor = "#d71111";
                                    td.innerText = "DOWN";
                                    div_order -= 2;

                                }
                                else {
                                    td.style.backgroundColor = "#289b28";
                                }

                                if (snex[x].BROKER[bk][4] > 100) {

                                    td.style.backgroundColor = "coral";
                                    div_order -= 1;

                                }
                                MAINROW.appendChild(td);
                                td.appendChild(tooltipdiv);

                            }

                        }



                    }

                    else {
                        console.log(x + "does not exist")


                        //////////////FOR IP


                        // let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                        // let rowip_td = document.createElement("td");
                        // rowip_td.setAttribute("class", "Td_for_ipadd");
                        // rowip_td.innerText = "NO DATA";
                        // IP_N0_ROW.appendChild(rowip_td);

                        //////////////FOR IP /////

                        //////////////FOR CACHE


                        // let cacherow = document.getElementById(tablename + "_cache")
                        // let tdcache = document.createElement("td");
                        // tdcache.innerText = "NO DATA";
                        // tdcache.setAttribute("class", "cachetdforip");
                        // cacherow.appendChild(tdcache);

                        //////////////FOR CACHE /////


                    }
                }
                catch {
                    console.log("kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

                }
                count++;

            }

            console.log(count);
            console.log(ROWs.length);

            console.log("abhi count itna hai " + count);
            ROWs.forEach(row => {

                let ROWd = document.getElementById(row);

                let boxid = row.replace("_tr", "_td");
                boxid = boxid.replace(tablename, x);
                console.log(boxid);


                let BoxMain = document.getElementById(boxid);
                if (BoxMain == null) {
                    let blank = document.createElement("td");
                    // blank.style.backgroundColor = "black";
                    try {
                        // let blank = document.createElement("td");
                        let chk1 = snex[x];

                        if (typeof chk1 == "object") {

                            // blank.innerText = "nodata"
                            blank.style.backgroundColor = "black";

                            console.log("iska data tha to blank bhara")

                        }
                        else {
                            blank.innerText = "no data";
                            blank.style.backgroundColor = "black";
                            blank.style.color = "#ff5353";
                            blank.style.opacity = "1.0"
                            blank.setAttribute("class", "blinkbroker");



                        }



                    }
                    catch (err) {
                        console.log("maine black bhara for the rest ");

                    }

                    //blank.style.border-collapse(collapse);
                    ROWd.appendChild(blank);
                }

            }


            )

        })

        let maindiv_ordersetting = document.getElementById(tablename + "_tablediv");
        console.log(tablename + "_tablediv");
        maindiv_ordersetting.style.order = div_order;

    })
}


