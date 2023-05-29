function ENify(x) {
    if (typeof x == "number") return ExpantaNum(x);
    if (typeof x == "null") return ExpantaNum(0);
    var tmp = new ExpantaNum(0);
    tmp.array = x.array;
    tmp.sign = x.sign;
    tmp.layer = x.layer;
    return tmp;
}
var ctab = 0;
function settab(tab) {
    if (ctab) document.getElementById(ctab).style = "display:none;";
    document.getElementById(tab).style = "";
    ctab = tab;
}
var cstab = 0;
function setstab(tab) {
    if (cstab) document.getElementById(cstab).style = "display:none;";
    document.getElementById(tab).style = "";
    cstab = tab;
}
inited = false;
function load() {
    game = {
        spd: 1,
        pnt: new ExpantaNum(0),
        btn: new ExpantaNum(0),
        btn_prog: new ExpantaNum(0),
        btn_cd: new ExpantaNum(0),
        btn_atb_1: new ExpantaNum(0),
        btn_atb_2: new ExpantaNum(0),
        btn_upd: [false, false, false, false, false, false],
        btn_eng_m: new ExpantaNum(0),
        eng_ul: false,
        eng: new ExpantaNum(0),
        eng_btn_m: new ExpantaNum(0),
        eng_atb: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
        eng_upd: [false, false, false, false, false, false],
        lvl_ul: false,
        lvl_num: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
        lvl_atb: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
        lvl_eng: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
        lvl_upd: [false],
        updintv: 50,
        saveintv: 1000,
        savetime: 0
    };
    ogame = game;
    if (inited != true) {
        init_lvl_table();
        init_lvl_upd();
        inited = true;
    }
    var tpg = JSON.parse(localStorage.getItem("test"));
    if (tpg != null) {
        game = tpg;
        game.pnt = ENify(game.pnt);
        game.btn = ENify(game.btn);
        game.btn_prog = ENify(game.btn_prog);
        game.btn_cd = ENify(game.btn_cd);
        game.btn_atb_1 = ENify(game.btn_atb_1);
        game.btn_atb_2 = ENify(game.btn_atb_2);
        game.btn_eng_m = ENify(game.btn_eng_m);
        game.eng = ENify(game.eng);
        game.eng_btn_m = ENify(game.eng_btn_m);
        for (var i = 0; i < 4; i++)game.eng_atb[i] = ENify(game.eng_atb[i]);
        for (var i = 0; i < 27; i++)game.lvl_num[i] = ENify(game.lvl_num[i]), game.lvl_atb[i] = ENify(game.lvl_atb[i]), game.lvl_eng[i] = ENify(game.lvl_eng[i]);
        document.getElementById("ch-loopintv-1").value = game.updintv;
        document.getElementById("ch-saveintv-1").value = game.saveintv;
        if (game.eng_ul) document.getElementById("eng-tab").style = "";
        else document.getElementById("eng-tab").style = "display:none;";
        if (game.lvl_ul) document.getElementById("lvl-tab").style = "";
        else document.getElementById("lvl-tab").style = "display:none;";
    }
    lastupd = Date.now();
    if (game.savetime) {
        var diftime = lastupd - game.savetime;
        while (diftime > 1000) loop(1000), diftime -= 1000;
        if (diftime) loop(diftime);
    }
    loopintv = setInterval(loop, game.updintv);
}
function setloop(i) {
    clearInterval(loopintv);
    game.updintv = i;
    loopintv = setInterval(loop, game.updintv);
}
function ch_loopintv() {
    setloop(parseInt(document.getElementById("ch-loopintv-1").value));
}
function ch_saveintv() {
    game.saveintv=parseInt(document.getElementById("ch-saveintv-1").value);
}
function loop(mtm=-1) {
    var tm = Date.now() - lastupd;
    lastupd = Date.now();
    if (mtm != -1) tm = mtm;
    if (mtm == -1 && Date.now() > game.savetime + game.saveintv) save();
    tm *= game.spd;

    game.btn_cd = game.btn_cd.sub(tm).max(0);
    if (game.btn_upd[1]) game.btn_prog = game.btn_prog.add(btn_atb1_eff().mul(tm / 1000).mul(btn_dis().div(1000).max(0).add(1).pow(0.25)));
    else game.btn_prog = game.btn_prog.add(btn_atb1_eff().mul(tm / 1000));
    var ti = 0;
    if (game.btn_upd[5]) game.btn = game.btn_prog.div(10).pow(0.5).mul(10);
    else while (game.btn_prog.gte(btn_cst())) {
        game.btn_prog = game.btn_prog.sub(btn_cst()), game.btn = game.btn.add(1);
        if (game.pnt.gte(1e12)) {
            get_btn_upd_btf(6);
            break;
        }
        ti++;
        if (ti == 10000) break;
    }
    if (game.btn_upd[0]) game.pnt = game.pnt.add(btn_atb2_eff().mul(tm).mul(pnt_btn_icd()).mul(game.btn_eng_m.add(1)));
    game.btn_eng_m = game.btn_eng_m.add(game.pnt.add(1).log10().add(1).pow(0.5).sub(1).div(100).mul(tm / 1000));

    game.eng = game.eng.add(eng_atb_eff(1).mul(tm / 1000));
    game.eng_atb[0] = game.eng_atb[0].add(eng_atb_eff(2).mul(tm / 1000));
    if (game.lvl_upd[1]) game.eng_atb[2] = game.eng_atb[2].add(eng_atb_eff(4).add(1).pow(1 / 15).sub(1).mul(tm / 1000));
    if (game.eng_upd[4]) for (var i = 1; i <= 4; i++)get_eng_atb_btf(i, 1);
    if (game.eng_upd[5]) game.btn_eng_m = game.btn_eng_m.add(eng_to_btn_val().mul(tm / 1000)), game.eng_btn_m = game.eng_btn_m.add(btn_to_eng_val().mul(tm / 1000));

    lvl_val_upd(tm);

    btn_disp_upd();
    eng_disp_upd();
    lvl_disp_upd();
    upd_upd();

    document.getElementById("ch-loopintv-2").innerHTML = game.updintv;
    document.getElementById("ch-saveintv-2").innerHTML = game.saveintv;
    if (game.pnt.gte(1e12)) game.eng_ul = true;
    if (game.eng.gte(ExpantaNum("1e1200"))) game.lvl_ul = true;
    if (game.eng_ul) document.getElementById("eng-tab").style = "";
    else document.getElementById("eng-tab").style = "display:none;";
    if (game.lvl_ul) document.getElementById("lvl-tab").style = "";
    else document.getElementById("lvl-tab").style = "display:none;";
}
function crt_upd(cl, st, cl2, st2, cl3, st3, id, gb, ib, ob, str) {
    var a = document.createElement("button");
    a.className = cl;
    a.style = st;
    a.id = id;
    a.upd_id = upd_hdl.length;
    a.appendChild(str);
    a.addEventListener("click", function () { buy_upd(this.upd_id); });
    upd_hdl.push([cl, st, cl2, st2, cl3, st3, id, gb, ib, ob]);
    return a;
}
upd_hdl = [];
function upd_upd() {
    for (var i = 0; i < upd_hdl.length; i++) {
        if (upd_hdl[i][7]()) document.getElementById(upd_hdl[i][6]).className = upd_hdl[i][4], document.getElementById(upd_hdl[i][6]).style = upd_hdl[i][5];
        else if (upd_hdl[i][8]()) document.getElementById(upd_hdl[i][6]).className = upd_hdl[i][2], document.getElementById(upd_hdl[i][6]).style = upd_hdl[i][3];
        else document.getElementById(upd_hdl[i][6]).className = upd_hdl[i][0], document.getElementById(upd_hdl[i][6]).style = upd_hdl[i][1];
    }
}
function buy_upd(i) {
    if (!upd_hdl[i][7]() && upd_hdl[i][8]()) upd_hdl[i][9]();
}