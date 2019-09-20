let total = 0;
let goodNumbers = ['2', '3', '7'];
function handleClick(a, b) {
  for (i = a; i <= b; i++) {
    let k = i.toString;
    k = k.pop();
    console.log(k);
  }
  document.getElementById("magic_sum").innerHTML = total;
}

/* function giveGoodNumberOrZero(a) { */
/*   const lastDigit = parseInt(a.pop()); */
/*   goodNumbers.foreach(function(number) { */
/*     if (lastDigit == number) { */
/*       return a; */
/*     } */
/*   }); */
/*   return 0; */
/* } */
