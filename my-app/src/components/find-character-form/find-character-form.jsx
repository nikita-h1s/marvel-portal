import './find-character-form.css';

import Button from '../button/button.jsx';
import useMarvelService from '../../services/marvel-service.jsx';

import {Field, Formik, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import {Link} from "react-router";

const setContent = (process) => {
    switch (process) {
        case "waiting":
            return false;
        case "loading":
            return true;
        case "confirmed":
            return false;
        default:
            return new Error('Unexpected process state');
    }
}

const FindCharacterForm = () => {
    const [character, setCharacter] = useState(null);
    const [found, setFound] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const validationSchema = Yup.object({
        name: Yup.string().required('This field is required')
            .min(2, 'Must be at least 2 characters'),
    })

    const onCharLoaded = (char) => {
        if (char) {
            setFound(true);
            setCharacter(char);
        } else {
            setFound(false);
        }
    }

    const updateChar = values => {
        clearError();

        getCharacterByName(values.name)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
    }

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                updateChar(values);
            }}
            validateOnChange={false}
        >
            {props => (
                <form onSubmit={props.handleSubmit} className="find-character-form">
                    <h1>Or find a character by name:</h1>
                    <div className="find-character-form__inputs">
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                        />
                        <Button text="Find" width={101} type="submit" disabled={setContent(process)}/>
                    </div>
                    <div className="find-character-form__result">
                        {found && character && (
                            <div className="find-character-form__success">
                                <div className="find-character-form__success-msg">
                                    There is! Visit {character.name} page?
                                </div>
                                <Link to={`/characters/${character.id}`}>
                                    <Button bgColor="gray"
                                            text="To Page"
                                            width={101}
                                    />
                                </Link>
                            </div>
                        )}
                        {props.touched.name && !props.errors.name && found === false && (
                            <div className="find-character-form__error-msg">
                                The character was not found. Check the name and try again
                            </div>
                        )}
                        <FormikErrorMessage component="div" className="find-character-form__error-msg" name="name"/>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default FindCharacterForm;