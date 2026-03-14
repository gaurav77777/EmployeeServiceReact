import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    Chip
} from '@mui/material';






import { Link } from 'react-router-dom';

function WorkflowQueue() {
    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/workflows')
            .then(res => setWorkflows(res.data))
            .catch(err => console.log('Error fetching workflows:', err));
    }, []);

    const updateStatus = (id, status) => {
        axios.patch(`http://localhost:5000/workflows/${id}`, { status })
            .then(() => {
                setWorkflows(prev =>
                    prev.map(w =>
                        w.id === id ? { ...w, status } : w
                    )
                );
            })
            .catch(err => console.log('Error updating workflow:', err));
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Admin Workflow Queue
            </Typography>

            {workflows.length === 0 ? (
                <Typography>No workflow requests available.</Typography>
            ) : (
                workflows.map((workflow) => (
                    <Paper key={workflow.id} sx={{ p: 2, mb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    component={Link}
                                    to={`/admin/workflows/${workflow.id}`}
                                    sx={{ textDecoration: 'none', color: '#3f51b5', cursor: 'pointer' }}
                                >
                                    {workflow.title}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><strong>Created By:</strong> {workflow.createdBy}</Typography>
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

                            <Grid item xs={12}>
                                <Typography>{workflow.description}</Typography>
                            </Grid>

                            {workflow.status === 'pending' && (
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{ mr: 2 }}
                                        onClick={() => updateStatus(workflow.id, 'approved')}
                                    >
                                        Approve
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => updateStatus(workflow.id, 'rejected')}
                                    >
                                        Reject
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                ))
            )}
        </Box>
    );
}

export default WorkflowQueue;