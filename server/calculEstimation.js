
// fonction de calcul d'estimation
function calculEstimation(msgWeb,msgMob,RepPos,RepNeg){
  var totalRep=parseInt(RepPos)+parseInt(RepNeg);
  var TotalMsg=parseInt(msgWeb)+parseInt(msgMob);
  var estimation= parseInt(RepPos)-((totalRep/TotalMsg)*10);
  return parseInt(estimation);
}

function sucessRate(NbR,Estim){
	var ErreurRate=(parseInt(NbR)-parseInt(Estim))/parseInt(NbR);
	var sucessRate=1-roundDecimal(ErreurRate,2);
 return sucessRate;
}


function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}