import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SectorsDataActions from '../actions/sectors-data-actions';
import { PropTypes } from 'prop-types';
import Header from "../components/header";
import SectorCard from "../components/sector-card";
import '../css/sectors.css';

class Sectors extends React.Component {

    constructor(props) {
        super(props);
        this.props.actions.getSectorsData();
    }

    componentDidMount() {
        setInterval(this.props.actions.getSectorsData, 120000);
    }

    render() {

        let {
            niftyBank,
            niftyIt,
            niftyReality,
            niftyInfra,
            niftyEnergy,
            niftyFMCG,
            niftyPharma,
            niftyMetal,
            niftyAuto
        } = this.props;

        return(
            <div>
                <Header />
                <div className="sectors-grid">
                    <SectorCard header="Nifty Bank" scriptsData={niftyBank}/>
                    <SectorCard header="Nifty IT" scriptsData={niftyIt}/>
                    <SectorCard header="Nifty Pharma" scriptsData={niftyPharma}/>
                </div>
                <div className="sectors-grid">
                    <SectorCard header="Nifty Energy" scriptsData={niftyEnergy}/>
                    <SectorCard header="Nifty Metal" scriptsData={niftyMetal}/>
                    <SectorCard header="Nifty Infra" scriptsData={niftyInfra}/>
                </div>
                <div className="sectors-grid">
                    <SectorCard header="Nifty FMCG" scriptsData={niftyFMCG}/>
                    <SectorCard header="Nifty Auto" scriptsData={niftyAuto}/>
                    <SectorCard header="Nifty Reality" scriptsData={niftyReality}/>
                </div>
            </div>
        )
    }
}

Sectors.propTypes = {
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        niftyBank:state.sectors.sectors.niftyBank,
        niftyIt:state.sectors.sectors.niftyIt,
        niftyReality: state.sectors.sectors.niftyReality,
        niftyInfra: state.sectors.sectors.niftyInfra,
        niftyEnergy: state.sectors.sectors.niftyEnergy,
        niftyFMCG: state.sectors.sectors.niftyFMCG,
        niftyPharma: state.sectors.sectors.niftyPharma,
        niftyMetal: state.sectors.sectors.niftyMetal,
        niftyAuto: state.sectors.sectors.niftyAuto
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...SectorsDataActions}, dispatch)
    }
}

// The connect function connects the Redux Dispatch and state to the AppContainer Container Component.
// Without this the Component wont be functional.

export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
