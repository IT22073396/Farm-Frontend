import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateFeedback = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [feedbackDetails, setFeedbackDetails] = useState({
        productName: "",
        overallExperience: "",
        quality: "",
        likelihoodToReccomend: "",
        improvedSuggestions: "",
    });

    // State for field validations
    const [validations, setValidations] = useState({
        productName: true,
        overallExperience: true,
        quality: true,
        likelihoodToReccomend: true,
        improvedSuggestions: true,
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeedbackDetails({ ...feedbackDetails, [name]: value });

        // Perform validation on input change
        validateField(name, value);
    }

    const validateField = (name, value) => {
        // You can define your validation rules here
        // For example, checking if the field is not empty
        const isValid = value.trim() !== ""; // Basic validation example

        // Update validation state for the field
        setValidations({ ...validations, [name]: isValid });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all fields are valid
        const isValidForm = Object.values(validations).every(val => val);

        if (isValidForm) {
            const res = await fetch('http://localhost:4000/api/feedbacks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(feedbackDetails),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${feedbackDetails.productName}]`);
                setFeedbackDetails({ productName: "", overallExperience: "", quality: "", likelihoodToReccomend: "", improvedSuggestions: "" });
            } else {
                toast.error(result.error);
            }
        } else {
            // If the form is not valid, display an error message or handle it accordingly
            // For example, you can show a toast message indicating the user to fill all required fields
            toast.error("Please fill all required fields");
        }
    }

    return (
        <>
            <h2>Add Feedback</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        name="productName"
                        type="text"
                        placeholder="Enter Product Name"
                        value={feedbackDetails.productName}
                        onChange={handleInputChange}
                        required
                        isInvalid={!validations.productName} // Apply Bootstrap's invalid style
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a product name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="overallExperience">
                    <Form.Label>Overall Experience</Form.Label>
                    <Form.Control
                        name="overallExperience"
                        type="text"
                        placeholder="Enter Overall Experience"
                        value={feedbackDetails.overallExperience}
                        onChange={handleInputChange}
                        required
                        isInvalid={!validations.overallExperience} // Apply Bootstrap's invalid style
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide an overall experience.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="quality">
                    <Form.Label>Quality</Form.Label>
                    <Form.Control
                        name="quality"
                        type="text"
                        placeholder="Enter Quality"
                        value={feedbackDetails.quality}
                        onChange={handleInputChange}
                        required
                        isInvalid={!validations.quality} // Apply Bootstrap's invalid style
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a quality rating.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="likelihoodToReccomend">
                    <Form.Label>Likelihood To Recommend</Form.Label>
                    <Form.Control
                        name="likelihoodToReccomend"
                        type="text"
                        placeholder="Enter Likelihood To Recommend"
                        value={feedbackDetails.likelihoodToReccomend}
                        onChange={handleInputChange}
                        required
                        isInvalid={!validations.likelihoodToReccomend} // Apply Bootstrap's invalid style
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a likelihood to recommend.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="improvedSuggestions">
                    <Form.Label>Improved Suggestions</Form.Label>
                    <Form.Control
                        name="improvedSuggestions"
                        type="text"
                        placeholder="Enter Improved Suggestions"
                        value={feedbackDetails.improvedSuggestions}
                        onChange={handleInputChange}
                        required
                        isInvalid={!validations.improvedSuggestions} // Apply Bootstrap's invalid style
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide improved suggestions.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Add Feedback
                </Button>
            </Form>
        </>
    );
};

export default CreateFeedback;
