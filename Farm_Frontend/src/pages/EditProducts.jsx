import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditProducts = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [productDetails,setProductDetails] = useState({
        name:"",
        productId:"",
        quantity:"",
        price:"",
        description:"",
        imageUrl:"",
    });
    const [loading,setLoading]= useState(false);
    const [productImage,setProductImage] = useState(null);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [name]:value,
        }));

        console.log("Form Data:", formData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append("name", productDetails.name);
        formData.append("productId", productDetails.productId);
        formData.append("quantity", productDetails.quantity);
        formData.append("price", productDetails.price);
        formData.append("description", productDetails.description);
        if (productImage) {
          formData.append("image", productImage);
        }
      
        try {
          const res = await fetch(`http://localhost:4000/api/products/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          });
          const result = await res.json();
          if (!result.error) {
            //update the imageurl with the new url
            setProductDetails((prevDetails) => ({
              ...prevDetails,
              imageUrl:result.imageUrl,
            }));
            toast.success(`Updated [${productDetails.name}]`);
            setProductDetails({
              name: "",
              productId: "",
              quantity: "",
              price: "",
              description: "",
              imageUrl:"",
            });
            setProductImage(null); // Reset the product image state
            navigate("/allproducts");
          } else {
            toast.error(result.error);
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to update product");
        }
      };
      

    useEffect(() => {

        async function fetchProducts() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/products/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setProductDetails({
                name:result.name,
                productId:result.productId,
                quantity:result.quantity,
                price:result.price,
                description:result.description,
                imageUrl:result.imageUrl,
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchProducts()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Products..."/>:(<>
        <h2>Edit Products</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Product Name"  value={productDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control id="productId" name="productId" type="text" 
        placeholder="Enter Product ID" value={productDetails.productId} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Quantity</Form.Label>
        <Form.Control id="quantity" name="quantity" type="number" 
        placeholder="Quantity" value={productDetails.quantity} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control id="price" name="price" type="text" 
        placeholder="Enter Price" value={productDetails.price} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control id="description" name="description" as="textarea" rows={5}
        placeholder="Enter description" value={productDetails.description} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group controlId="image">
     <Form.Label>Product Image</Form.Label>
     {productDetails.imageUrl && (
      <img 
      src={`http://localhost:4000/${productDetails.imageUrl}`}
      alt={productDetails.name}
      style={{width:'100px',height:'auto'}}
      />
     )}
     <Form.Control
       type="file"
      accept="image/*"
      onChange={(e) => setProductImage(e.target.files[0])}
  />
</Form.Group>
      <Button id="btn" name="submit" variant="primary" type="submit">
        Save Changes
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditProducts;
