import React from "react";
import TableHeader from "./TableHeader/TableHeader";
import { Table } from "semantic-ui-react";
import TableData from "./TableData/TableData";


class TeamsTable extends React.Component {
    render() {
        return (
            <Table
                disabled={this.props.disabled}
                celled
                structured>
                <TableHeader />
                <TableData
                    managedTeam={this.props.managedTeam}
                    onChange={this.props.onChange}
                />
            </Table>
        );
    }
}


export default TeamsTable;