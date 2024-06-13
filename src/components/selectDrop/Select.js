import React, { useState } from "react";
import "./select.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import "../../responsive.css";

const Select = (props) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const closeSelect = (index, name) => {
    setSelectedIndex(index);
    setIsOpenSelect(false);
    setSelectedItem(name);
    setSearchQuery("");
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const handleClickAway = () => {
    setIsOpenSelect(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = props.data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="selectDrop">
        <span className="openSelect" onClick={handleOpenSelect}>
          {selectedItem.length > 14
            ? `${selectedItem.substring(0, 14)}...`
            : selectedItem}
          <ArrowDropDownIcon style={{ position: "absolute", opacity: "0.5" }} />
          {isOpenSelect && (
            <div className="select">
              <div className="searchField" onClick={handleClickInside}>
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <ul className="searchResults">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => closeSelect(index, item)}
                      className={`${selectedIndex === index ? "active" : ""}`}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="noResults">No results found</li>
                )}
              </ul>
            </div>
          )}
        </span>
      </div>
    </ClickAwayListener>
  );
};

export default Select;
