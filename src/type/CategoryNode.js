export class CategoryNode{
    constructor(id, pid, name, desc, seqOrder, data){
        this.id=id;
        this.pid=pid;
        this.name=name;
        this.desc=desc;
        this.seqOrder=seqOrder;
        this.children = [];
        this.parentNode=null;
    }

    printDepthFirstOrder(){
        CategoryNode.printDepthFirstOrder(this);
    }

    static printDepthFirstOrder(root){
        if(!root) return;
        let stack = [];
        stack.push(root);
        while(stack.length>0){
            let node = stack.pop();
            if(node.id!=null)
                console.log("  ".repeat(node.getLevel())+`${node.name}(${node.id})`);
            node.children.slice().reverse().forEach(child => {
                stack.push(child);
            }); 
        }
    }
    
    printBreathFirstOrder(){
        CategoryNode.printBreathFirstOrder(this);
    }
    
    static printBreathFirstOrder(root){
        if(!root) return;
        let queue = [];
        queue.push(root);
        while(queue.length>0){
            let node = queue.shift();
            if(node.id!=null)
                console.log("  ".repeat(node.getLevel())+`${node.name}(${node.id})`);
            node.children.forEach(child => {
                queue.push(child);
            });
        }
    }


    findDepthFirstOrder(id){
        return CategoryNode.findDepthFirstOrder(this,id);
    }
    
    static findDepthFirstOrder(root, id){
        if(!root) return;
        let stack = [];
        stack.push(root);
        while(stack.length>0){
            let node = stack.pop();
            if(node.id==id)
                return node;
            node.children.slice().reverse().forEach(child => {
                stack.push(child);
            }); 
        }
    }

    findBreathFirstOrder(id){
        return CategoryNode.findBreathFirstOrder(this,id);
    }

    static findBreathFirstOrder(root, id){
        if(!root) return;
        let queue = [];
        queue.push(root);
        while(queue.length>0){
            let node = queue.shift();
            if(node.id==id)
                return node;
            node.children.forEach(child => {
                queue.push(child);
            });
        }
        return null;
    }
    
    getLevel(){
        let result=0;
        for(let parentNode = this.parentNode; parentNode !=null; parentNode=parentNode.parentNode){
            result++;
        }
        return result;
    }
}

