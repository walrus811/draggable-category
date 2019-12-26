import { dummyData } from "./dummyData";
import { CategoryNode, makeRootCategoryNode } from "./type/CategoryNode";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'

const root = makeRootCategoryNode(dummyData);
root.printDepthFirstOrder();

class Node extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(e){
        e.stopPropagation();
        let {data1,data2}=this.props;
        alert(data1);
    }
    
    render() {
        let {data1,data2}=this.props;
        return <li draggable onClick={this.handleClick}>{data1}{data2}</li>
      }
}

class RootNode extends React.Component {
    renderNode=(nodeData)=>{
        if (nodeData.children.length>0) {
            return ( 
                <Node data1={nodeData.name} data2={<ul>{nodeData.children.map(item=> this.renderNode(item))}</ul>}/>
            );
        }
        else {
            return <Node data1={nodeData.name}/>;
        }
    }

    render() {
      let {nodeData}=this.props;
      return this.renderNode(nodeData);
    }
  }

class NodeTree extends React.Component{
    render() {
        let {rootData}=this.props;
        if(!rootData)
            return null;
        return <ul>{rootData.children.map(rootNode=><RootNode nodeData={rootNode}/>)}</ul>;
      }
}

class DraggableCategory extends React.Component {
    render() {
        const root = this.props.root;
        if (!root) return;
        return (
            <div>
                <NodeTree rootData={root}></NodeTree>
            </div>
        );
    }
}

ReactDOM.render(
    <DraggableCategory root={root} />,
    document.getElementById('root')
);