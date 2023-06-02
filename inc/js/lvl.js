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
    var a2 = document.createElement("tr");
    var b4 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-4",
        function () { return game.lvl_upd[3]; }, function () { return game.lvl_num[1].gte(new ExpantaNum(1)); }, function () { game.lvl_upd[3] = true; }, crt_br_1("降低0层需求", "需要:1阶层1")));
    var b5 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-5",
        function () { return game.lvl_upd[4]; }, function () { return game.lvl_num[0].gte(new ExpantaNum(7)); }, function () { game.lvl_upd[4] = true; }, crt_br_1("提高阶层升级2的效果", "需要:7阶层0")));
    var b6 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-6",
        function () { return game.lvl_upd[5]; }, function () { return game.eng.gte(new ExpantaNum("1e9000")); }, function () { game.lvl_upd[5] = true; }, crt_br_1("推进器数量加成加速器效果", "需要:1e9000能量")));
    a2.appendChild(b4);
    a2.appendChild(b5);
    a2.appendChild(b6);
    var a3 = document.createElement("tr");
    var b7 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-7",
        function () { return game.lvl_upd[6]; }, function () { return game.eng.gte(new ExpantaNum("1e9650")); }, function () { game.lvl_upd[6] = true; }, crt_br_1("推进器数量生成折叠器", "需要:1e9650能量")));
    var b8 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-8",
        function () { return game.lvl_upd[7]; }, function () { return game.eng.gte(new ExpantaNum("1e10000")); }, function () { game.lvl_upd[7] = true; }, crt_br_1("0层能量加成能量获取", "需要:1e10000能量")));
    var b9 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-9",
        function () { return game.lvl_upd[8]; }, function () { return game.lvl_num[0].gte(new ExpantaNum(11)); }, function () { game.lvl_upd[8] = true; }, crt_br_1("增加折叠器效果", "需要:11阶层0")));
    a3.appendChild(b7);
    a3.appendChild(b8);
    a3.appendChild(b9);
    var a4 = document.createElement("tr");
    var b10 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-10",
        function () { return game.lvl_upd[9]; }, function () { return game.lvl_num[2].gte(new ExpantaNum(1)); }, function () { game.lvl_upd[9] = true; }, crt_br_1("可以最大购买阶层", "需要:1阶层2")));
    var b11 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-11",
        function () { return game.lvl_upd[10]; }, function () { return game.lvl_num[1].gte(new ExpantaNum(5)); }, function () { game.lvl_upd[10] = true; }, crt_br_1("降低高层价格", "需要:5阶层1")));
    var b12 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-12",
        function () { return game.lvl_upd[11]; }, function () { return game.lvl_num[2].gte(new ExpantaNum(4)); }, function () { game.lvl_upd[11] = true; }, crt_br_1("0层不再重置能量", "需要:5阶层1")));
    a4.appendChild(b10);
    a4.appendChild(b11);
    a4.appendChild(b12);
    var a5 = document.createElement("tr");
    var b13 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-13",
        function () { return game.lvl_upd[12]; }, function () { return game.eng.gte(new ExpantaNum("1e200000")); }, function () { game.lvl_upd[12] = true; }, crt_br_1("自动购买0层", "需要:1e200000能量")));
    var b14 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-14",
        function () { return game.lvl_upd[13]; }, function () { return game.lvl_num[3].gte(new ExpantaNum(2)); }, function () { game.lvl_upd[13] = true; }, crt_br_1("提高阶层升级3的效果", "需要:2阶层3")));
    var b15 = crt_td_2(crt_upd("s200r black h-white", "color:#ff0000", "s200r green h-white", "color:#ff0000", "s200r white", "color:#ff0000", "lvl-upd-15",
        function () { return game.lvl_upd[14]; }, function () { return game.eng.gte(new ExpantaNum("1e340000")); }, function () { game.lvl_upd[14] = true; }, crt_br_1("提高阶层升级8的效果", "需要:1e340000能量")));
    a5.appendChild(b13);
    a5.appendChild(b14);
    a5.appendChild(b15);
    document.getElementById("lvl-2").appendChild(a1);
    document.getElementById("lvl-2").appendChild(a2);
    document.getElementById("lvl-2").appendChild(a3);
    document.getElementById("lvl-2").appendChild(a4);
    document.getElementById("lvl-2").appendChild(a5);
}
function lvl_prev(x) {
    if (x == 0) return -1;
    var i = 1;
    while (x % (i * 3) == 0) i *= 3;
    return x - i;
}
function lvl_req(x, l) {
    if (x == 0) return ExpantaNum.pow(2, new ExpantaNum(1024).mul(new ExpantaNum(l).add(2).pow(2 - 0.5 * (game.lvl_upd[3] ? 1 : 0))));
    return l.add(2).pow(2 - 0.5 * (game.lvl_upd[10] ? 1 : 0)).ceil();
}
function lvl_maxaff(x, v) {
    if (x == 0) return v.log10().div(ExpantaNum.log10(2)).div(1024).pow(1 / (2 - 0.5 * (game.lvl_upd[3] ? 1 : 0))).sub(2).floor();
    return v.pow(1 / (2 - 0.5 * (game.lvl_upd[10] ? 1 : 0))).sub(2).floor();
}
function get_lvl_btf(i) {
    if (i == 0) { if (game.eng.lt(lvl_req(i, game.lvl_num[i]))) return; }
    else if (game.lvl_num[i - 1].lt(lvl_req(i, game.lvl_num[i]))) return;
    var k = game.lvl_num[i];
    if (game.lvl_upd[9]) k = lvl_maxaff(i, i == 0 ? game.eng : game.lvl_num[i - 1]);
    if (i == 0 && !game.lvl_upd[11]) eng_rst(), btn_rst();
    else for (var r = lvl_prev(i); r < i; r++)game.lvl_num[r] = game.lvl_atb[r] = game.lvl_eng[r] = new ExpantaNum(0);
    game.lvl_num[i] = k.add(1);
}
function lvl_val_upd(tm) {
    for (var i = 0; i < 27; i++) {
        game.lvl_atb[i] = game.lvl_atb[i].add(game.lvl_num[i].mul(tm / 1000));
        var d = game.lvl_num[i].add(1);
        if (i != 26) d = d.mul(game.lvl_eng[i + 1].add(1).pow(0.5));
        game.lvl_eng[i] = game.lvl_eng[i].add(game.lvl_atb[i].mul(d).mul(tm / 1000));
        if (i != 0) game.lvl_atb[lvl_prev(i)] = game.lvl_atb[lvl_prev(i)].add(game.lvl_atb[i].mul(d).mul(tm / 1000));
        //if (i != 0) game.lvl_atb[i - 1] = game.lvl_atb[i - 1].add(game.lvl_eng[i].pow(0.5).mul(tm / 1000));
        if (i == 0) game.eng_atb[1] = game.eng_atb[1].add(game.lvl_eng[i].mul(tm / 1000));
    }
    if (game.lvl_upd[12]) get_lvl_btf(0);
}
function lvl_disp_upd(){
    for (var i = 0; i < 27; i++)document.getElementById("lvl-1-" + i + "-2").innerHTML = game.lvl_num[i],
        document.getElementById("lvl-1-" + i + "-3").innerHTML = game.lvl_atb[i],
        document.getElementById("lvl-1-" + i + "-4").innerHTML = game.lvl_eng[i],
        document.getElementById("lvl-1-" + i + "-5").innerHTML = lvl_req(i, game.lvl_num[i]);
}