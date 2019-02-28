import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css'

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isMenuOpen: false};
        this.displayMenuLayout = this.displayMenuLayout.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidUpdate() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    displayMenuLayout() {
        this.setState({isMenuOpen:true});
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({isMenuOpen:false});
        }
    }

    render() {
        return(
            <div>
                <nav className="nav-bar">
                    <ul className="nav-left">
                        <li>
                            Live&nbsp;&nbsp;Market&nbsp;&nbsp;Watch
                        </li>
                    </ul>
                    <ul className="nav-right">
                        <li>
                            <img
                                src={require("../images/hamburger-icon.png")}
                                width={25}
                                height={25}
                                alt="app-menu-icon"
                                onClick={this.displayMenuLayout}
                                className="menu-hamburger"
                            />
                        </li>
                    </ul>
                </nav>
                {this.state.isMenuOpen &&
                <div className="app-menu" ref={this.setWrapperRef} >
                    <div className="tip"/>
                    <div className="menu-container">
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/sectors">Sectors</Link>
                            </li>
                            <li>
                                <Link to="/fo">F & O</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        )
    }
}
