import { useState } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'

export default TaskList;


function TaskList () {
    const [tasks, setTasks] = useState([
        {
          id: 0,
          content: 'finish task list',
          date: '2023-02-12',
          highlight: true
        },
        {
          id: 1,
          content: 'finish add functionality',
          date: '2023-02-12',
          highlight: false
        },
        {
          id: 2,
          content: 'make add functionality look really good',
          date: '2023-02-12',
          hightlight: false
        }
      ]);

      // will show TaskAdder
      const [showAdder, setShowAdder] = useState(false);
      // keeps track of how tasks will be sorted
      const [sortMethod, setSortMethod] = useState('None');

      const sortTasksByMessage = (task1, task2) => {
        if(tasks.length < 2) return;
        if(task1.content < task2.content) return -1;
        else if (task1.content > task2.content) return 1;
        else return 0; 
      }

      const sortTasksByHighlight = (task1, task2) => {
        if(task1.highlight) return -1;
        if(task2.highlight) return 1;
        return 0;
      }
      
      const sortTasks = (currentTasks) => {
        let copyOfCurrentTasks = [...currentTasks];
        if(sortMethod === 'Message'){
          copyOfCurrentTasks.sort(sortTasksByMessage);
        }
        //implement other if statements here
        else if(sortMethod === 'Highlighted'){
          copyOfCurrentTasks.sort(sortTasksByHighlight);
        }
        return copyOfCurrentTasks;
      }

      const changeSortMethod = (newSortMethod) => {
        setSortMethod(newSortMethod);
      }
    
      // delete task
      const deleteTask = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.filter((task) => task.id !== id)
        )
      }

      // highlight task
      // can add sort feature based on highlights
      const highlightTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, highlight: !task.highlight} : task)
        )
      }

      // add task
      const addTask = (task) => {
        // TODO: random number, replace with the database ID 
        // this will break at some point if enough tasks are added
        const id = Math.floor(Math.random() * 11111) + 3;
        const highlight = false;

        const newTask = { id, ...task, highlight };
        setTasks([newTask, ...tasks]);
      }

    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={sortTasks(tasks)} highlightTask={highlightTask} deleteTask={deleteTask} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}
