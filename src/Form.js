import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";



const formSchema = yup.object().shape({
  name: yup.string().required("Enter Name").min(2, "Ener 2 or more characters"),
  pizzasize: yup.string().required(),
  pepperoni: yup.boolean(),
  bacon: yup.boolean(),
  beef: yup.boolean(),
  ham: yup.boolean(),
  sausage: yup.boolean(),
  instructions: yup.string(),
  pizzasauce: yup.string().required()
});

export default function Form() {

  const [buttonDisabled, setButtonDisabled] = useState(true);


  const [formState, setFormState] = useState({
    name: "",
    pizzasize: "",
    pizzasauce: "",
    pepperoni: "false",
    bacon: "false",
    beef: "false",
    ham: "false",
    sausage: "false",
    instructions: "",
  });


  const [errors, setErrors] = useState({
    name: "",
    pizzasize: "",
    pizzasauce: ""
  });


  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); 
        
        
        setFormState({
          name: "",
          pizzasize: "",
          pepperoni: '',
          bacon: "",
          beef: "",
          ham: "",
          sausage: "",
          pizzasauce: '',
      
          instructions: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 2 ? <p className="error">{errors.name}</p> : null}
      </label><br /><br />

      <label htmlFor="pizzasize">
        Choose Pizza Size: 
        <select id="pizzasize" name="pizzasize" onChange={inputChange}>
        <option></option>

          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label><br /><br />

      <label htmlFor="pizzasauce">
        Choose Pizza Sauce 
        <select id="pizzasauce" name="pizzasauce" onChange={inputChange}>
          <option></option>
          <option value="marinara">Classic Marinara</option>
          <option value="garlicparmesan">Creamy Garlic Parmesan</option>
          <option value="buffalo">Buffalo</option>
        </select>
      </label><br /><br />


      <label htmlFor="toppings">
        Choose Toppings:<br />
        
        <label htmlFor="pepperoni">
          Pepperoni
        <input
          type="checkbox"
          name="pepperoni"
          value={formState.pepperoni}
          onChange={inputChange}
        />
        </label><br />


        <label htmlFor="bacon">
          Bacon
        <input
          type="checkbox"
          name="bacon"
          value={formState.bacon}
          onChange={inputChange}
        />
        </label><br />

        <label htmlFor="beef">
          Beef
        <input
          type="checkbox"
          name="beef"
          value={formState.beef}
          onChange={inputChange}
        />
        </label><br />

        {/* <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
      </label> */}

        <label htmlFor="ham">
          Ham
        <input
          type="checkbox"
          name="ham"
          value={formState.ham}
          onChange={inputChange}
        />
        </label><br />

        <label htmlFor="sausage">
          Sausage
        <input
          type="checkbox"
          name="sausage"
          value={formState.sausage}
          onChange={inputChange}
        />
        </label><br /><br />


        <label htmlFor="instructions">
        Special Instructions:
        <textarea
          name="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {/* {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null} */}
      </label>




        

      </label>














      {/* <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>


      displaying our post request data */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
