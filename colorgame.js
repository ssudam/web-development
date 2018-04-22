var colors=[
"rgb(255, 0, 0)","rgb(255, 255, 0)","rgb(0, 255, 0)","rgb(0, 255, 255)","rgb(0, 0, 255)","rgb(255, 0, 255)"
]
 
 var numSquares=6;
 var colors=generateRandomColors(numSquares);

var squares=document.querySelectorAll(".square");
var pickedColor=pickColor();
var colorDisplay=document.getElementById("colorDisplay");
colorDisplay.textContent=pickedColor;
var messageDisplay=document.querySelector("#message");
var h1=document.querySelector("h1");
var resetButton=document.querySelector("#reset");
var easyBtn=document.querySelector("#easyBtn");
var hardBtn=document.querySelector("#hardBtn");

easyBtn.addEventListener("click",function(){
	easyBtn.classList.add("selected");
hardBtn.classList.remove("selected");
numSquares=3;
colors=generateRandomColors(numSquares);
pickedColor=pickColor();
colorDisplay.textContent=pickedColor;
for(var i=0;i<squares.length;i++){
	if(colors[i]){
		squares[i].style.backgroundColor=colors[i];
	}else{
		squares[i].style.display="none";

	}
}


});

hardBtn.addEventListener("click",function(){
	hardBtn.classList.add("selected");
easyBtn.classList.remove("selected");

colors=generateRandomColors(numSquares);
pickedColor=pickColor();
numSquares=6;
colorDisplay.textContent=pickedColor;
for(var i=0;i<squares.length;i++){
	if(colors[i]){
		squares[i].style.backgroundColor=colors[i];
	}else{
		squares[i].style.display="block";

	}
}
});



resetButton.addEventListener("click",function(){
	//generate all new colors
	colors=generateRandomColors(numSquares);
      // pick a new random color from array
	pickedColor=pickColor();
	//change colordisplay to match picked color
	colorDisplay.textContent=pickedColor;
	this.textContent="new colors"
//change colors of squares
	for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor=colors[i];

	}
});




for(var i=0;i<squares.length;i++){
	//add initial colors to squares
	squares[i].style.backgroundColor=colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click",function(){
		//grab color of clicked square
		var clickedColor=this.style.backgroundColor;
		// grab color to picked color
		console.log(clickedColor,pickedColor);

		if(clickedColor===pickedColor){
			messageDisplay.textContent="CORRECT";
			resetButton.textContent="play again?";
			changecolor(clickedColor);
		h1.style.backgroundColor="clickedColor";
		}
		else{
			this.style.backgroundColor="gray";
			messageDisplay.textContent="TRY AGAIN";
		}
	});

}

function changecolor(color)
{
	for(var i=0;i<squares.length;i++){
		//change to the matched color
		squares[i].style.backgroundColor=color;// matching with the picked color
	}
}

function pickColor(){
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}


function generateRandomColors(num){

	var arr=[]
	for(var i=0;i<num;i++){
		arr.push(randomColor());

	}
	return arr;
}

function randomColor(){
	var r=Math.floor(Math.random()*256);

	var g=Math.floor(Math.random()*256);

	var b=Math.floor(Math.random()*256);
	
	return "rgb("+r +", "+g+ ", " +b+")";

}