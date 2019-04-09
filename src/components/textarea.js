import React from 'react';

export default class Textarea extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.textarea.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className="form-warning">{this.props.meta.warning}</div>
      );
    }

    return (
      <div className="">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <textarea
          {...this.props.input}
          id={this.props.input.name}
          className="input-field text-area"
          type={this.props.type}
          maxLength={this.props.maxlength}
          placeholder={this.props.placeholder}
          aria-label={this.props.ariaLabel}
          ref={textarea => (this.textarea = textarea)}
        />
      </div>
    );
  }
}
