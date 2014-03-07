var IMDelement = function(element)
{
	this.element = element;
	this.isArray = (element.length > 1) ? true : false;
}

IMDelement.prototype.color = function(p_color)
{
	if(this.isArray)	
	{
		for(var i=0, l=this.element.length; i<l; i++)
		{
			this.element[i].style['color'] = p_color;
		}
	}
	else
	{
		this.element[0].style['color'] = p_color;
	}
	return this.element;
}

IMDelement.prototype.addClass = function(p_className)
{
	if(this.isArray)
	{
		for(var i=0, l=this.element.length; i<l; i++)
		{
			this.element[i].className = this.element[i].className + " " + p_className;
		}
	}
	else
	{
		this.element[0].className = this.element[0].className + " " + p_className;
	}
}

var $ = function(p_element)
{
	var selectedItem;
	var element;
	var result;

	if(typeof p_element == "object")
	{
		element = [p_element];
	}
	else
	{
		var firstCharacter = p_element.charAt(0);

	if(firstCharacter == "#")
	{
		selectedItem = p_element.substring(1, p_element.length);
		element = [document.getElementById(selectedItem)];
	}
	else if(firstCharacter == ".")
	{
		selectedItem = p_element.substring(1, p_element.length);
		element = document.getElementsByClassName(selectedItem);
	}
	else
	{
		selectedItem = p_element;
		element = document.getElementsByTagName(selectedItem);
	}
}
	result = new IMDelement(element);
	return result;
}

IMDelement.prototype.click = function(callback)
{
	if(this.isArray)
	{
		for(var i=0, l=this.element.length; i<l; i++)
		{
			this.element[i].addEventListener('click', function(e)
			{
				callback.apply(this);
				return callback;
			});
		}
	}
	else
	{
		this.element[0].addEventListener('click', function(e)
		{
			return callback(e);
		});
	}
}

        $('.prior-low').addClass('done');
        //$('#todo-item1').addClass('done');
        //$('li').addClass('done');
        /*$('li').click(function(){
		$(this).addClass('done');
		});*/