import React from 'react';

class Select extends React.Component {
  
  createOption (item) {
    return <option value={item.name}>{item.name}</option>
  }

  render () {  
    return (
      <div>
        <label>{this.props.label}</label>
        <select id={this.props.id} name={this.props.id} onChange={this.props.onChange}>
          { this.props.options.map(this.createOption) }
        </select>
      </div>
    );
  }
}

export default Select;
