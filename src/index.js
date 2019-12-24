import {dummyData} from "./dummyData";
import {CategoryNode} from "./type/CategoryNode";


const root = new CategoryNode(null,null,"root",null,null);

const nodes = dummyData.map(data => new CategoryNode(data.id, data.pid, data.name, data.desc, data.seqOrder));

nodes.forEach(node => {
    if(!node.pid){
        root.children.push(node)
    }
    else{
        nodes.forEach(otherNode => {
            if(node.pid === otherNode.id){
                node.parentNode = otherNode;
                otherNode.children.push(node);
            }
        });
    }
});

root.printDepthFirstOrder();
 console.log("======================================");
root.printBreathFirstOrder();
let id="191224000009"; //토끼파
let foundNode=root.findDepthFirstOrder(id);
console.log("======================================");
foundNode.printDepthFirstOrder();
console.log("======================================");
foundNode.printBreathFirstOrder();
console.log("======================================");
console.log(root.findDepthFirstOrder(id));
console.log(root.findBreathFirstOrder(id));

