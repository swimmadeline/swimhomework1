
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

  
  functionPrintDepts(org1_depts, "div1");
  level = 0;
  ul = null;
  ul_array = [];
  functionPrintDepts(org2_depts, "div2");

  
  function functionPrintDepts(depts, div_id)
  {
    
    var myDiv;
    
    
    myDiv = document.getElementById(div_id);
    if (ul == null)
    {
      ul = document.createElement("UL");
        myDiv.appendChild(ul);
        ul_array.push(ul); 
    }
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
        ul_array.pop();
        depts.splice(0,1);
        level--;
        ul = ul_array[level];
        functionPrintDepts(depts, div_id);
    }
  }
