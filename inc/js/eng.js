function eng_atb_cst(i, p = -1) {
    var k = p;
    if (k == -1) k = game.eng_atb[i-1];
    if (i == 1) return ExpantaNum(1.5).pow(k).sub(0+game.pnt.gte(1e12));
    if (i == 2) return ExpantaNum(10).pow(k);
    if (i == 3) return ExpantaNum(1.5).pow(k);
    if (i == 4) return ExpantaNum(10).pow(k);
}
function eng_atb_maxaff(i) {
    if (i == 1) return game.eng.add(1).log10().div(ExpantaNum(1.5).log10()).floor();
    if (i == 2) return game.eng.log10().floor();
    if (i == 3) return game.eng.log10().div(ExpantaNum(1.5).log10()).floor();
    if (i == 4) return game.eng.log10().floor();
}
function eng_atb_eff(i) {
    if (i == 1) return game.eng_atb[0].mul(game.eng_btn_m.add(1)).mul(eng_atb_eff(3).add(1)).pow(eng_atb_eff(4).add(1).log10().add(1));
    if (i == 2) {
        if (!game.lvl_upd[0]) return game.eng_atb[1].mul(eng_atb_eff(3).add(1));
        else if (!game.lvl_upd[2]) return game.eng_atb[1].mul(eng_atb_eff(3).add(1)).pow(eng_atb_eff(4).add(1).log10().div(5).add(1));
        else return game.eng_atb[1].mul(eng_atb_eff(3).add(1)).pow(eng_atb_eff(4).add(1).log10().mul(0.3).add(1));
    }
    if (i == 3) return game.eng_atb[2].pow(2).pow(eng_atb_eff(4).add(1).log10().add(1));
    if (i == 4) return game.eng_atb[3];
}
function get_eng_atb_btf(p, m) {
    if (game.eng.gte(eng_atb_cst(p))) {
        if (m == 0) game.eng = game.eng.sub(eng_atb_cst(p)), game.eng_atb[p - 1] = game.eng_atb[p - 1].add(1);
        if (m == 1) {
            var k = eng_atb_maxaff(p);
            if (!game.eng_upd[4]) game.eng = game.eng.sub(eng_atb_cst(p, k));
            game.eng_atb[p - 1] = k.add(1);
        }
    }
}
var eng_upd_csts = [1e140, 1e200, 1e210, 1e300, ExpantaNum("1e400"), ExpantaNum("1e500")];
function get_eng_upd_btf(i) {
    if (game.eng.gte(eng_upd_csts[i - 1]) && !game.eng_upd[i - 1]) {
        game.eng_upd[i - 1] = true;
        game.eng = game.eng.sub(eng_upd_csts[i - 1]);
    }
}
function eng_rst() {
    game.eng = new ExpantaNum(0);
    for (var i = 0; i <= 4; i++) game.eng_atb[i] = new ExpantaNum(0);
}
function eng_to_btn_val() {
    if (!game.eng_upd[0]) return game.eng.add(1).log10().pow(2);
    else if (!game.eng_upd[2]) return game.eng.pow(1 / 15);
    else return game.eng.pow(1 / 10);
}
function eng_to_btn_btf() {
    game.btn_eng_m = game.btn_eng_m.add(eng_to_btn_val());
    eng_rst();
}
function eng_disp_upd() {
    if (game.eng_upd[0]) {
        document.getElementById("eng-upd-1").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[0])) document.getElementById("eng-upd-1").className = "s200b green h-white";
        else document.getElementById("eng-upd-1").className = "s200b black h-white";
    }
    if (game.eng_upd[1]) {
        document.getElementById("eng-upd-2").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[1])) document.getElementById("eng-upd-2").className = "s200b green h-white";
        else document.getElementById("eng-upd-2").className = "s200b black h-white";
    }
    if (game.eng_upd[2]) {
        document.getElementById("eng-upd-3").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[2])) document.getElementById("eng-upd-3").className = "s200b green h-white";
        else document.getElementById("eng-upd-3").className = "s200b black h-white";
    }
    if (game.eng_upd[3]) {
        document.getElementById("eng-upd-4").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[3])) document.getElementById("eng-upd-4").className = "s200b green h-white";
        else document.getElementById("eng-upd-4").className = "s200b black h-white";
    }
    if (game.eng_upd[4]) {
        document.getElementById("eng-upd-5").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[4])) document.getElementById("eng-upd-5").className = "s200b green h-white";
        else document.getElementById("eng-upd-5").className = "s200b black h-white";
    }
    if (game.eng_upd[5]) {
        document.getElementById("eng-upd-6").className = "s200b white";
    } else {
        if (game.eng.gte(eng_upd_csts[5])) document.getElementById("eng-upd-6").className = "s200b green h-white";
        else document.getElementById("eng-upd-6").className = "s200b black h-white";
    }

    document.getElementById("eng-1").innerHTML = game.eng;
    document.getElementById("eng-btn-m-1").innerHTML = game.eng_btn_m;
    document.getElementById("eng-atb-1-1").innerHTML = game.eng_atb[0];
    document.getElementById("eng-atb-1-2").innerHTML = eng_atb_cst(1);
    document.getElementById("eng-atb-2-1").innerHTML = game.eng_atb[1];
    document.getElementById("eng-atb-2-2").innerHTML = eng_atb_cst(2);
    document.getElementById("eng-atb-3-1").innerHTML = game.eng_atb[2];
    document.getElementById("eng-atb-3-2").innerHTML = eng_atb_cst(3);
    document.getElementById("eng-atb-4-1").innerHTML = game.eng_atb[3];
    document.getElementById("eng-atb-4-2").innerHTML = eng_atb_cst(4);
}