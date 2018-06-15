var button=document.querySelector("button");
var isYellow=false;

	



	button.addEventListener("click",function(){
		if(isYellow){
			document.body.style.background="white";
			isYellow=false;
		}
		else{

		document.body.style.background="yellow";
		isYellow=true;
	}
		});
	