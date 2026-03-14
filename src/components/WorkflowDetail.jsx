import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'rsuite/dist/rsuite.css';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Chip,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { CascadeTree } from 'rsuite';

function WorkflowDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workflow, setWorkflow] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [confirmedType, setConfirmedType] = useState(null);
    const [assignees, setAssignees] = useState([]);

    // Fetch workflow
    useEffect(() => {
        axios.get(`http://localhost:5000/workflows/${id}`)
            .then(res => {
                setWorkflow(res.data);
                if (res.data.workflowType) {
                    const { tier1, tier2, tier3 } = res.data.workflowType;
                    const initial = [tier1, tier2, tier3].filter(Boolean).join('-');
                    setSelectedType(initial);
                    setConfirmedType(initial);
                }
            })
            .catch(err => console.log('Error fetching workflow:', err));
    }, [id]);

    // Dummy assignee data
    useEffect(() => {
        setAssignees([
            { id: 1, name: 'John Manager', role: 'Manager', status: 'Pending' },
            { id: 2, name: 'Sarah HR', role: 'HR', status: 'Waiting' }
        ]);
    }, []);

    const updateStatus = (status) => {
        axios.patch(`http://localhost:5000/workflows/${id}`, { status })
            .then(() => setWorkflow(prev => ({ ...prev, status })))
            .catch(err => console.log('Error updating workflow:', err));
    };

    if (!workflow) return <Typography>Loading...</Typography>;

    const workflowTreeData = [
        {
            label: 'Admin',
            value: 'Admin',
            children: [
                {
                    label: 'Leave',
                    value: 'Admin-Leave',
                    children: [
                        { label: 'Sick Leave', value: 'Admin-Leave-SickLeave' }
                    ]
                }
            ]
        },
        {
            label: 'Acquire',
            value: 'Acquire',
            children: [
                {
                    label: 'Hardware',
                    value: 'Acquire-Hardware',
                    children: [
                        { label: 'Desktop', value: 'Acquire-Hardware-Desktop' }
                    ]
                },
                {
                    label: 'Software',
                    value: 'Acquire-Software',
                    children: [
                        { label: 'Application Development', value: 'Acquire-Software-ApplicationDevelopment' }
                    ]
                }
            ]
        }
    ];

    const getSelectedTypeLabel = () => {
        if (!confirmedType) return 'None';
        return confirmedType.split('-').join(' → ');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Scrollable content */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Workflow Detail
                </Typography>

                <Grid container spacing={3}>

                    {/* Left Panel */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 3, overflow: 'visible' }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Typography variant="h6">{workflow.title}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography><strong>ID:</strong> {workflow.id}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Chip
                                        label={workflow.status}
                                        color={
                                            workflow.status === 'approved'
                                                ? 'success'
                                                : workflow.status === 'rejected'
                                                    ? 'error'
                                                    : 'warning'
                                        }
                                    />
                                </Grid>

                                {/* Workflow Type */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6">Workflow Type</Typography>
                                    <Typography sx={{ mb: 1, fontStyle: 'italic' }}>
                                        Selected Type: {getSelectedTypeLabel()}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 17 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <CascadeTree
                                                data={workflowTreeData}
                                                value={selectedType}
                                                onChange={setSelectedType}
                                                searchable
                                                placeholder="Select Workflow Type"
                                                style={{ width: '100%', height: 40 }}
                                                container={() => document.body} // Fix collision
                                                menuStyle={{ zIndex: 2000 }}
                                            />
                                        </Box>

                                        <Button
                                            variant="contained"
                                            sx={{ height: 40 }}
                                            onClick={() => {
                                                if (!selectedType) return;
                                                setConfirmedType(selectedType);

                                                const parts = selectedType.split('-');
                                                const updatedType = {
                                                    tier1: parts[0],
                                                    tier2: parts[1] || null,
                                                    tier3: parts[2] || null
                                                };

                                                axios.patch(`http://localhost:5000/workflows/${workflow.id}`, {
                                                    workflowType: updatedType
                                                }).then(() => {
                                                    setWorkflow(prev => ({
                                                        ...prev,
                                                        workflowType: updatedType
                                                    }));
                                                }).catch(err => console.log(err));
                                            }}
                                        >
                                            Put
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography><strong>Created By:</strong> {workflow.createdBy}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography><strong>Created At:</strong> {workflow.createdAt}</Typography>
                                </Grid>

                                {/* Description moved to bottom of left panel */}
                                <Grid item xs={12} sx={{ mt: 3 }}>
                                    <Typography variant="h6">Description</Typography>
                                    <Typography sx={{ mt: 1 }}>{workflow.description}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Right Panel */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Pending With
                            </Typography>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Role</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {assignees.map((assignee) => (
                                        <TableRow key={assignee.id}>
                                            <TableCell>{assignee.name}</TableCell>
                                            <TableCell>{assignee.role}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={assignee.status}
                                                    size="small"
                                                    color={assignee.status === 'Pending' ? 'warning' : 'default'}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>

            {/* Sticky Footer with Centered Buttons */}
            <Box
                sx={{
                    p: 2,
                    borderTop: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'center', // center buttons
                    gap: 2,
                    backgroundColor: 'white',
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 1000
                }}
            >
                {workflow.status === 'pending' && (
                    <>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => updateStatus('approved')}
                        >
                            Approve
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => updateStatus('rejected')}
                        >
                            Reject
                        </Button>
                    </>
                )}

                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
        </Box>
    );
}

export default WorkflowDetail;