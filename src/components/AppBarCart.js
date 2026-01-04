import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function AppBarCart({ cartCount }) {
    return (
        <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
}

const mapStateToProps = (state) => ({
    cartCount: state.cart.items.length
});

export default connect(mapStateToProps)(AppBarCart);
