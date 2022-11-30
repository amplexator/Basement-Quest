var atk = 0;
var def = 0;
var atributes = 2;
var atkradio = ["atk1","atk2","atk3","atk4","atk5"];
var defradio = ["def1","def2","def3","def4","def5"];
var signals = ["signal1","signal2","signal3","signal4"];
var enemyatk = 2;
var enemydef = 2;
var fim = 0;
var weaponplus = 0;
var again = 0;

function dice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function minusatk() {
    if(atk>0) {
        document.getElementById(atkradio[atk]).checked = false;
        atk--;
        atributes--;
    }
    else{
        alert("Valor mínimo de 1.");
    }
}
function plusatk() {
    if(atributes<6) {
        atk++;
        atributes++;
        document.getElementById(atkradio[atk]).checked = true;
    }
    else{
        alert("Máximo de 6 atributos.");
    }
}
function minusdef() {
    if(def>0) {
        document.getElementById(defradio[def]).checked = false;
        def--;
        atributes--;
    }
    else{
        alert("Valor mínimo de 1.");
    }
}
function plusdef() {
    if(atributes<6) {
        def++;
        atributes++;
        document.getElementById(defradio[def]).checked = true;
    }
    else{
        alert("Máximo de 6 atributos.");
    }
}
function points() {
    if(atributes==6) {
        document.getElementById("points").hidden = true;
        document.getElementById("btatk").disabled = false;
        for(i=0;i<5;i++) {
            document.getElementById(signals[i]).hidden = true;
        }
    }   
}
function attack() {
    document.getElementById("miss").hidden = true;
    document.getElementById("hit").hidden = true;
    document.getElementById("fb").hidden = true;
    document.getElementById("again").hidden = true;
    document.getElementById("spc").value++;
    var patk = 0;
    var pdef = 0;
    var eatk = 0;
    var edef = 0;
    for(i=-1;i<atk;i++) {
        var inc = dice(1,7);
        patk = patk + inc;
    }
    for(i=-1;i<def;i++) {
        var inc = dice(1,7);
        pdef = pdef + inc;
    }
    for(i=-1;i<enemyatk;i++) {
        var inc = dice(1,7);
        eatk = eatk + inc;
    }
    for(i=-1;i<enemydef;i++) {
        var inc = dice(1,7);
        edef = edef + inc;
    }
    var damp = eatk - pdef;
    var dame = patk - edef;
    if(damp>0) {
        document.getElementById("hpp").value = document.getElementById("hpp").value - damp;
    }
    if(dame>0) {
        document.getElementById("hpe").value = document.getElementById("hpe").value - dame;
        document.getElementById("hit").hidden = false;
    }
    else {
        document.getElementById("miss").hidden = false;
    }
    if(document.getElementById("hpp").value == 0 && document.getElementById("spc").value == 5 && again == 0) {
        document.getElementById("hpp").value = 3;
        document.getElementById("spc").value = 0;
        document.getElementById("again").hidden = false;
        again++
    }
    else if(document.getElementById("hpp").value == 0) {
        document.getElementById("loss").hidden = false;
        fim = 1
    }
    else if(document.getElementById("hpe").value == 0) {
        document.getElementById("win").hidden = false;
        fim = 1
    }
    if(fim==1) {
        document.getElementById("btatk").disabled = true;
        document.getElementById("spc").value = 0;
        document.getElementById("btspc").disabled = true;

    }
    if(document.getElementById("spc").value == 5) {
        document.getElementById("btspc").disabled = false;
    }
}
function special() {
    document.getElementById("miss").hidden = true;
    document.getElementById("hit").hidden = true;
    document.getElementById("fb").hidden = false;
    document.getElementById("btspc").disabled = true;
    document.getElementById("spc").value = 0;
    var pdef = 0;
    var eatk = 0;
    for(i=-1;i<def;i++) {
        var inc = dice(1,7);
        pdef = pdef + inc;
    }
    for(i=-1;i<enemyatk;i++) {
        var inc = dice(1,7);
        eatk = eatk + inc;
    }
    var damp = eatk - pdef;
    if(damp>-1) {
        document.getElementById("hpp").value = document.getElementById("hpp").value - damp;
    }
    document.getElementById("hpe").value = document.getElementById("hpe").value - 3;
    if(document.getElementById("hpp").value == 0) {
        document.getElementById("btatk").disabled = true;
        document.getElementById("loss").hidden = false;
        document.getElementById("bspc").disabled = true;
    }
    else if(document.getElementById("hpe").value == 0) {
        document.getElementById("btatk").disabled = true;
        document.getElementById("win").hidden = false;
        document.getElementById("bspc").disabled = true;
    }
}