import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

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
          <Button size="small">Add to cart</Button>
          <Button component={Link} to={`/store/${product.id}`} size="small">View</Button>
        </CardActions>
</Card>
);
}