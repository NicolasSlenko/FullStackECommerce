import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStors";
import agent from "../../app/api/agent";
import { setBasket } from "../../features/basket/basketSlice";
import {LoadingButton} from '@mui/lab';

interface Props{
    product : Product;
}

export default function ProductCard({product}: Props){
    console.log('Product:', product);

    
    const extractImageName = (item: Product): string | null => {
        console.log(item.name);
        if (item && item.pictureURL) {
            console.log('Picture URL:', item.pictureURL);
            const parts = item.pictureURL.split('/');
            if (parts.length > 0) {
                const imageName = parts[parts.length - 1];
                console.log('Extracted Image Name:', imageName);
                return imageName;
            }
        }
        return null;
    }

    const imageName = extractImageName(product);
    console.log('Extracted Image Name:', imageName);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-Us',{
            style: 'currency', currency: 'USD', minimumFractionDigits: 2
        }).format(price);
    }

const [loading, setLoading] = useState(false);
const dispatch = useAppDispatch(); 

function addItem(){
  setLoading(true);
  agent.Basket.addItem(product, dispatch).then(response=> {
    console.log('New Basket: ', response.basket); 
    dispatch(setBasket(response.basket)); 
  }).catch(error => console.log(error)).finally(()=>setLoading(false)); 
}

return(
<Card>
<CardHeader avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            titleTypographyProps={{sx:{fontWeight:'bold', color: 'primary.main' }}}
            />
        <CardMedia
          sx={{ height: 140, backgroundSize:'contain'}}
          image={"/images/products/"+extractImageName(product)}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            {formatPrice(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.productBrand} / {product.productType}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
          loading = {loading} 
          onClick = {addItem} 
          size = "small" 
          startIcon = {loading ? <CircularProgress size = {20} color = "inherit"/> : null}
          >
            Add to Cart

          </LoadingButton>

          <Button component={Link} to={`/store/${product.id}`} size="small">View</Button>
        </CardActions>
</Card>
);
}