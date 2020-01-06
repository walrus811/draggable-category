import { dummyData } from "./dummyData";
import { CategoryNode, makeRootCategoryNode } from "./type/CategoryNode";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'
import { node, array } from "prop-types";

const root = makeRootCategoryNode(dummyData);
//root.printDepthFirstOrder();

//Node에서 루트로 거슬러올라가 해당 노드 정보 반환이 필요함,
//해당 함수는 prop으로 받는 걸로 설정
class Node extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleOnDragOver=this.handleDragOver.bind(this);
        this.handleDragStart=this.handleDragStart.bind(this);
        this.handleDrop=this.handleDrop.bind(this);
    }

    handleClick(e){
         e.stopPropagation();
    }

    handleDragEnd(e){
    }

    handleDragEnter(e){
        e.target.style.color="red";
    }


    handleDragLeave(e){
        e.target.style.color="black";
    }

    handleDragOver(e){
        e.preventDefault();
    }

    handleDragStart(e){
        e.stopPropagation();
        let {nodeData}=this.props;
        e.dataTransfer.dropEffect="move";
        e.dataTransfer.setData("nodeId", nodeData.id);
    }

    handleDrop(e) {
        e.stopPropagation();
        e.target.style.color="black";
        root.printDepthFirstOrder();
        const droppedNodeId = e.dataTransfer.getData("nodeId"); 
        console.log("handleDrop");
        
        const droppedNode = root.findDepthFirstOrder(droppedNodeId);
        const parentNode = droppedNode.parentNode;

        const droppedNodeIndex = parentNode.children.indexOf(droppedNode); 
        if(droppedNodeIndex > -1){
            parentNode.children.splice(droppedNodeIndex,1);
        }

        droppedNode.parent = this.props.nodeData;
        this.props.nodeData.children.push(droppedNode);
        root.resetSeqOrder();
        
        this.props.r();
        root.printDepthFirstOrder();
      }

    render() {
        let {nodeData,childrenData}=this.props;

        return <li  draggable 
                   onClick={this.handleClick} 
                   onDrag = {this.handleDrag}
                   onDragEnd={this.handleDragEnd} 
                   onDragEnter={this.handleDragEnter}
                   onDragLeave={this.handleDragLeave}
                   onDragOver={this.handleDragOver} 
                   onDragStart={this.handleDragStart} 
                   onDrop={this.handleDrop}>
                       {nodeData.name}{childrenData}
                </li>
      }
}

class RootNode extends React.Component {
    renderNode=(nodeData)=>{
        if (nodeData.children.length>0) {
            return ( 
                <Node r={this.props.r} key={nodeData.id} nodeData={nodeData}  childrenData={<ul>{nodeData.children.map(item=> this.renderNode(item))}</ul>}/>
            );
        }
        else {
            return <Node r={this.props.r} key={nodeData.id} nodeData={nodeData}/>;
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
        return <ul>{rootData.children.map(rootNode=><RootNode r={this.props.r} nodeData={rootNode}/>)}</ul>;
      }
}

class DraggableCategory extends React.Component {

    render() {
        const root = this.props.root;
        if (!root) return;
        return (
            <div>
                <NodeTree r={this.render} rootData={root}></NodeTree>
            </div>
        );
    }
}

ReactDOM.render(
    <DraggableCategory root={root} />,
    document.getElementById('root')
);