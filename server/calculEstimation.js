// fonction de calcul d'estimation
function calculEstimation(msgWeb,msgMob,RepPos,RepNeg){
  var totalRep=parseInt(RepPos)+parseInt(RepNeg);
  var TotalMsg=parseInt(msgWeb)+parseInt(msgMob);
  var estimation= parseInt(RepPos)-((totalRep/TotalMsg)*10);
  return parseInt(estimation);
}
