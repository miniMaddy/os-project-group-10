var interval1;
var interval2;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const readerLock = new Array(10);
  const writerLock = new Array(10);
  readerLock.fill(0,0);
  writerLock.fill(0,0);
  const buffer = new Array(10);
  buffer.fill(0,0)
  function reader(index){
    var iR = getRandomInt(10);
    var r = getRandomInt(index);
    while(writerLock[iR] == 1);
    readerLock[iR] = 1;
    document.getElementById("readerstatement").innerHTML = "Reader " + r.toString() + " is reading " + buffer[iR].toString() + " from box number " + (iR+1).toString();
    readerLock[iR] = 0;
  }
  function writer(index){
    var iW = getRandomInt(10);
    var w = getRandomInt(index);
    while(readerLock[iW] == 1 || writerLock[iW] == 1);
    writerLock[iW] = 1;
    buffer[iW] = getRandomInt(100);
    document.getElementById("writerstatement").innerHTML = "Writer " + w.toString() + " is writing " + buffer[iW].toString() + " to box number " + (iW+1).toString();
    document.getElementById((iW+1).toString()).innerHTML = buffer[iW];
    writerLock[iW] = 0;
  }
  function writerAction(el){
    if(parseInt(el.value) > 2){
      document.getElementById("writer").disabled = true;
    }
    else{
      clearInterval(interval1);
      interval1 = setInterval(writer, 2000, parseInt(el.value));
      el.value = (parseInt(document.getElementById("writer").value) + 1).toString();
    }
    
  }
  function readerAction(el){
    if(el.value > 10){
      document.getElementById("reader").disabled = true;
    }
    else{
      clearInterval(interval2);
      interval2 = setInterval(reader, 2000, parseInt(el.value));
      el.value = (parseInt(document.getElementById("reader").value) + 1).toString();
    }
  }

  function stop(){
    clearInterval(interval1);
    clearInterval(interval2);
    document.getElementById("writerstatement").innerHTML = "";
    document.getElementById("readerstatement").innerHTML = "";
    document.getElementById("writer").value = "1";
    document.getElementById("reader").value = "1";
    document.getElementById("reader").disabled = false;
    document.getElementById("writer").disabled = false;
  }