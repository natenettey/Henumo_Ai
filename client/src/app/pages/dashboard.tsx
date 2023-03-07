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

const Dashboard = () => {
  const navigate = useNavigate();
  let itemArray = []
  const [userInfo, setUserInfo] = useState<any>({});
  const [userItems, setUserItems] = useState<any>({});
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productImage, setProductImage] = useState("");

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

  const getProductName = (event: React.FormEvent<HTMLInputElement>) => {
    setProductName((event.target as HTMLInputElement).value);
  };

  const getProductType = (event: React.FormEvent<HTMLInputElement>) => {
    setProductType((event.target as HTMLInputElement).value);
  };

  const getProductDescription = (event: React.FormEvent<HTMLInputElement>) => {
    setProductDescription((event.target as HTMLInputElement).value);
  };

  const getProductCompany = (event: React.FormEvent<HTMLInputElement>) => {
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
      companyOfProduct: productCompany,
      imageOfProduct: productImage,
    };
    const token = Cookies.get("authToken");
    addProduct(formValues, token)
      .then((results) => {
        if (results.data.status == "ok") {
          alert("saved");
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
        <div>
          <h2>My Items</h2>
        </div>

        <Grid container spacing={2}>
        {
          Object.values(userItems).map(
            (item:any)=>{
              return <Grid item xs={12} sm={4}>
              <ItemCard itemName={item.name} itemType={item.productType}></ItemCard>
             </Grid>
            }
          )
        }

        </Grid>
      Hi {userInfo.username}
      <br />
      <form onSubmit={submitFormData}>
        <input type="text" name="name" onChange={getProductName}></input>
        <br />
        <input type="text" name="prodtyp" onChange={getProductType}></input>
        <br />
        <input
          type="text"
          name="descr"
          onChange={getProductDescription}
        ></input>
        <br />
        <input type="text" name="comp" onChange={getProductCompany}></input>
        <br />
        {/* @ts-ignore */}
        <FileBase type="file" multiple={false} onDone={({ base64 }) => {
            setProductImage(base64);
          }}
        />

        <button>submit</button>
      </form>
      <p></p>
      
    </div>
    
     </MainLayout>
     
    
  );
};

export default Dashboard;
