var todo=["study web developement"];

var input=prompt("what would you like to do");
while(input!=="quit")
{
if(input==="list"){
	console.log(todo);
}
else if(input==="new"){
	var newTodo=prompt("add a new todo");
	todo.push(newTodo);
}
}




	console.log("ok you quit");
