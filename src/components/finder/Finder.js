import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage} from "formik";


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

    const {loading, error, getIdByName, clearError} = MarvelService();

    // <Link to={`/comics/${id}`}>
    // <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
    // <div className="comics__item-name">{title}</div>
    // <div className="comics__item-price">{price}$</div>
    // </Link>


    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? (
                        <div className="finder__loading">
                            Loading...
                        </div>
                        ) : null;

    const link =  foundedId ? foundedId : <div className="finder__error">The character was not found. Check the name and try again</div>;
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
                        <ErrorMessage className="finder__error" name="char" component="div"/>
                        {errorMassage}
                        {spinner}
                        {content}
                    </Form>

                </Formik>
        </div>
    )
}

export default Finder;