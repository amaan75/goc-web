import React from "react";
import { Menu, Segment, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HOME_ROUTE, TEAM_MGMT_ROUTE } from "../../utils/routes";

interface NavProps {
    activeItem: string,
    handleLinkClick: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void
}

const Nav = ({ activeItem, handleLinkClick }: NavProps) => (

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