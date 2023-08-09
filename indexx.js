const site_btn = document.getElementById("sites");
const ongoing = document.getElementById("ongoing");
const container = document.querySelector(".site_list");
const upcoming = document.getElementById("upcoming");
let all_data = [];
let ongoing_con = [];
let upcoming_con = [];
let sites = ["HackerRank" , "CodeChef" , "HackerEarth" , "CodeForces" , "LeetCode"];
let selected_sites=[];

site_btn.addEventListener("click", open_list);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("today-date").innerText = (new Date()).toLocaleDateString('en-US');
    document.getElementById("today-time").innerText = (new Date()).toLocaleTimeString('en-US'); 

});

const get_Data = async() =>{
  let data = [];
  let url = "https://kontests.net/api/v1/all";
  const res = await fetch(url);
  data = await res.json();
  
  for(let i = 0 ; i < data.length ; i++){
     if(check(data[i]['site']))
     {
        all_data.push(data[i]);
     }
  }

//   console.log(all_data);
}

function check(ele){
    for(let i = 0 ; i < sites.length ;i++)
    {
        if(ele == sites[i])
        return true;
    }
    return false;
}

function open_list(){
    const ul  = `<ul>
    <li><input type="checkbox" value="CodeChef"> CodeChef</li>
    <li><input type="checkbox" value="CodeForces"> CodeForces</li>
    <li><input type="checkbox" value="HackerEarth"> HackerEarth</li>
    <li><input type="checkbox" value="HackerRank"> Hackerrank</li>
    <li><input type="checkbox" value="LeetCode"> LeetCode</li>
   </ul>
   `;
   set_html(ul);
  
   get_Data();

   let  checkBoxes = document.querySelectorAll("li");

   for(let  i = 0 ; i < checkBoxes.length; i++) {
    let checkbox = checkBoxes[i].firstElementChild;
 
    checkbox.addEventListener("change" , checkk);
     function  checkk(){
       if(this.checked == true){
          selected_sites.push(this.value);  
       }
    }
}
setTimeout(() => {
    filter_data();
}, 4000);
}

const filter_data =()=>{
//    let filtered_data = [];
   debugger
   for(let i = 0 ; i < all_data.length ;i++)
   {
    if(selected_sites.includes(all_data[i]['site']))
    {
        if(all_data[i]['status'] == "CODING")
        {
            ongoing_con.push(all_data[i]);
        }else{
            upcoming_con.push(all_data[i]);
        }
    }
   }
// if(ongoing_con.length > 0){
//     show_data();
// }
}

ongoing.addEventListener("click" , ()=>{
    let h2 = `<h2>Loading...</h2>`;
    set_html(h2);
    show_data(ongoing_con);
})

upcoming.addEventListener("click" , ()=>{
    let h2 = `<h2>Loading...</h2>`;
    set_html(h2);
    show_data(upcoming_con);
  })

function set_html(tagName)
{
  container.innerHTML = tagName;
}

function show_data(some_data) {
    // console.log("show data" , some_data);
      let ul="";
      let li="";
      // console.log(ul);
      for(let i = 0 ; i < some_data.length;i++ )
      {   
        // let li = document.createElement('li');
        // li.innerHTML = structure(some_data[i]);
        li += `<li>
        ${structure(some_data[i])}
    </li>`;
        // ul.appendChild(li);
      } 
      ul = `<ul>${li}</ul>`;
      console.log(ul);
      if(ul != "undefined")
      {set_html(ul);}
  }
  
  function get_date(d) {
    d = new Date(d)
    d = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
    return d;
  }
  
  function structure(ele)
  {
    return `
    <div class="display">
        <h2 id="contest_name">${ele.name} <a target="_blank" href="${ele.url}"><button class="register_btn">Register</button></a></h2>
        <p id="site_name">Contest site :<span>${(ele.site)}</span></p>
        <span id="strt">Starts at :<span>${format_time(ele.start_time)} </span>on ${get_date(ele.start_time)} </span>
        <span id="end">Ends at :<span>${format_time(ele.end_time)}</span> on ${get_date(ele.end_time)}</span>
    </div>
    `;
  }

  function format_time(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
