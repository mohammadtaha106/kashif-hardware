import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function AvatarDrop({ img, name, email, onclick }) {
  console.log("Avatar Image URL:", img);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          {/* Avatar always visible */}
          <Avatar
            src={img || "https://via.placeholder.com/150"}
            isBordered
            className="cursor-pointer"
            size="md"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          className="bg-white text-black rounded"
        >
          {/* Display name and email only on larger screens */}
          <DropdownItem key="profile" className="h-14 gap-2">
            <div className="hidden md:block">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{email}</p>
            </div>
          </DropdownItem>
          <DropdownItem key="help_and_feedback">
            <Link to={"/contact"}>Help & Feedback</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={onclick}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* Show name and email directly next to the avatar on web */}
      {/* <div className="hidden md:flex flex-col">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div> */}
    </div>
  );
}
