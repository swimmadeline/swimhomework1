//org1_depts is a constant variable that contains things below
const org1_depts = [
    {
      name: 'accounting',
      children: [
        { name: 'accounting payable', children: [] },
        { name: 'accounting receivable', children: [] },
      ],
    },
    {
      name: 'finance',
      children: [],
    },
  ]
  
  //org2_depts is a constant variable that contains things below
  const org2_depts = [
    {
      name: 'accounting',
      children: [
        { name: 'accounting payable', children: [] },
        {
          name: 'accounting receivable',
          children: [{ name: 'cash', children: [] }, { name: 'check', children: [] }],
        },
      ],
    },
    {
      name: 'finance',
      children: [{ name: 'investment', children: [] }],
    },
  ]
  
  const list_styles = ["first_level", "second_level", "third_level"];

  var level = 0;
  var ul = null;
  var ul_array = [];

  //We are calling 'functionPrintDepts' function and giving org1_depts as parameters
  functionPrintDepts(org1_depts, "div1");
  level = 0;
  ul = null;
  ul_array = [];
  functionPrintDepts(org2_depts, "div2");

  //We are declaring a function called functionPrintDepts
  // and calling the parameter it takes 'depts'
  function functionPrintDepts(depts, div_id)
  {
    //We are declaring a variable (empty) called myDiv
    var myDiv;
    
    //We are getting an HTML element using it's ID 
    //myDiv is being brought in to access the variables within the div
    myDiv = document.getElementById(div_id);
    if (ul == null)
    {
        ul = document.createElement("UL");
        myDiv.appendChild(ul);
        ul_array.push(ul); 
    }
    //Inputting variables into div
    //+= we've kept the old value and are now adding a new one
    if (depts.length == 0)
        return ;
    var li = document.createElement("LI");
    li.setAttribute("Class", list_styles[level]);
    var textNode = document.createTextNode(depts[0].name);
    li.appendChild(textNode);
    ul_array[level].appendChild(li);
    if (depts[0].children.length == 0)
    {
        depts.splice(0,1);
        functionPrintDepts(depts, div_id);
    }
    else 
    {

        var tmp_ul = document.createElement("UL");
        ul.appendChild(tmp_ul);
        ul = tmp_ul;
        ul_array.push(ul);
        level++;
        functionPrintDepts(depts[0].children, div_id);
        depts.splice(0,1);
        level--;
        functionPrintDepts(depts, div_id);
    }
  }

  //To get the console on your navigator press ctrl + shift + i
