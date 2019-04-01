import React,{Component} from 'react';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactCytoscape } from 'react-cytoscape';
import { Graph } from 'react-d3-graph';
let data = {
    nodes: [],
    links: []
}

//toDo: Set up links
//Source is the "parent"
//target is the "child"

//links:
// [{ source: '4534095834985', target: '345345340958' },
// { source: '345345340958', target: '234234293048' }]
class GraphContainer extends React.Component{

    onClickNode(nodeId) {
        console.log(nodeId);
        console.log(this.props.nodez)
    }
    componentWillMount() {
        console.log(this.props.nodez);
        for (let i =0; i < this.props.nodez.length; i++) {
            data.nodes.push({id: this.props.nodez[i].id})
            if (this.props.nodez[i].pointerA !== undefined) {
                console.log(`sourceA: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerA}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerA})
            }
            if (this.props.nodez[i].pointerB !== undefined) {
                console.log(`sourceB: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerB}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerB})
            }
            if (this.props.nodez[i].pointerC !== undefined) {
                console.log(`sourceC: ${this.props.nodez[i].id}, target: ${this.props.nodez[i].pointerC}`)
                data.links.push({source: this.props.nodez[i].id, target: this.props.nodez[i].pointerC})
            }
            if (this.props.nodez[i].pointerD !== undefined) {
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
            height: '100vh',
            width: '100vw',
          };
        
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

const mapStateToProps = state => ({
    nodez: state.adventure.currentAdventure.nodes

})

connect(mapStateToProps)(Graph)
export default  connect(mapStateToProps)(GraphContainer);