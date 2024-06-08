import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { ip } from './ip';
import 'bootstrap/dist/css/bootstrap.min.css';

const PackageLogs = () => {
    const { user } = useUser();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${ip}/packageLogs/${user._id}`);
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="container">
            <h1>Package Logs</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Opened by</th>
                    <th>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log, index) => (
                    <tr key={index} className={log.type ? "" : "table-danger"}>
                        <td>{index + 1}</td>
                        <td>{log.code}</td>
                        <td>{log.openedBy}</td>
                        <td>{new Date(log.date).toLocaleDateString('sl-SL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PackageLogs;