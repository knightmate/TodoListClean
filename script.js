
const listContainer=document.querySelector(["[data-lists"]);
const newListForm=document.querySelector("[data-new-list-form]")
const taskContainer=document.querySelector("[data-tasks]");
const newTaskForm=document.querySelector("[data-new-task-form]");
const newTaskInput=document.querySelector("[data-new-task-input]");
const newListInput=document.querySelector("[data-new-list-input");
const cardListTitle=document.querySelector("[data-list-title]");
 const taskTemplate=document.getElementById("task-template");


let selectedTaskListid_=null;

const LOCAL_STORAGE_KEY="LOCAL_STORAGE_KEY";
  
const lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

 renderList(lists);

 function selectedTaskListid(id){
  selectedTaskListid=id;
 }

 function saveSelectedItem(id){
  selectedTaskListid_=id;
 }
listContainer.addEventListener("click",(event)=>{

  

  const selectedItemId=event.target.id;
  saveSelectedItem(selectedItemId);
  

    changeCardView(selectedItemId);

    
});


newListForm.addEventListener('submit',(e)=>{


    e.preventDefault();
    const taskName=newListInput.value;
    if(!taskName || taskName==null || taskName=="")return;
     newListInput.value=null

       
   const task= createList(taskName);
   
    lists.push(task);

    saveAndRender();

});

function saveAndRender(){
  saveList(lists);
  renderList(lists);
 };

 function renderListTask(selectedList){
 console.log("list",selectedList)
           selectedList.task.forEach((task)=>{

            const taskElement=document.importNode(taskTemplate.content,true);

            const checkBox=taskElement.querySelector("input");
            checkBox.id=task.id;
            checkBox.checked=task.comeplete
            const label=taskElement.querySelector("label");

            label.htmlFor=task.id;
            label.append(task.name);

            taskContainer.appendChild(taskElement);

           })
     

 }

const changeCardView=(id)=>{
 
    const targetedItem= lists.find((item)=>item.id==id);
    cardListTitle.innerHTML=targetedItem.name;

}

const saveList=(lists)=>{

     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(lists))

};

function renderList(lists){
    if(!lists.length)return;

       clearListUI(listContainer);
       lists.forEach((list=>{
        const listElement=document.createElement('li');
        listElement.id=list.id;
        listElement.innerText=list.name;
        listElement.classList.add('list-name');
        listContainer.appendChild(listElement);
      }))

}

  