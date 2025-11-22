



async function makeonetable(LIST_JSON, key, snex, zone, W) {

    let PRarr = LIST_JSON.PR
    let DRarr = LIST_JSON.DR
    let UNIFIEDarr = [...PRarr, ...DRarr]

    let ARR = [];
    if (zone == 'PR') {
        ARR = PRarr;
    } else if (zone == 'DR') {
        ARR = DRarr;
    } else if (zone == 'UNIFIED') {
        ARR = UNIFIEDarr;
    } else {
        console.error(`ZONE SPECIFIED IS WRONG IT CAN EITHER BE PR/DR/UNIFIED only `)
    }




    console.log(ARR);
    //////////////////////////////MaIN snex has whole json
    let div_order = 0;
    let count = 0;
    let ROWs = [];
    let tablename = "";
    let ISOcount = 0;
    let ROW_IS = [];
    //////////////////////////////////Making tables based on PR DR UNIFIED in the zone


    /////////////////STRICTLY FOR ISOLATOR
    ARR.forEach(x => {

        // let divmain;
        // let table1;
        //////////////////////////// CREATE TABLE AND THE TITLE DIV INSIDE IT  AND TABLE
        if (count == 0) {

            tablename = x;
            title_div_str = x;
            let title_table_div = document.createElement("div");
            const replaced = title_div_str.replace(/[0-9]/g, '');
            title_div_str = replaced.toUpperCase();
            title_table_div.setAttribute("class", "table_title_div");
            title_table_div.innerText = key;

            title_table_div.onclick = function () {
                let d = document.getElementById('pin_div')
                const id = x + "_tablediv"
                let m = document.getElementById(id)
                let parent = m.parentElement


                if (parent.id == 'tablecontainer_div') {

                    d.append(m)
                }
                else {
                    let par = document.getElementById('tablecontainer_div')
                    par.append(m)

                }


            };

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
            ////////////////////////////////   CATCH THE TABLE MADE ABOVE ;

            let table1 = document.getElementById(x + "_tb")


            /////////////// first row for defining zones if UNIFIED IS being made

            if (zone == 'UNIFIED') {
                let tr_zone = document.createElement("tr");
                tr_zone.setAttribute("id", x + "_zone");


                let zonename = document.createElement("td")
                zonename.innerText = "ENVIRONMENT";
                zonename.setAttribute("class", "Zone_title");
                zonename.setAttribute("colspan", "2");
                tr_zone.appendChild(zonename);

                let td_zone = document.createElement("td")
                td_zone.innerText = "PR";
                td_zone.setAttribute("class", "zone_pr_title");
                const tdprlen = PRarr.length;
                td_zone.style.background = 'blue'
                td_zone.setAttribute("colspan", tdprlen);
                tr_zone.appendChild(td_zone);

                let td_zone_dr = document.createElement("td")
                td_zone_dr.innerText = "DR";
                td_zone_dr.setAttribute("class", "zone_dr_title");
                const tddrlen = DRarr.length
                td_zone_dr.setAttribute("colspan", tddrlen);
                td_zone_dr.style.background = '#9426d9c7'
                tr_zone.appendChild(td_zone_dr);
                table1.appendChild(tr_zone)
            }

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
                                   
                  ////////////////////////////////////////////BROKER RESTART ///////////////////////
		
            let brokres_row = document.createElement("tr");
            brokres_row.setAttribute("class", "brokerres_row");
            brokres_row.setAttribute("id", tablename + "_brokerr");
            table1.appendChild(brokres_row);
            let tdbrokres_title = document.createElement("td");

            tdbrokres_title.innerText = "BROKER";
            tdbrokres_title.setAttribute("class", "BROKERR_title");
            brokres_row.appendChild(tdbrokres_title);
            let tdbrokres_blank = document.createElement("td");
            tdbrokres_blank.innerText = "Last Broker Restart";
            tdbrokres_blank.setAttribute("class", "lsthitb_title")
            brokres_row.appendChild(tdbrokres_blank);


	      ///////////////////////////////////////////BROKER RESTART ////////////////////////////////////



            ////////////CACHE_MAINROW//////////////////////////////////////////////////////////////////////////////
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



            ////////////SYSTEM_POINGING//////////////////////////////////////////////////////////////////////////////
            let system_row = document.createElement("tr");
            system_row.setAttribute("class", "system_p_row");
            system_row.setAttribute("id", tablename + "_p_system");
            table1.appendChild(system_row);
            let s_p_desc = document.createElement("td");

            s_p_desc.innerText = "POINTING";
            s_p_desc.setAttribute("class", "SYSTEM_title");
            system_row.appendChild(s_p_desc);
            let tdsystempointing = document.createElement("td");
            tdsystempointing.innerText = "system.api";
            tdsystempointing.setAttribute("class", "SYSTEM_NAME")
            system_row.appendChild(tdsystempointing);
            ////////////SYSTEM_POINGING////////////////////////


            ////////////cbssi_POINTING//////////////////////////////////////////////////////////////////////////////
            let cbssi_p_row = document.createElement("tr");
            cbssi_p_row.setAttribute("class", "system_p_row");
            cbssi_p_row.setAttribute("id", tablename + "_p_cbssi");
            table1.appendChild(cbssi_p_row);
            let cbssi_p_desc = document.createElement("td");

            cbssi_p_desc.innerText = "POINTING";
            cbssi_p_desc.setAttribute("class", "SYSTEM_title");
            cbssi_p_row.appendChild(cbssi_p_desc);
            let tdcbssipointing = document.createElement("td");
            tdcbssipointing.innerText = "cbssi.sbi.co.in";
            tdcbssipointing.setAttribute("class", "SYSTEM_NAME")
            cbssi_p_row.appendChild(tdcbssipointing);

            ////////////cbssi_POINTING////////////////////////


    ////////////IMAGE POINTING //////////////////////////////////////////////////////////////////////////////
       //       let image_p_row = document.createElement("tr");
         //     image_p_row.setAttribute("class", "system_p_row");
       //       image_p_row.setAttribute("id", tablename + "_p_image");
        //      table1.appendChild(image_p_row);
       //       let image_p_desc = document.createElement("td");

       //       image_p_desc.innerText = "POINTING";
      //        image_p_desc.setAttribute("class", "SYSTEM_title");
      //        image_p_row.appendChild(image_p_desc);
      //        let tdimagepointing = document.createElement("td");
      //        tdimagepointing.innerText = "image_db";
      //        tdimagepointing.setAttribute("class", "SYSTEM_NAME")
      //        image_p_row.appendChild(tdimagepointing);

////////////POINTING ////////////////////////






            ////////////AADHAR_POINTING//////////////////////////////////////////////////////////////////////////////
            let aa_p_row = document.createElement("tr");
            aa_p_row.setAttribute("class", "adhar_p_row");
            aa_p_row.setAttribute("id", tablename + "_p_adhar");
            table1.appendChild(aa_p_row);
            let aa_p_desc = document.createElement("td");

            aa_p_desc.innerText = "POINTING";
            aa_p_desc.setAttribute("class", "POINTING_title");
            aa_p_row.appendChild(aa_p_desc);
            let tdadharpointing = document.createElement("td");
            tdadharpointing.innerText = "AADHAR";
            tdadharpointing.setAttribute("class", "POINTING_NAME")
            aa_p_row.appendChild(tdadharpointing);
            ////////////AADHAR_POINTING////////////////////////


            ////////////CBS_POINTING//////////////////////////////////////////////////////////////////////////////
            let cbs_p_row = document.createElement("tr");
            cbs_p_row.setAttribute("class", "adhar_p_row");
            cbs_p_row.setAttribute("id", tablename + "_p_cbs");
            table1.appendChild(cbs_p_row);
            let cbs_p_desc = document.createElement("td");

            cbs_p_desc.innerText = "POINTING";
            cbs_p_desc.setAttribute("class", "POINTING_title");
            cbs_p_row.appendChild(cbs_p_desc);
            let tdcbspointing = document.createElement("td");
            tdcbspointing.innerText = "CBS";
            tdcbspointing.setAttribute("class", "POINTING_NAME")
            cbs_p_row.appendChild(tdcbspointing);

            ////////////CBS_POINTING////////////////////////

            // let chk = 0;
            ///////////to print all the ips and brokers
            try {
                if (typeof snex[x] == "object") {
                    // console.log(x + "this thing exists")

                    //////////////FOR IP

                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "Td_for_ipadd");
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    let stip = snex[x].ip;
                    const ipar = stip.split(".")
                    if (ipar[2] === '25' || ipar[2] === '41') {
                        rowip_td.style.background = colour25
                    }
                    else {
                        rowip_td.style.background = colour24
                    }
                    ipadd = ipar[2] + '.' + ipar[3];


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


                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + "?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5543/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;

                    //TIME CHECK
                    let diff = getdiff(snex[x].date);
                    if (diff > 9 || diff == "invalid month") {
                        rowip_td.style.background = "yellow";
                        updatetime.style.background = "red";
                        let printdate = `Updated ${Math.round(diff)} mins ago`
                        updatetime.innerText = printdate;
                        // console.log(diff);
                    }
                    // console.log(`for this ip is ${diff} mins behind `);
                    ////////////////////////


                    //////////////FOR IP /////
	
               /////////////////////BROKER RESTART 
			

		        let tdbrokres = document.createElement("td");
                     tdbrokres.innerText = snex[x].BROKER_RESTART[0];
                    tdbrokres.setAttribute("class", "brokerr_tdforip");
                     tdbrokres.setAttribute("id", `${x}_brokres_td`)
                    
			try {
                        if (snex[x].BROKER_RESTART[1]){
                            if (snex[x].BROKER_RESTART[1] == '1'){
                                tdbrokres.style.backgroundColor = 'green'
                            }
                            else if (snex[x].BROKER_RESTART[1] == '0'){
                                tdbrokres.style.backgroundColor = 'red'
                            }
                            else{
                                tdbrokres.style.backgroundColor = 'orange'
                            }
                        }
                        else{
                            console.log(`no data for cache colour `)
                        }
                    }catch{
                        console.log(`unable to change cache colour `)
                    }

	             brokres_row.appendChild(tdbrokres);


 

	

                    ///////////CACHE
                   let tdcache = document.createElement("td");
                    tdcache.innerText = snex[x].CACHE[0];
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)
                   /////checking if cache check passed or failed
                    try {
                        if (snex[x].CACHE[1]){
                            if (snex[x].CACHE[1] == '1'){
                                tdcache.style.backgroundColor = 'green'
                            }
                            else if (snex[x].CACHE[1] == '0'){
                                tdcache.style.backgroundColor = 'red'
                            }
                            else{
                                tdcache.style.backgroundColor = 'orange'
                            }
                        }
                        else{
                            console.log(`no data for cache colour `)
                        }
                    }catch{
                        console.log(`unable to change cache colour `)
                    }

                    cacherow.appendChild(tdcache);

                    ///////////CACHE\\\\\\\\\\\\\\\\\\\\\



                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystemp = document.createElement("td");
                    try {
                        if (snex[x]['system.api'][0]) {
                            tdsystemp.innerText = snex[x]['system.api'][0];
                        }
                        else {
                            tdsystemp.innerText = "No Data"
                        }
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }
                    catch {
                        //    // console.log(`no system.api found `)
                        tdsystemp.innerText = "No Data"
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }

                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSsi
                    let cbssi = document.getElementById(tablename + "_p_cbssi");
                    let tdcbssi = document.createElement("td");
                    try {
                        if (snex[x]['cbssi.sbi.co.in'][0]) {
                            tdcbssi.innerText = snex[x]['cbssi.sbi.co.in'][0];
                        }
                        else {
                            tdcbssi.innerText = "No Data"
                        }

                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    } catch {
                        tdcbssi.innerText = "No Data"
                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    }

                    ///////////CBSsi\\\\\\\\\\\\\\\\\\\\\



                    ///////////image
        //            let image = document.getElementById(tablename + "_p_image");
        //            let tdimage = document.createElement("td");
        //            try {
        //                if (snex[x]['imagedb.core'][0]) {

                            //  tdimage.innerText = snex[x]['imagedb.core'][0];
         //                   const pointing =  snex[x]['imagedb.core'][0].trim() ;
         //                   if (pointing  == "i015bani" ){
         //                       tdimage.innerText = 'PR'
         //                   }
         //                   else if  (pointing == "i015bani_hyd" ){
         //                       tdimage.innerText = 'DR'
         //                   } else if  (pointing == "i015bani_nr" ){
         //                       tdimage.innerText = 'NR'
         //                   }else
         //                   {
         //                       tdimage.innerText = 'X'
          //                      tdimage.style.background = 'red'
          //                  }
//
  //                      }
//
    //                    else {
    //                        tdimage.innerText = "No Data"
    //                    }
//
  //                      tdimage.setAttribute("class", "imagetdforip");
    //                    tdimage.setAttribute("id", `${x}_image_p_td`)
    //                    image.appendChild(tdimage);
    //                } catch {
     //                   tdimage.innerText = "No Data"
     //                   tdimage.setAttribute("class", "imagetdforip");
     //                   tdimage.setAttribute("id", `${x}_image_p_td`)
     //                   image.appendChild(tdimage);
      //              }

                    ///////////image\\\\\\\\\\\\\\\\\\\\\



                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    if (snex[x].AADHAR_POINTING[0]) {
                        tdaadhar.innerText = snex[x].AADHAR_POINTING[0];
                    }
                    else {
                        tdaadhar.innerText = "No Data"
                    }

                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\






                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    if (snex[x].CBS_POINTING[0]) {
                        tdcbs.innerText = snex[x].CBS_POINTING[0];
                    }
                    else {
                        tdcbs.innerText = "No Data"
                    }

                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\








                    ///////////ISOLATOR

                    for (const iso in snex[x].ISOLATOR) {

                        let currowid = tablename + "_" + iso + "_tr";
                        // console.log(currowid);
                        let thisrow = document.getElementById(currowid);

                        if (thisrow == null) {
                            // console.log("dekh isme to aya hai");
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
                                // console.log("dekh isme print kiya maine blank")

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

                            // console.log("dekh isme  bhi to aya hai ");
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
			////////////NODATA BROKER RESTART
		
			 let tdbrokres = document.createElement("td");
                           tdbrokres.innerText = "NODATA";
                    tdbrokres.setAttribute("class", "NODATA_CACHE");
                    brokres_row.appendChild(tdbrokres);

                    ////NODATA CACHE
                    // console.log(x + "this thing doesnot exists")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = "NODATA";
                    tdcache.setAttribute("class", "NODATA_CACHE");
                    cacherow.appendChild(tdcache);
                }
            }
            catch (err) {
                // console.log(err);
            }

            count++;

        }
        /////////////////////////////FIRST IP TABLE END


        else {
            let idth = tablename + "_th";
            // console.log(idth);
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
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    let stip = snex[x].ip;
                    const ipar = stip.split(".")
                    let ipadd = ipar[3];

                    if (ipar[2] === '25' || ipar[2] === '41') {
                        rowip_td.style.background = colour25
                    }
                    else {
                        rowip_td.style.background = colour24
                    }
                    ipadd = ipar[2] + '.' + ipar[3];


                    rowip_td.innerText = ipadd;

                    IP_N0_ROW.appendChild(rowip_td);




                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + " ?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5543/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;





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
                    let diff = getdiff(snex[x].date);
                    if (diff > 9 || diff == "invalid month") {
                        rowip_td.style.background = "yellow";
                        updatetime.style.background = "red";
                        let printdate = `Updated ${Math.round(diff)} mins ago`
                        updatetime.innerText = printdate;
                        // console.log(diff);
                    }
                    // console.log(`for this ip is ${diff} mins behind `);
                    ////////////////////////
                    //////////////FOR IP ////
                  //////////////////////////BROKER RESTART

                         let brokres_row = document.getElementById(tablename + "_brokerr")
                  	 let tdbrokres = document.createElement("td");
                       tdbrokres.innerText = snex[x].BROKER_RESTART[0];
                       tdbrokres.setAttribute("class", "brokerr_tdforip");
                       tdbrokres.setAttribute("id", `${x}_brokres_td`)
		       
			try {
    if (snex[x].BROKER_RESTART[1]){
        if (snex[x].BROKER_RESTART[1] == '1'){
             tdbrokres.style.backgroundColor = 'green'
        }
        else if (snex[x].BROKER_RESTART[1] == '0'){
             tdbrokres.style.backgroundColor = 'red'
        }
        else{
             tdbrokres.style.backgroundColor = 'orange'
        }
    }
    else{
        console.log(`no data for cache colour `)
    }
}catch{
    console.log(`unable to change cache colour `)
}

                       brokres_row.appendChild(tdbrokres);


                    //////////////FOR CACHE
                   let cacherow = document.getElementById(tablename + "_cache")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = snex[x].CACHE[0];
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)


/////checking if cache check passed or failed
try {
    if (snex[x].CACHE[1]){
        if (snex[x].CACHE[1] == '1'){
            tdcache.style.backgroundColor = 'green'
        }
        else if (snex[x].CACHE[1] == '0'){
            tdcache.style.backgroundColor = 'red'
        }
        else{
            tdcache.style.backgroundColor = 'orange'
        }
    }
    else{
        console.log(`no data for cache colour `)
    }
}catch{
    console.log(`unable to change cache colour `)
}

cacherow.appendChild(tdcache);


                    //////////////FOR CACHE ////

                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystemp = document.createElement("td");
                    try {
                        if (snex[x]['system.api'][0]) {
                            tdsystemp.innerText = snex[x]['system.api'][0];
                        }
                        else {
                            tdsystemp.innerText = "No Data"
                        }
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }
                    catch {
                        //    // console.log(`no system.api found `)
                        tdsystemp.innerText = "No Data"
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }

                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSsi
                    let cbssi = document.getElementById(tablename + "_p_cbssi");
                    let tdcbssi = document.createElement("td");
                    try {
                        if (snex[x]['cbssi.sbi.co.in'][0]) {
                            tdcbssi.innerText = snex[x]['cbssi.sbi.co.in'][0];
                        }
                        else {
                            tdcbssi.innerText = "No Data"
                        }

                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    } catch {
                        tdcbssi.innerText = "No Data"
                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    }

                    ///////////CBSsi\\\\\\\\\\\\\\\\\\\\\




                    ///////////image
        //            let image = document.getElementById(tablename + "_p_image");
        //            let tdimage = document.createElement("td");
        //            try {
        //                if (snex[x]['imagedb.core'][0]) {
                            // tdimage.innerText = snex[x]['imagedb.core'][0];
        //                    const pointing =  snex[x]['imagedb.core'][0].trim() ;
      //                      if (pointing  == "i015bani" ){
        //                        tdimage.innerText = 'PR'
        //                    }
        //                    else if  (pointing == "i015bani_hyd" ){
        //                        tdimage.innerText = 'DR'
        //                    } else if  (pointing == "i015bani_nr" ){
        //                        tdimage.innerText = 'NR'
        //                    }else
         //                   {
          //                      tdimage.innerText = 'X'
         //                       tdimage.style.background = 'red'
          //                  }

            //            }
           //             else {
           //                 tdimage.innerText = "No Data"
           //             }

           //             tdimage.setAttribute("class", "imagetdforip");
          //              tdimage.setAttribute("id", `${x}_image_p_td`)
         //               image.appendChild(tdimage);
        //            } catch {
          //              tdimage.innerText = "No Data"
         //               tdimage.setAttribute("class", "imagetdforip");
         //               tdimage.setAttribute("id", `${x}_image_p_td`)
         //               image.appendChild(tdimage);
         //           }

                    ///////////image\\\\\\\\\\\\\\\\\\\\\








                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    if (snex[x].AADHAR_POINTING[0]) {
                        tdaadhar.innerText = snex[x].AADHAR_POINTING[0];
                    }
                    else {
                        tdaadhar.innerText = "No Data"
                    }

                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    if (snex[x].CBS_POINTING[0]) {
                        tdcbs.innerText = snex[x].CBS_POINTING[0];
                    }
                    else {


                        tdcbs.innerText = "No Data"
                    }

                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\


                    //////////////////////////////////////////////////////////////// ///////////ISOLATOR

                    for (const iso in snex[x].ISOLATOR) {


                        let currowid = tablename + "_" + iso + "_tr";
                        // console.log(currowid);
                        let thisrow = document.getElementById(currowid);

                        if (thisrow == null) {
                            // console.log("dekh isme to aya hai ");
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
                                // console.log("dekh isme print kiya maine blank")

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


                            // console.log("dekh isme  bhi to aya hai ");
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
                    // console.log(x + "does not exist")


                    //////////////FOR IP
                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "Td_for_ipadd");
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    rowip_td.innerText = "NO DATA";
                    IP_N0_ROW.appendChild(rowip_td);



                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + " ?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5543/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;


                    //////////////FOR IP /////
                     
			//////////////////////BROKER RESTART //////////////
			
		     let brokres_row = document.getElementById(tablename + "_brokerr")
                     let td_brokres = document.createElement("td");
                     td_brokres.innerText = "NO DATA";
		     td_brokres.setAttribute("class", "broker_tdforip");
                     td_brokres.setAttribute("id", `${x}_brokerr_td`)
                     brokres_row.appendChild(td_brokres);


                          
			////////////////////////BROKER RESRAT /////////////////////
                     //////////////FOR CACHE
                    let cacherow = document.getElementById(tablename + "_cache")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = "NO DATA";
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)
                    cacherow.appendChild(tdcache);

                    //////////////FOR CACHE /////






                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystem = document.createElement("td");
                    tdsystem.innerText = "NO DATA"
                    tdsystem.setAttribute("class", "systemtdforip");
                    tdsystem.setAttribute("id", `${x}_system_p_td`)
                    systemrow.appendChild(tdsystem);
                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSSI_P
                    let cbssirow = document.getElementById(tablename + "_p_cbssi");
                    let cbssitd = document.createElement("td");
                    cbssitd.innerText = "No Data"
                    cbssitd.setAttribute("class", "cbstdforip");
                    cbssitd.setAttribute("id", `${x}_cbssi_p_td`)
                    cbssirow.appendChild(cbssitd);
                    ///////////CBSSI_P\\\\\\\\\\\\\\\\\\\\\

                    ///////////IMAGEDB
           //         let imagedbrow = document.getElementById(tablename + "_p_image");
           //         let imagedbtd = document.createElement("td");
           //         imagedbtd.innerText = "No Data"
           //         imagedbtd.setAttribute("class", "cbstdforip");
           //         imagedbtd.setAttribute("id", `${x}_image_p_td`)
           //         imagedbrow.appendChild(imagedbtd);
                    ///////////IMAGEDB\\\\\\\\\\\\\\\\\\\\\


                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    tdaadhar.innerText = "NO DATA"
                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    tdcbs.innerText = "No Data"
                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\








                }
            }
            catch {
                // console.log("kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

            }
            count++;

        }

        // console.log(count);
        // console.log(ROWs.length);

        // console.log("abhi count itna hai " + count);

        ROW_IS.forEach(row => {

            let ROWd = document.getElementById(row);

            let boxid = row.replace("_tr", "_td");
            boxid = boxid.replace(tablename, x);
            // console.log(boxid);


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

                        // console.log("iska data tha to blank bhara")

                    }
                    else {
                        blank.innerText = "no data";
                        blank.setAttribute("class", "blinkbroker");
                        blank.style.backgroundColor = "black";
                        blank.style.color = "white";
                        // console.log("iska data nhi tha to text bhara no data ")

                    }



                }
                catch (err) {
                    // console.log("maine black bhara for the rest ");

                }

                //blank.style.border-collapse(collapse);
                ROWd.appendChild(blank);
            }

        })



    })

    // console.log(ROW_IS);

    /////////////////STRICTLY FOR BROKER
    count = 0;
    ROWs = [];
    tablename = "";
    ISOcount = 0;



    ARR.forEach(x => {
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
                    // console.log(x + "this thing exists")

                    for (const bk in snex[x].BROKER) {

                        let table1 = document.getElementById(tablename + "_tb");
                        let TRID = x + "_" + bk + "_tr";
                        ROWs.push(TRID);
                        // console.log(TRID);

                        let rownm = document.createElement("tr");
                        rownm.setAttribute("id", TRID);
                        let tdbknm = document.createElement("td");
                        tdbknm.innerText = bk;
                        rownm.appendChild(tdbknm);
                        if (typeof W[x]?.BROKER[bk] == "object") {
                            tdbknm.setAttribute("class", "BROKERNAME_TD")
                        }
                        else {
                            tdbknm.setAttribute("class", "N_BROKERNAME_TD")

                        }

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
                        tdid = x + "_" + bk + "_td_BK";
                        tdstatus.setAttribute("id", tdid)

                        if (snex[x].BROKER[bk][6]) {
                            const por = snex[x].BROKER[bk][6]
                            function clickurl() {


                                const url1 = "https://" + stip + ":" + por;
                                var x = window.open(url1, '_blank')
                                // console.log("OPENING URL>>>>")

                            }
                            tdstatus.ondblclick = clickurl;
                        }




                        rownm.appendChild(tdstatus);
                        tdstatus.appendChild(tooltipdiv);

                        if (snex[x].BROKER[bk][1] == 0) {
                            tdstatus.style.backgroundColor = "#d71111";
                            tdstatus.innerText = "DOWN"
                            div_order -= 2;


                        }
                        else {
                            tdstatus.style.backgroundColor = "#289b28";


                            if (snex[x].BROKER[bk][4] > 100) {

                                tdstatus.style.backgroundColor = "coral";
                                div_order -= 1;
                            }
                            if (snex[x].BROKER[bk][5] >= 50) {

                                tdstatus.setAttribute("class", "wow shake infinite Est-above-50 ");
                                div_order -= 100;
                            }

                        }


                        table1.appendChild(rownm);
                        // rownm.style.b = "2px solid red";
                    }


                }
                else {
                    // console.log(x + "this thing doesnot exists")
                }

            }
            catch (err) {
                // console.log(err);
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

                            if (typeof W[x]?.BROKER[bk] == "object") {
                                tdbknm.setAttribute("class", "BROKERNAME_TD")
                            }
                            else {
                                tdbknm.setAttribute("class", "N_BROKERNAME_TD")
                            }


                            // tdbknm.setAttribute("class", "BROKERNAME_TD");
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
                            tdstatus.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][2];
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

                            tdid = x + "_" + bk + "_td_BK";
                            tdstatus.setAttribute("id", tdid)
                            if (snex[x].BROKER[bk][6]) {
                                const por = snex[x].BROKER[bk][6]
                                function clickurl() {


                                    const url1 = "https://" + stip + ":" + por;
                                    var x = window.open(url1, '_blank')
                                    // console.log("OPENING URL>>>>")

                                }
                                tdstatus.ondblclick = clickurl;
                            }


                            MAINROW.appendChild(tdstatus);
                            tdstatus.appendChild(tooltipdiv);


                            if (snex[x].BROKER[bk][1] == 0) {
                                tdstatus.style.backgroundColor = "#d71111";
                                tdstatus.innerText = "DOWN"
                                div_order -= 2;

                            }
                            else {
                                tdstatus.style.backgroundColor = "#289b28";


                                if (snex[x].BROKER[bk][4] > 100) {

                                    tdstatus.style.backgroundColor = "coral";
                                    div_order -= 1;
                                }
                                if (snex[x].BROKER[bk][5] >= 50) {


                                    tdstatus.setAttribute("class", "wow shake infinite Est-above-50 ");
                                    div_order -= 100;
                                }
                            }




                            let maintable = document.getElementById(tablename + "_tb");
                            maintable.appendChild(MAINROW);
                        }
                        else {
                            //let td = x + bk + "_td";
                            let td = document.createElement("td");

                            tdid = x + "_" + bk + "_td_BK";

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
                            if (snex[x].BROKER[bk][6]) {
                                const por = snex[x].BROKER[bk][6]
                                function clickurl() {


                                    const url1 = "https://" + stip + ":" + por;
                                    var x = window.open(url1, '_blank')
                                    // console.log("OPENING URL>>>>")

                                }
                                td.ondblclick = clickurl;
                            }

                            if (snex[x].BROKER[bk][1] == 0) {
                                td.style.backgroundColor = "#d71111";
                                td.innerText = "DOWN";
                                div_order -= 2;

                            }
                            else {
                                td.style.backgroundColor = "#289b28";


                                if (snex[x].BROKER[bk][4] > 100) {
                                    td.style.backgroundColor = "coral";
                                    div_order -= 1;
                                }
                                if (snex[x].BROKER[bk][5] >= 50) {
                                    td.setAttribute("class", "wow shake infinite Est-above-50");
                                    div_order -= 100;
                                }
                            }
                            MAINROW.appendChild(td);
                            td.appendChild(tooltipdiv);

                        }

                    }
                }

                else {
                    // console.log(x + "does not exist")

                }
            }
            catch {

                // console.log(" kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

            }
            count++;

        }

        // console.log(count);
        // console.log(ROWs.length);

        // console.log("abhi count itna hai " + count);
        ROWs.forEach(row => {

            let ROWd = document.getElementById(row);

            let boxid = row.replace("_tr", "_td_BK");
            boxid = boxid.replace(tablename, x);
            // console.log(boxid);


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

                        // console.log("iska data tha to blank bhara")

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

                    // console.log("maine black bhara for the rest ");

                }

                //blank.style.border-collapse(collapse);
                try {
                    blank = document.createElement("td");
                    ROWd = document.getElementById(row);
                    blank.style.backgroundColor = "black";
                    ROWd.appendChild(blank);
                }
                catch {
                    console.log(`unable to print blank for ${row}`)

                }
            }

        }


        )

    })





    ///creating blanks in the middle of PR AND DR  if the thing is unified
    if (zone == 'UNIFIED') {

        //adding A empty td at the end to seperate pr and dr
        let thistable = document.getElementById(tablename + '_tablediv')
        let rows = thistable.getElementsByTagName('tr')
        const PRlength = PRarr.length;
        const ISO = /_zone/;
        // aceprsys09IP_th
        const HN = /IP_th/;
        for (let i = 0; i < rows.length; i++) {
            let empty_sep_td = document.createElement('td')
            // empty_sep_td.style.width = '10px'
            empty_sep_td.setAttribute('class', 'dividerdiv')
            let rowitem = rows[i];
            const id = rowitem.id;
            if (ISO.test(id)) {
                rowitem.insertBefore(empty_sep_td, rowitem.children[2])
            }
            else if (HN.test(id)) {
                const childnum = PRlength + 1;
                rowitem.insertBefore(empty_sep_td, rowitem.children[childnum])
            } else {
                const childnum = PRlength + 2;
                rowitem.insertBefore(empty_sep_td, rowitem.children[childnum])
            }
        }


    }


    ///// GIVING ORDER BASED ON STOPPED PORTS ie bk[0] = 0
    let maindiv_ordersetting = document.getElementById(tablename + "_tablediv");
    // console.log(tablename + "_tablediv");
    maindiv_ordersetting.style.order = div_order;


}




