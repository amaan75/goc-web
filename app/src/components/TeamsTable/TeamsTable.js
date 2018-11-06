import React from "react";
import TableHeader from "./TableHeader/TableHeader";
import {Table} from "semantic-ui-react";
import TableData from "./TableData/TableData";


class TeamsTable extends React.Component {
    render() {
        return (
            <Table celled structured>
                <TableHeader/>
                <TableData
                    teams={this.props.teams}
                    onChange={this.props.onChange}
                />
            </Table>
        );
    }
}


export default TeamsTable;