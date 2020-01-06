import { dummyData } from "./dummyData";
import { CategoryNode, makeRootCategoryNode } from "./type/CategoryNode";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'
import { node, array } from "prop-types";


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
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(e){
        console.log(e.type);
        e.stopPropagation();
      //  e.target.setAttribute("draggable", true);
    }
    
    handleMouseUp(e){
        console.log(e.type);
        e.stopPropagation();
     //   e.target.setAttribute("draggable", false);
    }

    handleClick(e){
        e.stopPropagation();
         console.log(e.type);
    }

    handleDragEnd(e){
        e.stopPropagation();
        e.preventDefault();
     //   e.target.setAttribute("draggable", false);
        console.log(e.type);
    }

    handleDragEnter(e){
        e.stopPropagation();
        console.log(e.type);
    }


    handleDragLeave(e){
        e.stopPropagation();
        console.log(e.type);
        e.target.style.color="black";
    }

    handleDragOver(e){
        e.preventDefault();
        console.log(e.type);
        e.target.style.color="blue";
        e.dataTransfer.dropEffect = 'move';
    }

    handleDragStart(e){
        e.stopPropagation();
        console.log(e.type);
        e.target.style.color="red";


        var canvas = document.createElement("canvas");
        canvas.width = canvas.height = 50;
      
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 4;
        ctx.moveTo(0, 0);
        ctx.lineTo(50, 50);
        ctx.moveTo(0, 50);
        ctx.lineTo(50, 0);
        ctx.stroke();

        let {nodeData}=this.props;
        e.dataTransfer.setData("nodeId", nodeData.id);
       // e.dataTransfer.setDragImage(canvas, 25, 25);
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.type);
        e.target.style.color="black";

        
        const droppedNodeId = e.dataTransfer.getData("nodeId"); 
        console.log("handleDrop");
        const root = this.props.nodeData.getRoot();
        const droppedNode = root.findDepthFirstOrder(droppedNodeId);
        if(this.props.nodeData.isAncestor(droppedNode))
            return;
        if(droppedNode.id==this.props.nodeData.id)
            return;
        const parentNode = droppedNode.parentNode;
        if(parentNode){
            const droppedNodeIndex = parentNode.children.indexOf(droppedNode); 
            if(droppedNodeIndex > -1){
                parentNode.children.splice(droppedNodeIndex,1);
            }
        }
        droppedNode.pid =  this.props.nodeData.id;
        droppedNode.parentNode = this.props.nodeData;
        this.props.nodeData.children.push(droppedNode);

        root.resetSeqOrder();
        this.props.rerender();
      }

    render() {
        let {nodeData,childrenData}=this.props;

        return <li draggable
                   onMouseDown= {this.handleMouseDown}
                   onMouseUp= {this.handleMouseUp}
                
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
        let {rerender}=this.props;
        if (nodeData.children.length>0) {
            return ( 
                <Node rerender={rerender}  key={nodeData.id} nodeData={nodeData}  childrenData={<ul>{nodeData.children.map(item=> this.renderNode(item))}</ul>}/>
            );
        }
        else {
            return <Node rerender={rerender} key={nodeData.id} nodeData={nodeData}/>;
        }
    }

    render() {
      let {nodeData}=this.props;
      return this.renderNode(nodeData);
    }
  }

class NodeTree extends React.Component{
    render() {
        let {rootData, rerender}=this.props;
        if(!rootData)
            return null;
        return <ul>{rootData.children.map(rootNode=><RootNode rerender={rerender}  nodeData={rootNode}/>)}</ul>;
      }
}

class DraggableCategory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {rootNode : null};
    }

    componentDidMount() {
        this.setState({rootNode : makeRootCategoryNode(dummyData)});
    }

    rerender(){
        this.setState({rootNode : this.state.rootNode});
    }

    render() {
        return (
            <div>
                <NodeTree rerender={this.rerender.bind(this)} rootData={this.state.rootNode}></NodeTree>
            </div>
        );
    }
}

ReactDOM.render(
    <DraggableCategory/>,
    document.getElementById('root')
);