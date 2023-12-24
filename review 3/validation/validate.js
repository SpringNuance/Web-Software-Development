import { validasaur } from "../deps.js";


// _____Question validation__________
const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const questionValidation = async (questionParams) => {
    const result = await validasaur.validate(
        questionParams,
        questionValidationRules
    )
    return result
};


//_____Option validation_______
const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)]
};

const optionValidation = async (optionParams) => {
    const result = await validasaur.validate(
        optionParams,
        optionValidationRules
    )
    return result
};


//_____Registration validation__________
const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const registrationValidation = async (registrationParams) => {
    const result = await validasaur.validate(
        registrationParams,
        registrationValidationRules
    )
    return result
};





export { questionValidation, optionValidation, registrationValidation };
