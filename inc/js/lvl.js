function crt_btn_1(s, f, i) {
    var a = document.createElement("button");
    var b = document.createTextNode(s);
    a.addEventListener("click", function () { f(i); });
    a.append(b);
    return a;
}
function crt_td_1(x) {
    var a = document.createElement("td");
    var b = document.createTextNode(x);
    a.style = "color:#ffffff;";
    a.appendChild(b);
    return a;
}
function crt_td_2(x) {
    var a = document.createElement("td");
    a.appendChild(x);
    return a;
}
function crt_tr_1(a, b, c, d, e, x, s) {
    var a1 = crt_td_1(a), b1 = crt_td_1(b), c1 = crt_td_1(c), d1 = crt_td_1(d), e1 = crt_td_1(e);
    var f = document.createElement("td");
    f.appendChild(x);
    a1.id = "lvl-1-" + s + "-1";
    b1.id = "lvl-1-" + s + "-2";
    c1.id = "lvl-1-" + s + "-3";
    d1.id = "lvl-1-" + s + "-4";
    e1.id = "lvl-1-" + s + "-5";
    f.id = "lvl-1-" + s + "-6";
    var g = document.createElement("tr");
    g.appendChild(a1);
    g.appendChild(b1);
    g.appendChild(c1);
    g.appendChild(d1);
    g.appendChild(e1);
    g.appendChild(f);
    return g;
}
function init_lvl_table() {
    document.getElementById("lvl-1").appendChild(crt_tr_1("", "数量", "生成器数量", "能量数量", "需求", crt_td_1(""), "x"));
    for (var i = 0; i < 27; i++)document.getElementById("lvl-1").appendChild(crt_tr_1("阶层" + i, "", "", "", "", crt_btn_1("购买 需要上一个 0则为能量", get_lvl_btf, i), i));
}
function crt_br_1(i, j) {
    var a = document.createTextNode(i), b = document.createElement("br"), c = document.createTextNode(j), d = document.createElement("div");
    d.appendChild(a);
    d.appendChild(b);
    d.appendChild(c);
    return d;
}
function init_lvl_upd() {
    var a1 = document.createElement("tr");
    var b1 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-1",
        function () { return game.lvl_upd[0]; }, function () { return game.lvl_num[0].gte(new ExpantaNum(1)); }, function () { game.lvl_upd[0] = true; }, crt_br_1("折叠器以降低的倍率提高推进器效果", "需要:1阶层0")));
    var b2 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-2",
        function () { return game.lvl_upd[1]; }, function () { return game.lvl_num[0].gte(new ExpantaNum(2)); }, function () { game.lvl_upd[1] = true; }, crt_br_1("折叠器以降低的倍率产生加速器", "需要:2阶层0")));
    var b3 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-3",
        function () { return game.lvl_upd[2]; }, function () { return game.lvl_num[0].gte(new ExpantaNum(3)); }, function () { game.lvl_upd[2] = true; }, crt_br_1("提高阶层升级1的效果", "需要:3阶层0")));
    a1.appendChild(b1);
    a1.appendChild(b2);
    a1.appendChild(b3);
    document.getElementById("lvl-2").appendChild(a1);
}
function lvl_prev(x) {
    if (x == 0) return -1;
    var i = 1;
    while (x % (i * 3) == 0) i *= 3;
    return x - i;
}
function lvl_req(x,l) {
    if (x == 0) return ExpantaNum.pow(2, new ExpantaNum(1024).mul(l.add(2)).mul(l.add(2)));
    return l.add(2).pow(2);
}
function get_lvl_btf(i) {
    if (i == 0) { if (game.eng.lt(lvl_req(i, game.lvl_num[i]))) return; }
    else if (game.lvl_num[i - 1].lt(lvl_req(i, game.lvl_num[i]))) return;
    if (i == 0) eng_rst(), btn_rst();
    for (var k = lvl_prev(i); k < i; k++)game.lvl_num[k] = game.lvl_atb[k] = game.lvl_eng[k] = new ExpantaNum(0);
    game.lvl_num[i] = game.lvl_num[i].add(1);
}
function lvl_val_upd(tm) {
    var ul = -1;
    for (var i = 0; i < 27; i++)if (game.lvl_num[i].neq(0)) ul = i;
    for (var i = 0; i < 27; i++) {
        game.lvl_atb[i] = game.lvl_atb[i].add(game.lvl_num[i].max((i <= ul) + 0).mul(tm / 1000));
        var d = game.lvl_num[i].add(1);
        if (i != 26) d = d.mul(game.lvl_eng[i + 1].add(1).pow(0.5));
        game.lvl_eng[i] = game.lvl_eng[i].add(game.lvl_atb[i].mul(d).mul(tm / 1000));
        if (i != 0) game.lvl_atb[lvl_prev(i)] = game.lvl_atb[lvl_prev(i)].add(game.lvl_atb[i].mul(d).mul(tm / 1000));
        //if (i != 0) game.lvl_atb[i - 1] = game.lvl_atb[i - 1].add(game.lvl_eng[i].pow(0.5).mul(tm / 1000));
        if (i == 0) game.eng_atb[1] = game.eng_atb[1].add(game.lvl_eng[i].mul(tm / 1000));
    }
}
function lvl_disp_upd(){
    for (var i = 0; i < 27; i++)document.getElementById("lvl-1-" + i + "-2").innerHTML = game.lvl_num[i],
        document.getElementById("lvl-1-" + i + "-3").innerHTML = game.lvl_atb[i],
        document.getElementById("lvl-1-" + i + "-4").innerHTML = game.lvl_eng[i],
        document.getElementById("lvl-1-" + i + "-5").innerHTML = lvl_req(i, game.lvl_num[i]);
}