
const listContainer=document.querySelector(["[data-lists"]);
const newListForm=document.querySelector("[data-new-list-form]")
const newListInput=document.querySelector("[data-new-list-input");



const lists=[];



newListForm.addEventListener('submit',(e)=>{


    e.preventDefault();
    const listName=newListInput.value;
    if(listName==null || listName=="")return;
     newListInput.value=null

    const newListItem={
        name:listName,
        id:Date.now().toString()
    };
    lists.push(newListItem);

     renderTask(lists);
     

})

function renderTask(lists){
       clearListUI(listContainer);
      lists.forEach((list=>{
        const listElement=document.createElement('li');
        listElement.id=list.id;
        listElement.innerText=list.name;
        listElement.classList.add('list-name');
       console.log('list',listContainer)
        listContainer.appendChild(listElement);
      }))

}

function clearListUI(element){
     
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}