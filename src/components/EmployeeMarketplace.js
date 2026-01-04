import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/action/cartActions';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const products = [
    { id: 'P1', name: 'Laptop', price: 1200 },
    { id: 'P2', name: 'Headphones', price: 150 },
    { id: 'P3', name: 'Monitor', price: 300 },
    { id: 'P4', name: 'Keyboard', price: 80 }
];

function EmployeeMarketplace({ addToCart }) {
    return (
        <Grid container spacing={3}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="subtitle1">${product.price}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default connect(null, { addToCart })(EmployeeMarketplace);
