
import { removeFromCart, clearCart } from '../redux/action/cartActions';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Button, Box, Divider } from '@mui/material';

function CartPage({ cartItems, removeFromCart, clearCart }) {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography>No items in the cart.</Typography>
            ) : (
                <Box>
                    {/* Table Header */}
                    <Grid container spacing={2} sx={{ fontWeight: 'bold', mb: 1 }}>
                        <Grid item xs={6}>
                            Product Name
                        </Grid>
                        <Grid item xs={3}>
                            Price
                        </Grid>
                        <Grid item xs={3}>
                            Action
                        </Grid>
                    </Grid>
                    <Divider />

                    {/* Table Rows */}
                    {cartItems.map((item) => (
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            key={item.id}
                            sx={{ py: 1, borderBottom: '1px solid #ccc' }}
                        >
                            <Grid item xs={6}>
                                <Typography>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>${item.price}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}

                    {/* Clear Cart Button */}
                    <Box mt={3}>
                        <Button variant="contained" color="secondary" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.items
});

export default connect(mapStateToProps, { removeFromCart, clearCart })(CartPage);

