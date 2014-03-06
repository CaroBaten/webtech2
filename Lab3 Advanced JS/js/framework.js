var IMDElement = function (element) 
{
    this.element=element;
    this.isArray=(element.length > 0) ? true : false;
}

IMDElement.prototype.addClass = function(p_class) 
{
    if(this.isArray)
	{
        for(var i=0, l=this.element.length; i<l; i++) 
			{
				var add = this.element[i].getAttribute("class");
                this.element[i].setAttribute("class", add + " " +p_class);
            }
    } 
	else 
			{ 
                var add = this.element.getAttribute("class");
                this.element.setAttribute("class", add + " " +p_class);
            }
    return this;
}

IMDElement.prototype.value= function()
{
    return this.element.value;
}

IMDElement.prototype.click = function(p_eventl) 
{
    if(this.isArray) 
	{
        for(var i=0, l=this.element.length; i<l; i++) 
			{
                this.element[i].removeEventListener();
                this.element[i].addEventListener("click", p_eventl);
            }
    } 
	else 
			{
                this.element.removeEventListener();
                this.element.addEventListener("click", p_eventl);
            }
    return this;
}

IMDElement.prototype.addTodo = function (p_todo, p_priority) 
{
    var list = document.createElement("li");
    list.innerHTML=p_todo;
    list.setAttribute("class","priority-"+p_priority);
    this.element[0].appendChild(list);
    return new IMDElement(list);
}