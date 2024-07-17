import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFoundError";


export default function ProductDetails(){
    const {id} = useParams<{id:string}>();
    const [product, setProduct] = useState<Product | null>();
    const [loading, setLoading] = useState(true);

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


    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-Us',{
            style: 'currency', currency: 'USD', minimumFractionDigits: 2
        }).format(price);
    }

    // useEffect(()=> {
    //     axios.get(`http://localhost:8081/api/products/${id}`).
    //     then(response => setProduct(response.data)).
    //     catch(error=>console.error(error)).
    //     finally(() => setLoading(false))
    // }, [id])
    

    // useEffect(()=> {
    //         id && agent.Store.details(parseInt(id)).
    //         then(response => setProduct(response.data)).
    //         catch(error=>console.error(error)).
    //         finally(() => setLoading(false))
    // }, [id])

    useEffect(() => {
        if (id) {
            console.log("Fetching product with ID:", id);
            agent.Store.details(parseInt(id))
                .then(response => {
                    console.log("Product fetched:", response);
                    setProduct(response);
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id]);

    console.log("Id" + product?.name);

    if(loading) return <h3>Loading product...</h3>
    if(!product) return <NotFound/>
    
    return(
        <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={"/images/products/"+extractImageName(product)} alt={product.name} style={{width: '100%'}}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h3'>{product.name}</Typography>
            <Divider sx={{mb:2}}/>
            <Typography gutterBottom color='secondary' variant="h4">{formatPrice(product.price)}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.productType}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.productBrand}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
    )
}