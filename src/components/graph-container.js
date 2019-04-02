import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Graph } from 'react-d3-graph';
import { authError } from '../actions/auth';
import {updateNodeClicked }from '../actions/nodes'
import {updateCurrentNode }from '../actions/createAdventure'
import UpdateNodeForm from './update-node-form'
let data = {
    nodes: [],
    links: []
}


class GraphContainer extends React.Component{

    onClickNode(nodeId) {
        console.log(nodeId);
        this.props.dispatch(updateNodeClicked(nodeId))
        this.props.dispatch(updateCurrentNode(nodeId))
    }

    getFullNode(nodeId) { //get full node is outside of the class due to *this* being binded to the graph
        const nodeArr = this.props.nodez.filter( (node) => node.id === nodeId)
        console.log("the nodeArr is", nodeArr)
        return nodeArr[0]
    }

    componentWillMount() {
        console.log(this.props.nodez);
        for (let i =0; i < this.props.nodez.length; i++) {
            console.log(`id is: ${this.props.nodez[i].id}, the object is: `, this.props.nodez[i])
            data.nodes.push({id: this.props.nodez[i].id})
            if (this.props.nodez[i].pointerA) {
                console.log(`sourceA: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerA}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerA})
            }
            if (this.props.nodez[i].pointerB) {
                console.log(`sourceB: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerB}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerB})
            }
            if (this.props.nodez[i].pointerC) {
                console.log(`sourceC: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerC}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerC})
            }
            if (this.props.nodez[i].pointerD) {
                console.log(`sourceD: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerD}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerD})
            }
        }

    }
    
    render(){
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: 'lightgreen',
                size: 120,
                highlightStrokeColor: 'blue'
            },
            link: {
                highlightColor: 'lightblue'
            }
        };
        let cyStyle = {
            margin: 'auto',
            border: '1px solid lightgreen'
          };
          if (this.props.showUpdate) {
            return (
                <div>
                    <div style={cyStyle}>
                    <Graph
                        props={this.props}
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={data}
                        config={myConfig}
                        onClickNode={this.onClickNode}
                        // onRightClickNode={onRightClickNode}
                        // onClickGraph={onClickGraph}
                        // onClickLink={onClickLink}
                        // onRightClickLink={onRightClickLink}
                        // onMouseOverNode={onMouseOverNode}
                        // onMouseOutNode={onMouseOutNode}
                        // onMouseOverLink={onMouseOverLink}
                        // onMouseOutLink={onMouseOutLink}
                        />
                    </div>
                    <UpdateNodeForm />
                </div>
              );
          } else {          
            return (
                <div style={cyStyle}>
                <Graph
                    props={this.props}
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    onClickNode={this.onClickNode}
                    // onRightClickNode={onRightClickNode}
                    // onClickGraph={onClickGraph}
                    // onClickLink={onClickLink}
                    // onRightClickLink={onRightClickLink}
                    // onMouseOverNode={onMouseOverNode}
                    // onMouseOutNode={onMouseOutNode}
                    // onMouseOverLink={onMouseOverLink}
                    // onMouseOutLink={onMouseOutLink}
                    />
                </div>
          );
        }
    }
}

const mapStateToProps = state => ({
    nodez: state.adventure.currentAdventure.nodes,
    showUpdate : state.node.showUpdate,
    currentNodeId : state.node.currentNode,
    currentNode: state.adventure.currentNode,
})

connect(mapStateToProps)(Graph)
export default  connect(mapStateToProps)(GraphContainer);