const obj = {
    offense :  {
        cqc : 12,
        distance : 2
    },
    defense : {
        cqc : 15,
        distance : 8
    }
};
    

  //RECURSIVE FUNCTION TO GET ALL THE PROPERTIES OF THE OBJECT AND THEIR PATHS
  
  /*
  - I will need to pass the parent property in the recursive function, we will store it in a variable called path
  - Along the way, we store the path we find in an array called pathFound
  - We can think about a binary tree in this case. Let's say we explore it with a width-first search
  Lap 1 : path = obj
  Lap 2 : path = obj.offense
  Lap 3 : path = obj.defense
  Lap 4 : path = obj.offense.cqc
  Lap 5 : path = obj.offense.distance
  Lap 6 : path = obj.defense.cqc
  Lap 7 : path = obj.defense.distance
  */
  
  const paths_found = []; // to store the paths we find while the recursive function is rolling.

    // PARAM 1 : the object we want to explore  || PARAM 2 : The name of this object

  const rec = (object, newPropName) => {                           
    // 1 - We pass the objName as a string and store it in the variable path.
    let path = `${newPropName}`;
    // 2 - We push this string in the array paths_found to keep track of all the paths.
    paths_found.push(path);
    // 4 - We collect the keys of this object in the childrenProp using Object.keys, we obtain an array
    let childrenProp = Object.keys(object);
    
    console.log(`The object : ${JSON.stringify(object)}`);
    console.log(`The path : ${path}`)
    
    // BASE CASE - When do we need to stop the recursivity ? When childProp.length === 0 doesn't exist AND ...
    if (childrenProp.length === 0) {
      console.log("we stop everything!")
      return;
    }
    // HOW AND WHERE can we increment index ? Use a for loop somewhere ?
    // SUBPROBLEM - What we need to return to trigger the "chain of recursivity"
    let i = 0;
    for (let prop in object) {
          const propName = childrenProp[i];
          return rec(object[prop], propName);
          i++;
    }
  };

 //rec(obj, "obj");

// CHECKS - PLAYGROUND
const fake_path = obj.defense;
const fakechildProp = Object.keys(fake_path);  
  
const desire = fake_path[fakechildProp[1]];
//alert(desire)

const dodo = "defense"
const didi = 'cqc'
alert(JSON.stringify(obj[dodo][didi]))