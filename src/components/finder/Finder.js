import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import { Link } from "react-router-dom"


import ErrorMassage from '../errorMassage/ErrorMassage';

import MarvelService from '../../services/MarvelService';

import './finder.scss';

const validate = values => {
    const errors = {}

    if (!values.char) {
        errors.char = "This field is required"
    } 

    return errors;
}


const Finder = () => {

    const [foundedId, setFoundedId] = useState(null);
    const [submitedOnce, setSubmitedOnce] = useState(false);
    const [charName, setCharName] = useState(null);


    const {loading, error, getIdByName, clearError} = MarvelService();




    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? (
                        <div className="finder__loading">
                            Loading...
                        </div>
                        ) : null;

    const founded = (
        <div className="finder__founded">
            <span>{`There is! Visit ${charName} page?`}</span>
            <Link to={`/chars/${foundedId}`} className="button button__secondary">
                    <div className="inner">To Page</div>
            </Link>
        </div>
    )


    const link =  foundedId ? founded : <div className="finder__error">The character was not found. Check the name and try again</div>;
    let content = (!loading && !error && submitedOnce) ? link : null;



    return (
        <div className="finder">
            <h2 className="finder__title">Or find a character by name:</h2>

                <Formik
                    initialValues = {{
                        char: "",
                    }}
                    validate={validate}
                    onSubmit = {values => {
                        setSubmitedOnce(true);
                        setCharName(values.char);
                        getIdByName(values.char)
                            .then(setFoundedId)
                        
                    }}>
                    
                    <Form className="finder__form">
                        <Field
                            id="char"
                            name="char"
                            type="text"
                            placeholder="Enter name"
                        />

                        <button type="submit" className="button button__main">
                            <div className="inner">Find</div>
                        </button>
                        <FormikErrorMessage className="finder__error" name="char" component="div"/>
                        {errorMassage}
                        {spinner}
                    </Form>
                    

                </Formik>
                {content}
        </div>
    )
}



export default Finder;