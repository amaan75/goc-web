import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HOME_ROUTE, TEAM_MGMT_ROUTE } from "../utils/Constants";


const Nav = ({ activeItem, handleLinkClick }) => (

    <Segment inverted>
        <Menu inverted secondary>
            <Menu.Item name='home'
                as={Link}
                exact="true"
                to={HOME_ROUTE}
                active={activeItem === HOME_ROUTE}
                onClick={handleLinkClick}
            />
            <Menu.Item
                name='Manage Teams'
                as={Link}
                exact="true"
                to={TEAM_MGMT_ROUTE}
                active={activeItem === TEAM_MGMT_ROUTE}
                onClick={handleLinkClick}
            />
        </Menu>
    </Segment>
)

export default Nav;