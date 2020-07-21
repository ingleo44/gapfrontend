import React from 'react';
import { Field, reduxForm } from 'redux-form';


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined


class PatientForm extends React.Component {

    renderError = ({touched,valid,error}) => {
        if (touched && !valid) {
            return <div className="ui error message">{error}</div>
        }
    }


    renderInput = ({ input, label, meta })=> {
        const className = `field${meta.error && meta.touched? 'error': ''}`;
        console.log(meta);
        return (
            <div className={className}>
                <label>{label}</label>
                <input  {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }


    renderDate = ({ input, label, meta })=> {
        const className = `field${meta.error && meta.touched? 'error': ''}`;
        console.log(meta);
        return (
            <div className={className}>
                <label>{label}</label>
                <input type="date"  {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit=formValues=> {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="firstName" label="First Name" component={this.renderInput} validate={required} />
                    <Field name="lastName" label="Last Name" component={this.renderInput} validate={required}  />
                    <Field name="birthDate" label="Birth Date" component={this.renderDate}  validate={required} />
                    <Field name="address" label="Address" component={this.renderInput}  validate={required}  />
                    <Field name="city" label="City" component={this.renderInput}   validate={required} />
                    <Field name="phone" label="Phone" component={this.renderInput} />
                    <Field name="insuranceCompany" label="Insurance Company" component={this.renderInput} />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>



        );
    }
}


const validate = (formValues) => {
    const errors = {};
    if (!formValues.firstName) {
        errors.title = 'you must enter a first name';
    }
    if (!formValues.lastName) {
        errors.description = 'you must enter a last name';
    }
    if (!formValues.birthDate) {
        errors.description = 'you must enter a bith date';
    }

    return errors;
};

export default reduxForm({
    form: 'PatientForm',
    validate
})(PatientForm);

