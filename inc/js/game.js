//页,成就,新闻,有效数字
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
function load() {
    game = {
        pnt: new ExpantaNum(0),
        btn: new ExpantaNum(0),
        btn_prog: new ExpantaNum(0),
        btn_cd: new ExpantaNum(0),
        btn_atb_1: new ExpantaNum(0),
        btn_atb_2: new ExpantaNum(0),
        btn_upd: [false,false,false,false,false,false],
        updintv: 50,
        saveintv:1000,
        savetime:0
    }
    ogame = game;
    var tpg = JSON.parse(localStorage.getItem("test"));
    if (tpg != null) {
        game = tpg;
        game.pnt = ENify(game.pnt);
        game.btn = ENify(game.btn);
        game.btn_prog = ENify(game.btn_prog);
        game.btn_cd = ENify(game.btn_cd);
        game.btn_atb_1 = ENify(game.btn_atb_1);
        game.btn_atb_2 = ENify(game.btn_atb_2);
        document.getElementById("ch-loopintv-1").value = game.updintv;
        document.getElementById("ch-saveintv-1").value = game.saveintv;
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
    game.btn_cd = game.btn_cd.sub(tm).max(0);
    if (game.btn_upd[1]) game.btn_prog = game.btn_prog.add(btn_atb1_eff().mul(tm / 1000).mul(btn_dis().div(1000).max(0).add(1).pow(0.25)));
    else game.btn_prog = game.btn_prog.add(btn_atb1_eff().mul(tm / 1000));
    if (game.btn_upd[5]) game.btn = game.btn_prog.div(10).pow(0.5).mul(10);
    else while (game.btn_prog.gte(btn_cst())) game.btn_prog = game.btn_prog.sub(btn_cst()), game.btn = game.btn.add(1);
    if (game.btn_upd[0]) game.pnt = game.pnt.add(btn_atb2_eff().mul(tm).mul(pnt_btn_icd()));

    if (game.btn_upd[0]) {
        document.getElementById("btn-upd-1").className = "s200b white";
        document.getElementById("btn-cd-2").style = "display:none;";
        document.getElementById("btn-get-pnt-btn").innerHTML = "手动购买点数已禁用"
    } else {
        document.getElementById("btn-upd-1").className = "s200b black h-white";
        document.getElementById("btn-cd-2").style = "";
        document.getElementById("btn-get-pnt-btn").innerHTML = "点击以获得点数"
    }
    if (game.btn_upd[1]) {
        document.getElementById("btn-upd-2").className = "s200b white";
    } else {
        document.getElementById("btn-upd-2").className = "s200b black h-white";
    }
    if (game.btn_upd[2]) {
        document.getElementById("btn-upd-3").className = "s200b white";
    } else {
        document.getElementById("btn-upd-3").className = "s200b black h-white";
    }
    if (game.btn_upd[3]) {
        document.getElementById("btn-upd-4").className = "s200b white";
        document.getElementById("btn-atb-1-4").style = "display:none;";
        game.btn_atb_1 = new ExpantaNum(0);
    } else {
        document.getElementById("btn-upd-4").className = "s200b black h-white";
        document.getElementById("btn-atb-1-4").style = "text-align: center;";
    }
    if (game.btn_upd[4]) {
        document.getElementById("btn-upd-5").className = "s200b white";
    } else {
        document.getElementById("btn-upd-5").className = "s200b black h-white";
    }
    if (game.btn_upd[5]) {
        document.getElementById("btn-upd-6").className = "s200b white";
        document.getElementById("btn-atb-2-4").style = "display:none;";
        document.getElementById("btn-nxt-1").style = "display:none;";
        game.btn_atb_2 = new ExpantaNum(0);
    } else {
        document.getElementById("btn-upd-6").className = "s200b black h-white";
        document.getElementById("btn-atb-2-4").style = "text-align: center;";
        document.getElementById("btn-nxt-1").style = "text-align: center;";
    }

    document.getElementById("pnt-1").innerHTML = game.pnt;
    document.getElementById("btn-1").innerHTML = game.btn;
    document.getElementById("btn-prog-1").innerHTML = game.btn_prog;
    document.getElementById("btn-prog-2").innerHTML = btn_cst();
    document.getElementById("btn-cd-1").innerHTML = game.btn_cd.div(1000);
    document.getElementById("btn-atb-1-1").innerHTML = game.btn_atb_1;
    document.getElementById("btn-atb-1-2").innerHTML = btn_atb1_eff();
    document.getElementById("btn-atb-1-3").innerHTML = btn_atb1_cst();
    document.getElementById("btn-atb-2-1").innerHTML = game.btn_atb_2;
    document.getElementById("btn-atb-2-2").innerHTML = btn_atb2_eff();
    document.getElementById("btn-atb-2-3").innerHTML = btn_atb2_cst();
    document.getElementById("ch-loopintv-2").innerHTML = game.updintv;
    document.getElementById("ch-saveintv-2").innerHTML = game.saveintv;
}
function get_btn_btf() {
    game.btn_prog = game.btn_prog.add(1);
}
function get_pnt_btn_btf() {
    if (game.btn.gte(1)&&game.btn_cd.eq(0)&&!game.btn_upd[0]) {
        game.btn_cd = pnt_btn_cd();
        game.pnt = game.pnt.add(btn_atb2_eff());
    }
}
function pnt_btn_icd() {
    if (game.btn_upd[4]) return game.btn.max(1).pow(0.75).div(1000);
    else return game.btn.max(1).pow(0.5).div(1000);
}
function pnt_btn_cd() {
    if (game.btn_upd[4]) return game.btn.max(1).pow(-0.75).mul(1000);
    else return game.btn.max(1).pow(-0.5).mul(1000);
}
function btn_cst() {
    return game.btn.add(0.5).mul(20);
}
function btn_dis() {
    if (game.btn_upd[5]) return game.btn.pow(0.8).mul(10);
    else return btn_cst().sub(game.btn_prog).max(0);
}
function btn_atb1_eff() {
    if (game.btn_upd[3]) return game.pnt.div(10).pow(0.75).mul(10);
    else return game.btn_atb_1.mul(10);
}
function btn_atb1_cst() {
    return game.btn_atb_1.add(0.5).mul(20);
}
function btn_atb2_eff() {
    if (game.btn_upd[5]) return ExpantaNum(2).pow(game.btn.add(1).pow(4 / 3).log10().div(new ExpantaNum(2).log10()));
    else return new ExpantaNum(2).pow(game.btn_atb_2.div(2)).ceil();
}
function btn_atb2_cst() {
    if (game.btn_upd[2]) return new ExpantaNum(2).pow(game.btn_atb_2.div(2).add(1)).pow(0.75).floor();
    else return new ExpantaNum(2).pow(game.btn_atb_2.div(2).add(1)).floor();
}
function get_btn_atb_1_btf() {
    if (game.pnt.gte(btn_atb1_cst())) game.pnt = game.pnt.sub(btn_atb1_cst()), game.btn_atb_1 = game.btn_atb_1.add(1);
}
function get_btn_atb_2_btf() {
    if (game.btn.gte(btn_atb2_cst())) game.btn = game.btn.sub(btn_atb2_cst()), game.btn_atb_2 = game.btn_atb_2.add(1);
}
function get_btn_upd_btf(i) {
    if (i == 1) {
        if (game.pnt.gte(1000) && !game.btn_upd[0]) {
            game.btn_upd[0] = true;
            game.pnt = game.pnt.sub(1000);
        }
    }
    if (i == 2) {
        if (game.pnt.gte(10000) && !game.btn_upd[1]) {
            game.btn_upd[1] = true;
            game.pnt = game.pnt.sub(10000);
        }
    }
    if (i == 3) {
        if (game.pnt.gte(100000) && !game.btn_upd[2]) {
            game.btn_upd[2] = true;
            game.pnt = game.pnt.sub(100000);
        }
    }
    if (i == 4) {
        if (game.pnt.gte(500000) && !game.btn_upd[3]) {
            game.btn_upd[3] = true;
            game.pnt = game.pnt.sub(500000);
        }
    }
    if (i == 5) {
        if (game.pnt.gte(100000000) && !game.btn_upd[4]) {
            game.btn_upd[4] = true;
            game.pnt = game.pnt.sub(100000000);
        }
    }
    if (i == 6) {
        if (game.pnt.gte(1e12) && !game.btn_upd[5]) {
            game.btn_upd[5] = true;
            game.pnt = game.pnt.sub(1e12);
        }
    }
}