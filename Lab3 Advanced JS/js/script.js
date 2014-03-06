var $= function(p_element) 
{

    var firstCharacter = p_element.charAt(0);
    var result;

        switch (firstCharacter)
            {
                case "#":
                    var idToSelect=p_element.substr(1,p_element.length-1);
                    var element = document.getElementById(idToSelect);
                    var result=new IMDElement(element);
                break;

                case ".":
                    var classToSelect=p_element.substr(1,p_element.length-1);
                    var elements= document.getElementsByClassName(classToSelect);
                    var result= new IMDElement(elements);
                break;

                default:
                    var elements= document.getElementsByTagName(p_element);
                    var result= new IMDElement(elements)
                break;
            }
        return result;
}

$("button").click(function(){

    //Framework does not have support for drop-down list
    var e = document.getElementById("plist"); // Return the object ddl without putting it into the framework
    var strUser = e.options[e.selectedIndex].value; // Return the selected value

    if($("#textfield").value()) {

        $("ul").addTodo($("#textfield").value(), strUser).click(

                        function(){new IMDElement(this).addClass("done");}
            );}
    });

$("ul").addTodo("Learn about GIT","high").click(function(){new IMDElement(this).addClass("done");});
$("ul").addTodo("Learn about Prototypes","high").click(function(){new IMDElement(this).addClass("done");});
$("ul").addTodo("Experiment with CSS animations","medium").click(function(){new IMDElement(this).addClass("done");});
$("ul").addTodo("Become a Javascript ninja","low").click(function(){new IMDElement(this).addClass("done");});