import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value="Colombo"
          title="Colombo"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Galle"
          title="Galle"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Matara"
          title="Matara"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Kandy"
          title="Kandy"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
