function save() {
    game.savetime = new Date().getTime();
    localStorage.setItem("test", JSON.stringify(game));
}
function exprt() {
    save();
    navigator.clipboard.writeText(btoa(JSON.stringify(game)));
}
function rst() {
    if (confirm("硬重置没有奖励 要硬重置吗") == true) {
        localStorage.removeItem("test");
        clearInterval(loopintv);
        load();
        location.reload();
    }
}
function imprt() {
    game = JSON.parse(atob(document.getElementById("import-game").value));
    localStorage.setItem("test", JSON.stringify(game));
    clearInterval(loopintv);
    load();
}