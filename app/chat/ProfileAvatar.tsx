import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";

const ProfileAvatar = () => {
  const { data: session } = useSession();

  return (
    <Menu
      as="div"
      className="relative">
      <Menu.Button className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden cursor-pointer flex items-center justify-center">
        {session?.user ? (
          <img
            src={session?.user?.image ? session.user.image : ""}
            alt="user"
          />
        ) : (
          "👤"
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-200" : ""
                } w-full text-left px-4 py-2`}>
                View Profile
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-200" : ""
                } w-full text-left px-4 py-2`}>
                Settings
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={`${
                  active ? "bg-red-500 text-white" : "text-red-500"
                } w-full text-left px-4 py-2`}>
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileAvatar;
