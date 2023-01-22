import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { ProductTypes } from "../../domain/entities/Product";
import Cookies from "js-cookie";
import { addProduct } from "../../services/ProductsServices";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({});
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
      fetch("http://localhost:8000/account/auth-check", {
        headers: {
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.isValid == false) {
            navigate("/login");
          } else {
            setUserInfo(data.user_info);
            console.log(userInfo);
          }
        });
    }
    console.log(token);
  }, []);

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

  console.log(productImage);

  //create form submission funcn to api

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
    addProduct(formValues)
      .then((results) => {
        if (results.data.status == "ok") {
          alert("saved");
          getProducts(formValues);
        }
        console.log(results.data);
      })
      .catch((error) => {
        alert(error);
        logOut()
      });
  };

  //create function to get the submitted data
  const getProducts = async (objectValues: ProductTypes) => {
    console.log(objectValues.companyOfProduct);
    await fetch("http://localhost:8000/products/fetchproducts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objectValues),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "ok") {
          console.log("the products are :", data.userProducts);
        }
      });
  };

  return (
    <div>
      Hi {userInfo.username}
      <br />
      <button onClick={logOut}>Logout</button>
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
    </div>
  );
};

export default Dashboard;
