
const listContainer=document.querySelector(["[data-lists"]);
const newListForm=document.querySelector("[data-new-list-form]")
const newListInput=document.querySelector("[data-new-list-input");


const LOCAL_STORAGE_KEY="LOCAL_STORAGE_KEY";
console.log('fdf',JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
 
const lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

console.log("listInstart",lists)
renderTask(lists);
newListForm.addEventListener('submit',(e)=>{


    e.preventDefault();
    const listName=newListInput.value;
    if(!listName || listName==null || listName=="")return;
     newListInput.value=null

      const newListItem={
        name:listName,
        id:Date.now().toString()
    };
    lists.push(newListItem);

     renderTask(lists);
     console.log('listItems',lists)
     saveList(lists)

});


const saveList=(lists)=>{

     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(lists))

};

function renderTask(lists){
    if(!lists.length)return
       clearListUI(listContainer);
       console.log('rendertask',lists)
      lists.forEach((list=>{
        const listElement=document.createElement('li');
        listElement.id=list.id;
        listElement.innerText=list.name;
        listElement.classList.add('list-name');
      // console.log('list',listContainer)
        listContainer.appendChild(listElement);
      }))

}

function clearListUI(element){
     
    while(element.firstChild){
        element.removeChild(element.firstChild)
    };
}