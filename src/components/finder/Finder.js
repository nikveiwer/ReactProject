import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import { Link } from "react-router-dom"


import ErrorMassage from '../errorMassage/ErrorMassage';

import MarvelService from '../../services/MarvelService';

import './finder.scss';

const setFinderContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return null
            break;
        case "loading":
            return <div className="finder__loading">Loading...</div>;
            break;
        case "notFounded":
            return <div className="finder__error">The character was not found. Check the name and try again</div>;
            break;
        case "founded":
            return <Component data={data}/>;
            break;
        case "error":
            return <ErrorMassage/>;
            break;
        default:
            throw new Error("Unexpected process state")
        
    }
}


const validate = values => {
    const errors = {}

    if (!values.char) {
        errors.char = "This field is required"
    } 

    return errors;
}


const Finder = () => {

    const [foundedId, setFoundedId] = useState(null);
    const [charName, setCharName] = useState(null);


    const {process, setProcess, getIdByName} = MarvelService();



    return (
        <div className="finder">
            <h2 className="finder__title">Or find a character by name:</h2>

                <Formik
                    initialValues = {{
                        char: "",
                    }}
                    validate={validate}
                    onSubmit = {values => {
                        setCharName(values.char);
                        getIdByName(values.char)
                            .then(id => {
                                if (id) {
                                    setFoundedId(id);
                                    setProcess("founded")
                                } else {
                                    setProcess("notFounded")
                                }
                            })

                        
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
                    </Form>
                    

                </Formik>
                {setFinderContent(process, FoundedComponent, {charName, foundedId})}
        </div>
    )
}

const FoundedComponent = ({data: {charName, foundedId}}) => {

    return (
        <div className="finder__founded">
        <span>{`There is! Visit ${charName} page?`}</span>
        <Link to={`/chars/${foundedId}`} className="button button__secondary">
                <div className="inner">To Page</div>
        </Link>
        </div>
    )
}



export default Finder;