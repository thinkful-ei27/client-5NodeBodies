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
class GraphContainer extends React.Component{

    onClickNode(nodeId) {
        console.log(nodeId);
        console.log(this.props.nodez)
    }
    componentWillMount() {
        console.log(this.props.nodez);
            for (let i =0; i < this.props.nodez.length; i++) {
                data.nodes.push({id: this.props.nodez[i].id})
            }
            // data = {
            // nodes: [{ id: '4534095834985' }, { id: '345345340958' }, { id: '234234293048' }],
            // links: [{ source: '4534095834985', target: '345345340958' }, { source: '345345340958', target: '234234293048' }]
        // };
    }
    render(){
        // const data = {
        //     nodes: [{ id: '4534095834985' }, { id: '345345340958' }, { id: '234234293048' }],
        //     links: [{ source: '4534095834985', target: '345345340958' }, { source: '345345340958', target: '234234293048' }]
        // };
         
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