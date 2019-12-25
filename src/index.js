import { dummyData } from "./dummyData";
import { CategoryNode, makeRootCategoryNode } from "./type/CategoryNode";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'

const root = makeRootCategoryNode(dummyData);
root.printDepthFirstOrder();

class Node extends React.Component {
    renderNode=(nodeData)=>{
        if (nodeData.children.length>0) {
            return (
                <li>{nodeData.name}
                    <ul>
                    {nodeData.children.map(item => {
                        return this.renderNode(item);
                    })}
                    </ul>
                </li>
            );
        }
        else {
            return <li >{nodeData.name}</li>;
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
        return <ul>{rootData.children.map(rootNode=><Node nodeData={rootNode}/>)}</ul>;
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