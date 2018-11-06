import React from 'react';
import { Table } from "semantic-ui-react";


const TableHeader = (props) => (
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='2' >Teams</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Players</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell  >Team No.</Table.HeaderCell>
            <Table.HeaderCell  >Team Name.</Table.HeaderCell>
            <Table.HeaderCell  >Player No.</Table.HeaderCell>
            <Table.HeaderCell  >Player Name.</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
);



export default TableHeader;