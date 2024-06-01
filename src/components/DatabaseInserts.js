import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import InsertNewsArticle from "./InsertNewsArticle";
import InsertIngredient from "./InsertIngredient";
import InsertMeal from "./InsertMeal";
import InsertStaff from "./InsertStaff";

const DatabaseInserts = () => {
    const [selectedOption, setSelectedOption] = useState("News Article");

    const handleSelect = (e) => {
        setSelectedOption(e);
    }

    return (
        <div>
            <DropdownButton onSelect={handleSelect} title={selectedOption || "Select Option"} className="mb-3 mt-3">
                <Dropdown.Item eventKey="News Article">News Article</Dropdown.Item>
                <Dropdown.Item eventKey="Meal">Meal</Dropdown.Item>
                <Dropdown.Item eventKey="Ingredient">Ingredient</Dropdown.Item>
                <Dropdown.Item eventKey="Staff Member">Staff Member</Dropdown.Item>
            </DropdownButton>
            {selectedOption === "News Article" && <InsertNewsArticle/>}
            {selectedOption === "Ingredient" && <InsertIngredient/>}
            {selectedOption === "Meal" && <InsertMeal/>}
            {selectedOption === "Staff Member" && <InsertStaff/>}
        </div>
    );
}

export default DatabaseInserts;