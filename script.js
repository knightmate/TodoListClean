
const listContainer=document.querySelector(["[data-lists"]);
const newListForm=document.querySelector("[data-new-list-form]")
const taskContainer=document.querySelector("[data-tasks]");
const newTaskForm=document.querySelector("[data-new-task-form]");
const newTaskInput=document.querySelector("[data-new-task-input]");
const newListInput=document.querySelector("[data-new-list-input");
const cardListTitle=document.querySelector("[data-list-title]");
 const taskTemplate=document.getElementById("task-template");
 const taskCount=document.querySelector("[data-list-count]");
 
const clearCompletedTaskButton=document.querySelector("[data-clear-complete-tasks-button]");
const deletedListButton=document.querySelector("[data-delete-list-button]");


let selectedTaskListid_=null;

const LOCAL_STORAGE_KEY="LOCAL_STORAGE_KEY";
  
let lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

 renderList(lists);
 renderListTask(lists[0]);
 changeCardView(lists[0]?.id);
 saveSelectedItem(lists[0]?.id)
 renderTaskCount();

 function selectedTaskListid(id){
  selectedTaskListid=id;
 }

 function saveSelectedItem(id){
  if(!id)return;
  selectedTaskListid_=id;
 }



 deletedListButton.addEventListener('click',()=>{
    
     //delete from lists
     const filteredList=lists.filter(list=>list.id!==selectedTaskListid_);
     lists=filteredList;
      
        clearCardView();
       saveAndRender(lists);
       selectedTaskListid_=null;
       
 });

  
 clearCompletedTaskButton.addEventListener('click',()=>{

     const selectedList=lists.find((list)=>list.id==selectedTaskListid_);
    const filteredList= selectedList.task.filter((task)=>!task.complete);
     selectedList.task=filteredList;
       console.log('filte',filteredList,selectedList)
       saveList(lists);
       clearListUI(taskContainer);
     renderListTask(selectedList);
     
  
 })

 taskContainer.addEventListener("click",(event)=>{
    const checkedTaskId=event.target.id;
    if(!checkedTaskId)return;
       //mark the completed task as comeplte

       //find the selectedList
     const selectedList= lists.find((task)=>task.id==selectedTaskListid_);

     //get teh task by id from selectedList
      const task= selectedList.task.find((task)=>task.id==checkedTaskId);

      //mark it as true
      task.complete=!task.complete;
      console.log(lists)
      saveList(lists);
      renderTaskCount();

 });

listContainer.addEventListener("click",(event)=>{

   
    clearListUI(taskContainer)
 
    const selectedItemId=event.target.id;
 
    saveSelectedItem(selectedItemId);
  
    changeCardView(selectedItemId);
    const selectedList=lists.find((task)=>task.id==selectedItemId);
    renderListTask(selectedList);
    
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
  renderTaskCount();

  clearListUI(taskContainer);
   if(selectedTaskListid_ && lists.length>0){
 const selectedList=   lists.find((list)=>list.id==selectedTaskListid_);
 renderListTask(selectedList);
   }

 };

 function renderListTask(selectedList){
       console.log('selected',selectedList)
       if(!selectedList)return;

           selectedList.task.forEach((task)=>{

            const taskElement=document.importNode(taskTemplate.content,true);

            const checkBox=taskElement.querySelector("input");
            checkBox.id=task.id;
            checkBox.checked=task.complete
            const label=taskElement.querySelector("label");

            label.htmlFor=task.id;
            label.append(task.name);

            taskContainer.appendChild(taskElement);
             
           })
     

 }

 function clearCardView(){
  cardListTitle.innerHTML="No List Selected!";
  taskCount.innerHTML="";
  
 }
function changeCardView(id){
  console.log("id",id)
    if(!id)return;

    const targetedItem= lists.find((item)=>item.id==id);
    cardListTitle.innerHTML=targetedItem.name;

}

function saveList(lists){
   console.log("lists",lists);
     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(lists))

};

function renderList(lists){

  clearListUI(listContainer);
    if(!lists.length)return;

        
       lists.forEach((list=>{
        const listElement=document.createElement('li');
        listElement.id=list.id;
        listElement.innerText=list.name;
        listElement.classList.add('list-name');
        listContainer.appendChild(listElement);
      }))

}

 
function clearListUI(element){
     
    while(element.firstChild){
        element.removeChild(element.firstChild)
    };
};

newTaskForm.addEventListener('submit',(event)=>{

 
  event.preventDefault();
  const taskName=newTaskInput.value;

  //Handle the edge cases
  if(taskName=="")return;

  if(selectedTaskListid_==null){
    alert("Please Select List")
    return;
  }

  const newtask=createTask(taskName);
  
  //add the task to task list
     const selectedList=lists.find((task)=>task.id==selectedTaskListid_);
    selectedList.task.push(newtask);
   // console.log("updated list",task,lists);
   clearListUI(taskContainer);
   console.log("lists",lists)
   renderListTask(selectedList);
   renderTaskCount()
   clearInput(newTaskInput);
   

});

//important update ,chceking s
function clearInput(inputRef){

  inputRef.value="";

}

function renderTaskCount(){
console.log(lists,selectedTaskListid_)
  if(lists.length==0 ||  !selectedTaskListid_)return;
  const taskString="task remaining";
  const selectedTask=lists.find((task)=>task.id==selectedTaskListid_);

 const count= selectedTask.task.filter((task)=>task.complete==false).length;

  taskCount.innerHTML=count+" "+taskString;
  
 
}
 
function createTask(taskName){
 
  return {id:Date.now().toString(),name:taskName,complete:false};

};

function createList(taskName){
  return {id:Date.now().toString(),name: taskName , task:[]};
}