import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStors";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { Add, Remove } from "@mui/icons-material";

export default function BasketPage(){
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch(); 
    const {Basket: BasketActions} = agent;
    const removeItem = (prodcutId: number) => {
        BasketActions.removeItem(prodcutId, dispatch)
    };
    const decrementItem = (productId: number, quantity: number = 1) => {
        BasketActions.decrementItemQuantity(productId, quantity,dispatch); 
    };
    const incrementItem = (productId: number, quantity: number = 1) => {
        BasketActions.incrementItemQuantity(productId, quantity,dispatch); 
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-Us',{
            style: 'currency', currency: 'USD', minimumFractionDigits: 2
        }).format(price);
    };

    const extractImageName = (item: Product): string | null => {
        if (item && item.pictureURL) {
            const parts = item.pictureURL.split('/');
            if (parts.length > 0) {
                const imageName = parts[parts.length - 1];
                return imageName;
            }
        }
        return null;
    };

    if(!basket || basket.items.length == 0) return <Typography variant = 'h3'>Basket is Empty</Typography> 


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.pictureURL && (
                                    <img src={"/images/products/"+ extractImageName(item)} alt="Product" width="50" height="50" />
                                )}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatPrice(item.price)}</TableCell>
                            <TableCell>
                                <IconButton color='error' onClick={() => decrementItem(item.id)}>
                                    <Remove />
                                </IconButton>
                                {item.quantity}
                                <IconButton color='error' onClick={() => incrementItem(item.id)}>
                                    <Add />
                                </IconButton>
                            </TableCell>
                            <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => removeItem(item.id)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}