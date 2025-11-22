







const colour24 = '#c780dd';
const colour25 = '#60c2ff';


function order(TABLE_STRUCT_DATA, snex){
    Object.keys(TABLE_STRUCT_DATA).forEach(function (key) {

        let div_order = 0;
        let divnm = TABLE_STRUCT_DATA[key][0] ;
        let tablename = `${divnm}_tablediv`

        TABLE_STRUCT_DATA[key].forEach(x => {

            let iso = snex[x].ISOLATOR
            // iso.forEach(x =>{
            //     if(x[1] == 0 ){
            //         div_order -= 2 ;
            //     }
            // })

            for (const [key,x] of Object.entries(iso)){
                if(x[1] == 0 ){
                             div_order -= 2 ;
                    }

            }

            let bk = snex[x].BROKER
            // bk.forEach(x=>{

            //     if(x[1] == 0 ){
            //         div_order -= 2 ;

            //     }
            // })

            for (const [key,x] of Object.entries(bk)){
                if(x[1] == 0 ){
                             div_order -= 2 ;
                    }

                 if (x[4] > 50) {
                        div_order -= 1;
                    }
                    if (x[5] >= 50) {
                        div_order -= 100;
                    }


            }





        })

        let m = document.getElementById(tablename) ;
        console.log(tablename)
        m.style.order = div_order;
    })

}

 /// making  function to get date diff
 function getdifff(DD) {
    function month(m) {
        let x = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const mIndex = x.indexOf(m);
        if (mIndex != -1) {
            let index = mIndex + 1;
            if (index < 10) {
                x = `0${index}`
                return x;
            }
            else {
                return index;
            }
        }
        else {
            return "invalid month"
        }
    }

    //  let DD = x[j].date ;
    let a = DD.split(' ')
    let givendate = `${a[5]}-${month(a[1])}-${a[2]}T${a[3]}`
    //console.log(givendate) ;

    // let m = "2023-11-15T15:12"
    const GD = new Date(givendate);
    const CD = new Date();
    const TimeDiff = CD.getTime() - GD.getTime();
    return TimeDiff / 60000;
 }
/////////////////////////////////////

var ISOA = [];
var BRE=[];
var CACHEA = [];
var BROKERA = [];
var IPADDA = [] ;
var CBSA = [];
var ADHA = [] ;

function refill(){
    let x = document.getElementsByTagName("td")
    ///populate all
    //payprexp01_IP_td
    for (let i = 0; i < x.length; i++) {

        const ISO = /ISOLATOR/ ;
	const BREA = /_brokres_td/;
        const CAC = /_cache_td/;
        const BR = /_td_BK/;
        const IPADD = /_IP_td/ ;
        const CBS = /_cbspointing_td/
        const ADH = /_adhrpointing_td/


        try {
            if (ISO.test(x[i].id)){
                ISOA.push(x[i].id)
            }
	     if (BREA.test(x[i].id)){
		   BRE.push(x[i].id)
             }
            if (CAC.test(x[i].id)){

                CACHEA.push(x[i].id)
            }
            if (BR.test(x[i].id)){

                BROKERA.push(x[i].id)
            }
            if (IPADD.test(x[i].id)){

                IPADDA.push(x[i].id)
            }
            if (CBS.test(x[i].id)){
                CBSA.push(x[i].id)
            }
            if (ADH.test(x[i].id)){
                ADHA.push(x[i].id)
            }


        }
	catch{
           console.log("NANOBJ")
        }
    }

    console.log(ISOA);
    console.log(BRE);	    
    console.log(CACHEA);
    console.log(BROKERA);
    console.log(IPADDA);


    fetch('real.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (DATA){
        ///REFILLL ISO IN  TABLE
	console.log(DATA);
        try{
            refilliso(DATA ,ISOA );
	    refillbrokres(DATA,BRE);	
            refillcache(DATA , CACHEA );
            refillbroker(DATA, BROKERA) ;
            refillipadd(DATA, IPADDA) ;
            refillcbs(DATA, CBSA) ;
            refilladhar(DATA, ADHA) ;
            order(TABLE_STRUCT_DATA,DATA)
        }
        catch(err){
            console.log(err)
        }

    })
}


//CBS FILLER
function refillcbs (DATA,ARR) {
    ARR.forEach( cbs  => {

        let a = cbs.split('_');
        let tdcbs  = document.getElementById(cbs) ;
        tdcbs.innerText = DATA[a[0]].CBS_POINTING[0];
        console.log(`updated cbs == >  ${cbs} `)
    });
}

//AADHAR FILLER
function refilladhar (DATA,ARR) {
    ARR.forEach( adh  => {

        let a = adh.split('_');
        let tdadh  = document.getElementById(adh) ;
        tdadh.innerText = DATA[a[0]].AADHAR_POINTING[0];
        console.log(`updated adhar == >  ${adh} `)
    });

}

//ISOLATOR FILLER
function refilliso(DATA , ARR ) {
ARR.forEach( iso  => {

    let a = iso.split('_');
    let ISO  = document.getElementById(iso) ;
    let st = DATA[a[0]].ISOLATOR[a[1]][1];
    ISO.innerText = DATA[a[0]].ISOLATOR[a[1]][2];
    if (st == 0) {
        ISO.style.backgroundColor = "#d71111"
        //div_order -= 2;
    }
    else {
        ISO.style.backgroundColor = "#1bf0f0cf"
    }
});

}


//BROKER RESTART REFILLER

function refillbrokres(DATA , ARR ) {
    ARR.forEach( brokre  => {

        let a = brokre.split('_');
        let tdbrokres  = document.getElementById(brokre) ;
        tdbrokres.innerText = DATA[a[0]].BROKER_START[0];
    });

    }



//CACHE FILLER
function refillcache(DATA , ARR ) {
    ARR.forEach( cac  => {

        let a = cac.split('_');
        let tdcache  = document.getElementById(cac) ;
        tdcache.innerText = DATA[a[0]].CACHE[0];
    });

    }


//aceprsys09_CUSTOMER_1208_SYS_td_BK
//BROKER FILLER
function refillbroker(DATA, ARR) {
let div_order = 0 ;
    ARR.forEach(x => {
        let tdstatus = document.getElementById(x);
        tdstatus.innerHTML = '' ;
        tdstatus.setAttribute("class","");

        let a = x.split('_');
        let host = x.split('_')[0];
        let bkst = (x.split('_td_BK'))[0].split('_');
        //let BR  = document.getElementById(x) ;
        let bk = ''
        for (let index = 1; index < bkst.length; index++) {
            bk = bk.concat(bkst[index]);
            if (index == (bkst.length - 1)) {
                continue;
            }
            else {
                bk = bk.concat('_')
            }
        }


        //REFILL BK
        let innerText = DATA[host].BROKER[bk][2] + "/" + DATA[host].BROKER[bk][4];


        if (DATA[host].BROKER[bk][1] == 0) {
            tdstatus.style.backgroundColor = "#d71111";
            innerText = "DOWN"
            div_order -= 2;
        }
        else {
            tdstatus.style.backgroundColor = "#289b28";

            if (DATA[host].BROKER[bk][4] > 50) {

                tdstatus.style.backgroundColor = "coral";
                div_order -= 1;
            }


        if (DATA[host].BROKER[bk][5] >= 50)
            {

                tdstatus.setAttribute("class","wow shake infinite Est-above-50");
            div_order -= 100 ;
        }

        }

        var textnode = document.createTextNode(innerText);
        tdstatus.appendChild(textnode) ;
        //REFILL BK ////////


        //REFILL TOOL TIP
        //tool_tip_div
        var tooltipdiv = document.createElement('div')
        //var tooltipdiv = tdstatus.querySelector(".tool_tip_div");

        let stip = DATA[host].ip;
        const ipar = stip.split(".")
        let ipadd = ipar[3];

        tooltipdiv.innerText = `${ipadd} : ${DATA[host].BROKER[bk][0]}
                                                 TOTAL : ${DATA[host].BROKER[bk][2]}
                                                 CLOSEWAIT : ${DATA[host].BROKER[bk][4]}
                                                 ESTABLISHED : ${DATA[host].BROKER[bk][5]}
                                                 TIMEWAIT : ${DATA[host].BROKER[bk][3]}
                                             `;
        tooltipdiv.setAttribute("class", "tool_tip_div");
        tdstatus.appendChild(tooltipdiv);
        //REFILL TOOL TIP ////////////////

    });

}

//IPADDTIME  FILLER
function refillipadd(DATA, ARR) {

    ARR.forEach(add => {

        let a = add.split('_')[0];
        let rowip_td = document.getElementById(add);
        var updatetime = rowip_td.querySelector(".ip_update_div");

        let tec = DATA[a].date;
        const iii = tec.split(" ");
        let ip_jst_dt = `${iii[1]}-${iii[2]} ${iii[3]}`;
        const fl = ip_jst_dt.split(":");
        ip_jst_dt = `LAST UPDATED :${fl[0]}:${fl[1]}`;
        updatetime.innerText = ip_jst_dt;

	let  stip = DATA[a].ip;
        const ipar = stip.split(".")
        if (ipar[2] === '25' || ipar[2] === '41') {
            rowip_td.style.background = colour25
        }
        else {
            rowip_td.style.background = colour24
        }
        ipadd = ipar[2] + '.' + ipar[3];


    //TIME CHECK
    let diff = getdifff(DATA[a].date);
    if (diff > 9 || diff == "invalid month") {
        rowip_td.style.background = "yellow";
        updatetime.style.background = "red";
        let printdate = `Updated ${Math.round(diff)} mins ago`
        updatetime.innerText = printdate;
        console.log(diff);
    }else{
        updatetime.style.background = "#ffff00";
        updatetime.innerText = ip_jst_dt;

    }
    console.log(`for ${add} this ip is ${diff} mins behind `);

    });

}

