import { dummyData } from "./dummyData";
import { CategoryNode, makeRootCategoryNode } from "./type/CategoryNode";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'
import { node } from "prop-types";

const root = makeRootCategoryNode(dummyData);
root.printDepthFirstOrder();

class Node extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handleDragStart=this.handleDragStart.bind(this);
        this.handleDrop=this.handleDrop.bind(this);
        this.handleOnDragOver=this.handleOnDragOver.bind(this);
        this.handleDragEnd= this.handleDragEnd.bind(this);
    }

    handleClick(e){
        e.stopPropagation();
        let {nodeData}=this.props;
        alert(nodeData.name);
    }

    handleDragStart(e){
        e.stopPropagation();
        let {nodeData}=this.props;
        e.dataTransfer.dropEffect="move";
        e.dataTransfer.setData("nodeId", nodeData.id);
        console.log("handleDragStart");
    }

    handleDragEnd(e){
        e.target.style.color = 'black';
        e.preventDefault();
    }

    handleDrop(e) {
        e.stopPropagation();
        var data = e.dataTransfer.getData("nodeId"); 
        console.log("handleDrop");
        console.log(data);
      }
      
    handleOnDragOver(e){
        e.preventDefault();
    }
/* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
Event	On Event Handler	Fires when…
drag	ondrag	…a dragged item (element or text selection) is dragged.
dragend	ondragend	…a drag operation ends (such as releasing a mouse button or hitting the Esc key; see Finishing a Drag.)
dragenter	ondragenter	…a dragged item enters a valid drop target. (See Specifying Drop Targets.)
dragexit	ondragexit	…an element is no longer the drag operation's immediate selection target.
dragleave	ondragleave	…a dragged item leaves a valid drop target.
dragover	ondragover	…a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
dragstart	ondragstart	…the user starts dragging an item. (See Starting a Drag Operation.)
drop	ondrop	…an item is dropped on a valid drop target. (See Performing a Drop.)
 */

    render() {
        let {nodeData,childrenData}=this.props;
        return <li draggable onClick={this.handleClick} onDragEnd={this.handleDragEnd} onDragOver={this.handleOnDragOver} onDragStart={this.handleDragStart} onDrop={this.handleDrop}>{nodeData.name}{childrenData}</li>
      }
}

class RootNode extends React.Component {
    renderNode=(nodeData)=>{
        if (nodeData.children.length>0) {
            return ( 
                <Node nodeData={nodeData}  childrenData={<ul>{nodeData.children.map(item=> this.renderNode(item))}</ul>}/>
            );
        }
        else {
            return <Node nodeData={nodeData}/>;
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