function get_btn_btf() {
    game.btn_prog = game.btn_prog.add(1);
}
function get_pnt_btn_btf() {
    if (game.btn.gte(1) && game.btn_cd.eq(0) && !game.btn_upd[0]) {
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
    if (game.btn_upd[5]) return game.btn.mul(10);
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
    if (game.btn_upd[5]) return game.btn.add(1).pow(4 / 3).mul(game.btn_eng_m.add(1));
    else return new ExpantaNum(2).pow(game.btn_atb_2.div(2)).mul(game.btn_eng_m.add(1)).ceil();
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
    var csts = [1e4, 1e5, 1e6, 1e8, 1e10, 1e12];
    if (game.pnt.gte(csts[i-1]) && !game.btn_upd[i-1]) {
        game.btn_upd[i-1] = true;
        game.pnt = game.pnt.sub(csts[i-1]);
    }
}
function btn_rst(){
    game.pnt = new ExpantaNum(0);
    if (game.eng_upd[1]) game.pnt = new ExpantaNum(1e8);
    game.btn = new ExpantaNum(0);
    if (game.eng_upd[1]) game.btn = new ExpantaNum(1);
    game.btn_prog = new ExpantaNum(0);
    game.btn_cd = new ExpantaNum(0);
    game.btn_atb_1 = new ExpantaNum(0);
    game.btn_atb_2 = new ExpantaNum(0);
    if(!game.eng_upd[3])game.btn_upd = [false, false, false, false, false, false];
}
function btn_to_eng_val() {
    if (!game.eng_upd[0]) return game.pnt.log10().pow(2);
    else if (!game.eng_upd[2]) return game.pnt.pow(1 / 15);
    else return game.pnt.pow(1 / 10);
}
function btn_to_eng_btf(){
    game.eng_btn_m = game.eng_btn_m.add(btn_to_eng_val());
    btn_rst();
}
function btn_disp_upd() {
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
    document.getElementById("btn-eng-m-1").innerHTML = game.btn_eng_m;
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
}