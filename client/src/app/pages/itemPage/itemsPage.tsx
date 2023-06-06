import { useState, ChangeEvent, useEffect } from "react"
import NavBar from "../../components/navBar/navBarComponent"
import classes from '../itemPage/ItemPage.module.css'
import { Container, MenuItem, FormControl, Select, InputLabel } from "@mui/material"
import { Grid } from "@mui/material"
import { SelectChangeEvent } from "@mui/material"
import TextField from "@mui/material/TextField"
import ItemCard from "../../components/itemCard/ItemCardComponent"
import { getAllProducts } from "../../../services/ProductsServices"



const ItemsPage = () => {

    const [age, setAge] = useState('');
    const [productItems, setProducts] = useState<any>({})

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getAllProducts().then(response => {
                    setProducts(response.data.products)
                    console.log(response.data.products)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()
    }, [])

    const handleChange = (event: SelectChangeEvent<any>) => {
        setAge(event.target.value as string);
    };


    return (
        <div>
            <NavBar />
            <div className={classes.header}>
                <h1>
                    Discover the best products <br />through our trusted reviews
                </h1>
            </div>
            <div className={classes.main}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Filter</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age}
                                label="Filter"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ width: "100%" }} />
                    </Grid>
                </Grid>


            </div>

            <div className={classes.main}>
                <Grid container spacing={2}>
                    { 
                        Object.values(productItems).map(
                            (item: any) => {
                                return <Grid item xs={12} sm={6} md={4} lg={3}> 
                                    <ItemCard itemName={item.name} itemType={item.productType} itemLink = {item._id} itemImage={item.image}></ItemCard>
                                </Grid>
                            }
                        )
                    }
                </Grid>
            </div>

        </div>
    )
}

export default ItemsPage