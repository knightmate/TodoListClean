
const listContainer=document.querySelector(["[data-lists"]);
const newListForm=document.querySelector("[data-new-list-form]")
const taskContainer=document.querySelector("[data-tasks]");
const newTaskForm=document.querySelector("[data-new-task-form]");
const newTaskInput=document.querySelector("[data-new-task-input]");
const newListInput=document.querySelector("[data-new-list-input");
const cardListTitle=document.querySelector("[data-list-title]");
 const taskTemplate=document.getElementById("task-template");
 const taskCount=document.querySelector("[data-list-count]");



let selectedTaskListid_=null;

const LOCAL_STORAGE_KEY="LOCAL_STORAGE_KEY";
  
const lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

 renderList(lists);
 renderListTask(lists[0]);
 changeCardView(lists[0].id);
 saveSelectedItem(lists[0].id)
 renderTaskCount();

 function selectedTaskListid(id){
  selectedTaskListid=id;
 }

 function saveSelectedItem(id){
  if(!id)return;
  selectedTaskListid_=id;
 }

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

function changeCardView(id){
  console.log("id",id)
    if(!id)return;

    const targetedItem= lists.find((item)=>item.id==id);
    cardListTitle.innerHTML=targetedItem.name;

}

function saveList(lists){

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

 
function clearListUI(element){
     
    while(element.firstChild){
        element.removeChild(element.firstChild)
    };
};

newTaskForm.addEventListener('submit',(event)=>{

  console.log("taksname",newTaskForm.value)

  event.preventDefault();
  const taskName=newTaskInput.value;

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

  const taskString="task remaining";
  const selectedTask=lists.find((task)=>task.id==selectedTaskListid_);

 const count= selectedTask.task.filter((task)=>task.complete==false).length;

  taskCount.innerHTML=count+" "+taskString;
  saveList(lists);
 
}
 
function createTask(taskName){
 
  return {id:Date.now().toString(),name:taskName,complete:false};

};

function createList(taskName){
  return {id:Date.now().toString(),name: taskName , task:[]};
}