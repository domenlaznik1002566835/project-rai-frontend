import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import { ip } from './ip';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Dropdown, DropdownButton } from 'react-bootstrap';

const DatabaseManipulation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('clients');
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [updates, setUpdates] = useState({});
    const [deletes, setDeletes] = useState({});
    const [showModal, setShowModal] = useState(false);

    const properties = {
        clients: ['created', '_id', 'firstName', 'lastName', 'email'],
        rooms: ['created', '_id', 'number', 'size', 'occupied'],
        staff: ['created', '_id', 'firstName', 'lastName', 'email', 'level'],
    };

    const propertyLabels = {
        _id: 'ID',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        created: 'Created',
        updated: 'Updated',
        number: 'Number',
        size: 'Size',
        occupied: 'Occupied',
        level: 'Level',
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (filter) => {
        setFilterOption(filter);
    };

    const handleDelete = (id) => {
        if (deletes[id]) {
            const newDeletes = { ...deletes };
            delete newDeletes[id];
            setDeletes(newDeletes);
        } else {
            if (updates[id]) {
                const originalData = data.find(item => item._id === id);
                const updatedData = data.map(item => item._id === id ? originalData : item);

                setData(updatedData, () => {
                    const newInputValue = { ...inputValue };
                    Object.keys(newInputValue).forEach(key => {
                        newInputValue[key] = originalData[key];
                    });
                    setInputValue(newInputValue);
                });

                const newUpdates = { ...updates };
                delete newUpdates[id];
                setUpdates(newUpdates);
            }
            setDeletes({
                ...deletes,
                [id]: {
                    ...deletes[id],
                    table: filterOption
                }
            });
        }
    };

    useEffect(() => {
        let url;
        switch (filterOption) {
            case 'clients':
                url = `${ip}/clients`;
                break;
            case 'rooms':
                url = `${ip}/rooms`;
                break;
            case 'staff':
                url = `${ip}/staff`;
                break;
            default:
                url = '';
        }

        if (url) {
            fetch(url)
                .then((response) => response.json())
                .then((fetchedData) => {
                    const updatedData = fetchedData.map(item => {
                        if (updates[item._id]) {
                            return {
                                ...item,
                                ...updates[item._id]
                            };
                        }
                        return item;
                    });

                    const filteredData = updatedData.filter(item => {
                        return properties[filterOption].some(property => {
                            let value = item[property];
                            if (property === 'created') {
                                value = formatDate(value);
                            }
                            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
                        });
                    });
                    setData(filteredData);
                })
                .catch((error) => console.error(error));
        }
    }, [filterOption, searchTerm]);

    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <DropdownButton
                        id="dropdown-basic-button"
                        className="mb-3 mt-3"
                        title={filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                        onSelect={handleFilterChange}
                    >
                        <Dropdown.Item eventKey="clients">Clients</Dropdown.Item>
                        <Dropdown.Item eventKey="rooms">Rooms</Dropdown.Item>
                        <Dropdown.Item eventKey="staff">Staff</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="form-control mt-3"
                    />
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        {properties[filterOption].map(property => (
                            <th key={property}>
                                {propertyLabels[property]}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item._id} className={deletes[item._id] ? 'table-danger' : updates[item._id] ? 'table-warning' : ''}>
                            {properties[filterOption].map(property => (
                                <td key={property} onClick={() => {
                                    // Inside your table cell onClick function
                                    if (property !== '_id' && property !== 'occupied' && property !== 'created') {
                                        setEditing({ id: item._id, property });
                                        setInputValue({
                                            ...inputValue,
                                            [property]: item[property]
                                        });
                                    }
                                }}
                                    className={editing && editing.id === item._id && editing.property === property ? 'editing' : ''}
                                >
                                    {editing && editing.id === item._id && editing.property === property ? (
                                        <input
                                            className="form-control fixed-dimension-input"
                                            type="text"
                                            value={inputValue[property]}
                                            onChange={(event) => {
                                                let value = event.target.value;
                                                if (property === 'number' || property === 'size') {
                                                    value = value.replace(/[^0-9]/g, ''); // Allow only numbers
                                                } else if (property === 'level') {
                                                    value = value.replace(/[^0-3]/g, ''); // Allow only 0, 1, 2, 3
                                                }
                                                setInputValue({ ...inputValue, [property]: value });
                                                setUpdates({
                                                    ...updates,
                                                    [item._id]: {
                                                        ...updates[item._id],
                                                        [property]: value,
                                                        table: filterOption
                                                    }
                                                });
                                            }}
                                            onBlur={(event) => {
                                                const updatedData = data.map(dataItem => dataItem._id === item._id ? {
                                                    ...dataItem,
                                                    [property]: event.target.value
                                                } : dataItem);
                                                setData(updatedData);
                                                setEditing(null);
                                            }}
                                        />
                                    ) : property === 'created' ? formatDate(item[property]) :
                                        property === 'occupied' ? (item[property] ? 'true' : 'false') : // Add this line
                                            item[property]}
                                </td>
                            ))}
                            <td>
                                <button className={`btn ${deletes[item._id] ? 'btn-primary' : 'btn-danger'}`}
                                        onClick={() => handleDelete(item._id)}>
                                    {deletes[item._id] ? 'Undo' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary position-sticky" style={{bottom: "10px"}}
                    onClick={() => setShowModal(true)}>Submit
            </button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to make these changes?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        console.log(Object.entries(updates).map(([id, data]) => ({ id, ...data })));
                        console.log(Object.entries(deletes).map(([id, data]) => ({ id, ...data })));
                        setUpdates({});
                        setDeletes({});
                        setShowModal(false);
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('sl-SL', options);
}

export default DatabaseManipulation;
