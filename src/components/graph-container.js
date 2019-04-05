import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'react-d3-graph';
import { setCurrentNode } from '../actions/nodes'

let data = {
    nodes: [],
    links: []
}

class GraphContainer extends React.Component {

    onClickNode(nodeId) {
        let nodeArr = this.props.nodez.filter((node) => node.id === nodeId)
        this.props.dispatch(setCurrentNode(nodeArr[0]))
    }

    getFullNode(nodeId) { //get full node is outside of the class due to *this* being binded to the graph
        const nodeArr = this.props.nodez.filter((node) => node.id === nodeId)
        return nodeArr[0]
    }

    componentWillMount() {

        for (let i = 0; i < this.props.nodez.length; i++) {
            if (i === 0) {
                data.nodes.push({ id: this.props.nodez[i].id, title: this.props.nodez[i].title ? this.props.nodez[i].title : this.props.nodez[i].question, color: 'red', symbolType: "triangle" })
                if (this.props.nodez[i].pointerA) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerA })
                }
                if (this.props.nodez[i].pointerB) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerB })
                }
                if (this.props.nodez[i].pointerC) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerC })
                }
                if (this.props.nodez[i].pointerD) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerD })
                }
            } else {
                data.nodes.push({ id: this.props.nodez[i].id, title: this.props.nodez[i].title ? this.props.nodez[i].title : this.props.nodez[i].question })
                if (this.props.nodez[i].pointerA) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerA })
                }
                if (this.props.nodez[i].pointerB) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerB })
                }
                if (this.props.nodez[i].pointerC) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerC })
                }
                if (this.props.nodez[i].pointerD) {
                    data.links.push({ source: this.props.nodez[i].id, target: this.props.nodez[i].pointerD })
                }

            }
        }
    }

    render() {
        const myConfig = {
            nodeHighlightBehavior: true,
            directed: true,
            automaticRearrangeAfterDropNode: true,
            d3: {
                gravity: -300,
                linkLength: 120,
                forceManyBody: function strength() {
                    return -1000;
                },
            },
            node: {
                fontSize: 18,
                color: 'lightgreen',
                size: 800,
                highlightStrokeColor: 'blue',
                labelProperty: 'title',
                highlightFontSize: 'same'
            },
            link: {
                highlightColor: 'lightblue',
                strokeWidth: 4
            }
        };
        const cyStyle = {
            margin: 'auto',
            border: '1px solid lightgreen'
        };
        if (!this.props.nodez) {
            return <div>Loading....</div>
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
    showUpdate: state.node.showUpdate,
    currentNode: state.node.currentNode,
})

connect(mapStateToProps)(Graph)
export default connect(mapStateToProps)(GraphContainer);