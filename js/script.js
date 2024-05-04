//CREDS

let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let supmite = document.getElementById("supmite");
let search=document.getElementById("search");
let test="titel";
let mood ="create";
let temp;
//creat
// price.addEventListener("blur" , Nesba);

function Nesba(){
  if(price !=''){
  let reslts= 0.100 * price.value  ;    
  discount.value=reslts;
}else{
  discount.value='';
}
}
  let diaplayData;

          if(localStorage.getItem("data")==null){
            diaplayData=[];

          }else{
            diaplayData=JSON.parse(localStorage.getItem("data"))
            showData();

        };

        function getTotal(){
        if(price.value != ''){
          let reaslt = (+price.value + +taxes.value + +ads.value)
          - +discount.value;
            total.innerHTML=reaslt;
            total.style.background='green'
        }  
        else{
          total.innerHTML='';
          total.style.background='red'
          
        }
        }

        titel.addEventListener("blur" , validashion);
        function validashion(){
          let valedTitel=/^[A-Z][a-z]{2,12}$/;
          if(valedTitel.test(titel.value)==true){
            console.log("true")
            titel.style.border="solid 1px green"
          

          }else{
            console.log("false")
            titel.style.border="solid 1px red"
            alert("one Caracter Caipital And tow String Smoll and not number")
          }
          

          
        }

        function GetData(){
            let pruduct= {
            titel:titel.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
            
          }
            if(count.value >= 100){
                  count.style.border="solid 1px red"
                  count.focus();
                  scroll({
                    top:0,
                    behavior:"smooth"
                  })
            }else{
                  count.style.border="none"
                      if(titel.value!=""&&price.value!=''&&category.value!=""&&count.value < 100){
                        if(mood ==="create"){
                              if(pruduct.count > 1){
                                  for( let i =0; i< pruduct.count;i++){
                                    diaplayData.push(pruduct);
                                  }
                              }else{
                                diaplayData.push(pruduct);
                              }
                
                        }else{
                          diaplayData[temp]= pruduct;
                          mood='create';
                          count.style.display='block';
                          supmite.innerHTML='Create'
                        }
                        
          localStorage.setItem("data" ,JSON.stringify(diaplayData));
          showData();
          clearData();

                      }
                      
      }   
        }
    
        function showData() {
          let cartona=``;
          for(let i = 0; i < diaplayData.length; i++){
            cartona+=`
            <tr>
              <td>${i+1}</td>
              <td>${diaplayData[i].titel}</td>
              <td>${diaplayData[i].price}</td>
              <td>${diaplayData[i].taxes}</td>
              <td>${diaplayData[i].ads}</td>
              <td>${diaplayData[i].discount}</td>
              <td>${diaplayData[i].total}</td>
              <td>${diaplayData[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deletData(${i})" id="delete">delete</button></td>
           </tr>
            `
            }
            document.getElementById("tbodye").innerHTML=cartona;
            let btnDeleteAll=document.getElementById("btnDeleteAll");
            if(diaplayData.length > 2){
                  btnDeleteAll.innerHTML=`
                  <button onclick="deleteAllProduct()" id="deletAll)">DeleteAll  (${diaplayData.length})</button>
                  
                  `
            }else{
              btnDeleteAll.innerHTML='';
            }
        }
  
        function deletData(indexValue){
          diaplayData.splice(indexValue,1);
          localStorage.setItem("data" ,JSON.stringify(diaplayData));
          showData();
        }

        function deleteAllProduct(){         
          localStorage.clear();
          diaplayData.splice(0)
           showData();
           
        }

        function clearData(){
          titel.value="";
          price.value="";
          taxes.value="";
          ads.value="";
          discount.value="";
          total.value="";
          count.value="";
          category.value="";
          getTotal();
        }

        function searche(id){
          if(id=="SearchTitel"){
            test="titel";

          }else{
            test="category"
          }
          search.placeholder="Search by " + test;
          search.focus();
          search.value = "";
          showData();


        }

        function SerachData(valed){
          cartona=``;
            for(let i =0; i < diaplayData.length ; i++){
                if(test=="titel"){
                  if(diaplayData[i].titel.toLowerCase().includes(valed.toLowerCase())){
                    cartona+=`
                    <tr>
                      <td>${i+1}</td>
                      <td>${diaplayData[i].titel}</td>
                      <td>${diaplayData[i].price}</td>
                      <td>${diaplayData[i].taxes}</td>
                      <td>${diaplayData[i].ads}</td>
                      <td>${diaplayData[i].discount}</td>
                      <td>${diaplayData[i].total}</td>
                      <td>${diaplayData[i].category}</td>
                      <td><button id="update">update</button></td>
                      <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                  }

              }
              else{

                if(diaplayData[i].category.toLowerCase().includes(valed.toLowerCase())){
                  cartona+=`
                  <tr>
                    <td>${i+1}</td>
                    <td>${diaplayData[i].titel}</td>
                    <td>${diaplayData[i].price}</td>
                    <td>${diaplayData[i].taxes}</td>
                    <td>${diaplayData[i].ads}</td>
                    <td>${diaplayData[i].discount}</td>
                    <td>${diaplayData[i].total}</td>
                    <td>${diaplayData[i].category}</td>
                    <td><button id="update">update</button></td>
                    <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                  </tr>
                  `
                }
              }
            }
            document.getElementById("tbodye").innerHTML=cartona;
          
        }


    function updateData(i){
      titel.value=diaplayData[i].titel; 
      price.value=diaplayData[i].price; 
      taxes.value=diaplayData[i].taxes; 
      ads.value=diaplayData[i].ads; 
      discount.value=diaplayData[i].discount; 
      category.value=diaplayData[i].category; 
      count.style.display='none';
      getTotal();
      supmite.innerHTML="Update"  ;
      mood="update";
      temp=i;
      scroll({
        top:0,
        behavior:"smooth"
      })
    };




  