import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { CompanyType, ProductTypes } from "../../domain/entities/Product";
import Cookies from "js-cookie";
import { addProduct } from "../../services/ProductsServices";
import { getProducts } from "../../services/ProductsServices";
import { tokenType } from "../../domain/responses/productResponse";
import { authService } from "../../services/AuthServices";
import MainLayout from "../layouts/MainLayoutComponent";
import Grid from '@mui/material/Grid';
import ItemCard from "../components/itemCard/ItemCardComponent";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextFields from "../components/textField/textFieldComponent";
import MenuItem from '@mui/material/MenuItem'


const Dashboard = () => {
  const navigate = useNavigate();
  let itemArray = []
  const [userInfo, setUserInfo] = useState<any>({});
  const [userItems, setUserItems] = useState<any>({});
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("Product");
  const [productDescription, setProductDescription] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productImage, setProductImage] = useState("");
  const [open, setOpen] = useState(false);

  const currencies = [
    {
      value: 'Product',
      label: 'Product',
    },

    {
      value: 'Service',
      label: 'Service',
    },
  ];
  //prevent users from accessing the login page when logged in
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
    } else {
      authService(token).then((data) => {
          console.log(data);
          if (data.data.isValid == false) {
            navigate("/login")
          } else {
            setUserInfo(data.data.user_info);
            getProduct({companyOfProduct:data.data.user_info.company});
            console.log(data.data.user_info);
          }
        });
    }
    console.log("tokeen",token);
  }, []);

  useEffect(() => {
    console.log(userItems);
  }, [userItems])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName((event.target as HTMLInputElement).value);
  };

  const getProductType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductType((event.target as HTMLInputElement).value);
  };

  const getProductDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductDescription((event.target as HTMLInputElement).value);
  };

  const getProductCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductCompany((event.target as HTMLInputElement).value);
  };
  
  //log user out
  const logOut = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  console.log(productImage)

  const submitFormData = async (event: React.FormEvent) => {
    event.preventDefault();
    const formValues = {
      nameOfProduct: productName,
      typeOfProduct: productType,
      descriptionOfProduct: productDescription,
      companyOfProduct: userInfo.company,
      imageOfProduct: productImage,
    };
    console.log(formValues)
    const token = Cookies.get("authToken");
    addProduct(formValues, token)
      .then((results) => {
        if (results.data.status == "ok") {
          alert("saved");
          handleClose()
          getProduct(formValues);
        }
        console.log(results.data);
      })
      .catch((error) => {
        alert(error);
        logOut()
      });
  };

  
  const getProduct = async (objectValues: ProductTypes | CompanyType) => {
    const token = Cookies.get("authToken");
    console.log(objectValues.companyOfProduct);
    await getProducts(objectValues,token)
      .then((data) => {
        if (data.data.status == "ok") {
          // console.log(data.data.userProducts)
          setUserItems(data.data.userProducts)
          
        }
      }).catch((error) => {
        alert(error);
      });
  };

  return (
     <MainLayout>
      <div>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <h2>My Items</h2>
        </Grid>
          
          <Grid item xs={12} sm={6}>
          <Button variant="outlined" onClick={handleClickOpen}>
          Add New Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
        <form onSubmit={submitFormData}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={getProductName}
            sx={{
              width: "100%",
              marginBottom:"20px"
            }}
          />

<TextField
          id="outlined-select-currency"
          select
          label="Item Type"
          defaultValue="Product"
          fullWidth
          helperText=""
          sx={{
            marginBottom:"20px"
          }}
          onChange={getProductType}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            onChange={getProductDescription}
            sx={{
              width: "100%",
              marginBottom:"20px"
            }}
          />

<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company"
            type="text"
            fullWidth
            disabled
            value={userInfo.company}
            variant="outlined"
            onChange={getProductCompany}
            sx={{
              width: "100%",
              marginBottom:"20px"
            }}
          />
     {/* @ts-ignore */}
<FileBase type="file" multiple={false} onDone={({ base64 }) => {
            setProductImage(base64);
          }}
        />
        <DialogActions>
          <Button onClick={submitFormData} type="submit">Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </form>
        </DialogContent>
        
      </Dialog>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
        {
          Object.values(userItems).map(
            (item:any)=>{
              console.log("image",item.imageOfProduct)
              return <Grid item xs={12} sm={4}>
              <ItemCard itemName={item.name} itemType={item.productType} itemImage={item.image}></ItemCard>
             </Grid>
            }
          )
        }

        </Grid>
      
    </div>
    
     </MainLayout>
     
    
  );
};

export default Dashboard;
