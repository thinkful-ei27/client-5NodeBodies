import React,{Component} from 'react';
import cytoscape from 'cytoscape';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactCytoscape } from 'react-cytoscape';
import { Graph } from 'react-d3-graph';
 
// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
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
const onClickGraph = function() {
    window.alert(`Clicked the graph background`);
};
 
const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};
 
const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};
 
const onMouseOverNode = function(nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
};
 
const onMouseOutNode = function(nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
};
 
const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};
 
const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};
 
const onMouseOverLink = function(source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
};
 
const onMouseOutLink = function(source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
};

class GraphContainer extends React.Component{
    constructor(props){
        super(props);
        // this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    }
    getElements() {
        return [
            { data: { id: 'cat' } },
            { data: { id: 'bird' } },
            { data: { id: 'ladybug' } },
            { data: { id: 'aphid' } },
            { data: { id: 'rose' } },
            { data: { id: 'grasshopper' } },
            { data: { id: 'plant' } },
            { data: { id: 'wheat' } },  
            { data: { id: 'cat' } },
            { data: { id: 'bird' } },
            { data: { id: 'ladybug' } },
            { data: { id: 'aphid' } },
            { data: { id: 'rose' } },
            { data: { id: 'grasshopper' } },
            { data: { id: 'plant' } },
            { data: { id: 'wheat' } }
        ]
    }

    // renderCytoscapeElement(){

    //     console.log('* Cytoscape.js is rendering the graph..');

    //     this.cy = cytoscape(
    //     {
    //         container: document.getElementById('cy'),

    //         boxSelectionEnabled: true,
    //         autounselectify: true,

    //         style: cytoscape.stylesheet()
    //             .selector('node')
    //             .css({
    //                 'height': 80,
    //                 'width': 80,
    //                 'background-fit': 'cover',
    //                 'border-color': '#000',
    //                 'border-width': 3,
    //                 'border-opacity': 0.5,
    //                 'content': 'data(name)',
    //                 'text-valign': 'center',
    //             })
    //             .selector('edge')
    //             .css({
    //                 'width': 6,
    //                 'target-arrow-shape': 'triangle',
    //                 'line-color': '#ffaaaa',
    //                 'target-arrow-color': '#ffaaaa',
    //                 'curve-style': 'bezier'
    //             })
    //             ,
    //         elements: {
    //             nodes: [
    //                 { data: { id: 'cat' } },
    //                 { data: { id: 'bird' } },
    //                 { data: { id: 'ladybug' } },
    //                 { data: { id: 'aphid' } },
    //                 { data: { id: 'rose' } },
    //                 { data: { id: 'grasshopper' } },
    //                 { data: { id: 'plant' } },
    //                 { data: { id: 'wheat' } },  
    //                 { data: { id: 'cat' } },
    //                 { data: { id: 'bird' } },
    //                 { data: { id: 'ladybug' } },
    //                 { data: { id: 'aphid' } },
    //                 { data: { id: 'rose' } },
    //                 { data: { id: 'grasshopper' } },
    //                 { data: { id: 'plant' } },
    //                 { data: { id: 'wheat' } }
                    
    //             ],
    //             edges: [
    //                 { data: { source: 'cat', target: 'bird' } },
    //                 { data: { source: 'bird', target: 'ladybug' } },
    //                 { data: { source: 'bird', target: 'grasshopper' } },
    //                 { data: { source: 'grasshopper', target: 'plant' } },
    //                 { data: { source: 'grasshopper', target: 'wheat' } },
    //                 { data: { source: 'ladybug', target: 'aphid' } },
    //                 { data: { source: 'aphid', target: 'rose' } }
    //             ]
    //         },

    //         layout: {
    //             name: 'breadthfirst',
    //             directed: true,
    //             padding: 10
    //         }
    //         }); 
    // }

    // componentDidMount(){
    //     this.renderCytoscapeElement();
    // }

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
                onClickNode={onClickNode}
                onRightClickNode={onRightClickNode}
                onClickGraph={onClickGraph}
                onClickLink={onClickLink}
                onRightClickLink={onRightClickLink}
                onMouseOverNode={onMouseOverNode}
                onMouseOutNode={onMouseOutNode}
                onMouseOverLink={onMouseOverLink}
                onMouseOutLink={onMouseOutLink}
                />
            </div>
          );
    }
}

function mapStateToProps(state){
    return {};
}


export default connect(mapStateToProps,null)(GraphContainer);