import React,{Component} from 'react';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactCytoscape } from 'react-cytoscape';
import { Graph } from 'react-d3-graph';
 
// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: '4534095834985' }, { id: '345345340958' }, { id: '234234293048' }],
    links: [{ source: '4534095834985', target: '345345340958' }, { source: '345345340958', target: '234234293048' }]
};
 
// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
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


 
// graph event callbacks
// const onClickGraph = function() {
//     window.alert(`Clicked the graph background`);
// };
 
// const onClickNode = function(nodeId) {
//     window.alert(`Clicked node ${nodeId}`);
// };
 
// const onRightClickNode = function(event, nodeId) {
//     window.alert(`Right clicked node ${nodeId}`);
// };
 
// const onMouseOverNode = function(nodeId) {
//     window.alert(`Mouse over node ${nodeId}`);
// };
 
// const onMouseOutNode = function(nodeId) {
//     window.alert(`Mouse out node ${nodeId}`);
// };
 
// const onClickLink = function(source, target) {
//     window.alert(`Clicked link between ${source} and ${target}`);
// };
 
// const onRightClickLink = function(event, source, target) {
//     window.alert(`Right clicked link between ${source} and ${target}`);
// };
 
// const onMouseOverLink = function(source, target) {
//     window.alert(`Mouse over in link between ${source} and ${target}`);
// };
 
// const onMouseOutLink = function(source, target) {
//     window.alert(`Mouse out link between ${source} and ${target}`);
// };

class GraphContainer extends React.Component{

    onClickNode(nodeId) {
        console.log(nodeId);
        console.log(this.props.SOMETHINGUNIQUE);
    }

    render(){
        let cyStyle = {
            height: '100vh',
            width: '100vw',
          };
        
          return (
            <div style={cyStyle}>
              <Graph
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
    SOMETHINGUNIQUE: state.adventure.currentAdventure.nodes
})


export default connect(mapStateToProps)(GraphContainer);