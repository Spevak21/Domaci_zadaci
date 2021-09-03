let count = 4;

let data = [
    {
        id: 1,
        text: 'Already exist 1',
        done: true
    },
    {
        id: 2,
        text: 'Already exist 2',
        done: false
    },
    {
        id: 3,
        text: 'Already exist 3',
        done: true
    }
];
// Adding item to data array
const addToArray = (item) =>{
    data.push({id:count++,...item});
    console.log(data);
    return count - 1;
};
// Removing item from data array 
const deleteById = (id) =>{
    let index = data.findIndex(item=>item.id == id );
    data.splice(index,1);
    console.log(data);
};
// Replacing item in data array targeted by ID
const changeById = (id,noviItem)=>{
    let index = data.findIndex(item=>item.id == id );
    if(index !== -1) {
        data.splice(index,1,noviItem);
        console.log(data);
        return true;
    }
};
// Changing done propery of item targeted by ID
const changeDone = (isDone, id) => {
    let index = data.findIndex(item=> item.id == id);
    data[index].done = isDone;
    console.log(data);
};

export let dataObj = {
    data,
    addToArray,
    deleteById,
    changeById,
    changeDone
};