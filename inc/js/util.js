function sftcap(x, s, t, v) {
    if (x.lte(s)) return x;
    if (t == 1) return x.div(s).pow(v).mul(s);
    if (t == 2) return ExpantaNum.pow(10, x.div(s).log10().add(1).pow(v).sub(1)).mul(s);
    if (t == 3) return x.div(s).pow(x.div(s).log10().add(1).log10().add(1).pow(-v)).mul(s);
}
function shcap(x, s) {
    return x.mul(s).div(x.add(s));
}