var secretnumber=5;
var guess=prompt("guess the number");
if(Number(guess)===secretnumber){
	alert("you are right!");
}

else if(Number(guess)>secretnumber){
	alert("num is too high guess again");
}
else if(Number(guess)<secretnumber){
	alert("num too low guess again");
} 


var number=-10;

while(num<=19){
	console.log(number);
	count++;
}

var even=10
 while(even<=41)
 {
 	console.log(even);
 	count+=2;
 }

 var odd= 300;
 while(odd<=333){
 	if(odd%2!==0)
 		console.log(odd);
 	count+=1;
 }
