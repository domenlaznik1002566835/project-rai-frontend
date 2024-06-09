import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import InsertNewsArticle from "./InsertNewsArticle";
import InsertIngredient from "./InsertIngredient";
import InsertMeal from "./InsertMeal";
import InsertStaff from "./InsertStaff";
import InsertPackage from "./InsertPackage";
import InsertRoom from "./RoomInserts";

const DatabaseInserts = () => {
    const [selectedOption, setSelectedOption] = useState("News Article");

    const handleSelect = (e) => {
        setSelectedOption(e);
    }

    return (
        <div>
            <DropdownButton onSelect={handleSelect} title={selectedOption || "Select Option"} className="mb-3 mt-3">
                <Dropdown.Item eventKey="News Article">News Article</Dropdown.Item>
                <Dropdown.Item eventKey="Package">Package</Dropdown.Item>
                <Dropdown.Item eventKey="Staff Member">Staff Member</Dropdown.Item>
                <Dropdown.Item eventKey="Room">Room</Dropdown.Item>
            </DropdownButton>
            {selectedOption === "News Article" && <InsertNewsArticle/>}
            {selectedOption === "Staff Member" && <InsertStaff/>}
            {selectedOption === "Package" && <InsertPackage/>}
            {selectedOption === "Room" && <InsertRoom/>}
        </div>
    );
}

export default DatabaseInserts;