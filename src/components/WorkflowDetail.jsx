import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Chip
} from '@mui/material';
import { CascadeTree } from 'rsuite';

function WorkflowDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workflow, setWorkflow] = useState(null);
    const [selectedType, setSelectedType] = useState(null);     // current tree selection
    const [confirmedType, setConfirmedType] = useState(null);   // confirmed "Put" selection

    // Fetch workflow details
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

    const updateStatus = (status) => {
        axios.patch(`http://localhost:5000/workflows/${id}`, { status })
            .then(() => setWorkflow(prev => ({ ...prev, status })))
            .catch(err => console.log('Error updating workflow:', err));
    };

    if (!workflow) return <Typography>Loading...</Typography>;

    // Workflow tree data
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

    // Display confirmed type nicely
    const getSelectedTypeLabel = () => {
        if (!confirmedType) return 'None';
        return confirmedType.split('-').join(' → ');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Workflow Detail
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Grid container spacing={2}>

                    {/* Title */}
                    <Grid item xs={12}>
                        <Typography variant="h6">{workflow.title}</Typography>
                    </Grid>

                    {/* ID & Status */}
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
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Workflow Type
                        </Typography>

                        {/* Show confirmed selection */}
                        <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic' }}>
                            Selected Type: {getSelectedTypeLabel()}
                        </Typography>

                        {/* Flex container: search input full width + "Put" button */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* CascadeTree wrapper with full width */}
                            <Box sx={{ flex: 1 }}>
                                <CascadeTree
                                    data={workflowTreeData}
                                    value={selectedType}
                                    onChange={setSelectedType} // update only selected
                                    searchable
                                    searchPlaceholder="Put Type"
                                    style={{ width: '100%', height: 40 }}  // ensure fixed height
                                    placeholder="Select Workflow Type"
                                />
                            </Box>

                            {/* Put button aligned to the right */}
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ height: 40 }} // match height with search input
                                onClick={() => {
                                    if (!selectedType) return;

                                    // Confirm selection
                                    setConfirmedType(selectedType);

                                    // Parse tiers
                                    const parts = selectedType.split('-');
                                    const updatedType = {
                                        tier1: parts[0],
                                        tier2: parts[1] || null,
                                        tier3: parts[2] || null
                                    };

                                    // Save to backend
                                    axios.patch(`http://localhost:5000/workflows/${workflow.id}`, {
                                        workflowType: updatedType
                                    })
                                        .then(() => {
                                            setWorkflow(prev => ({
                                                ...prev,
                                                workflowType: updatedType
                                            }));
                                        })
                                        .catch(err => console.log('Error updating workflow type:', err));
                                }}
                            >
                                Put
                            </Button>
                        </Box>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <Typography><strong>Description:</strong></Typography>
                        <Typography>{workflow.description}</Typography>
                    </Grid>

                    {/* Created By / At */}
                    <Grid item xs={6}>
                        <Typography><strong>Created By:</strong> {workflow.createdBy}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>Created At:</strong> {workflow.createdAt}</Typography>
                    </Grid>

                    {/* Pending Approval Buttons */}
                    {workflow.status === 'pending' && (
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ mr: 2 }}
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
                        </Grid>
                    )}

                    {/* Back Button */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    );
}

export default WorkflowDetail;