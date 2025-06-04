"use client";

import { ImagePlus } from "lucide-react";
import { ConfigProvider, Flex, Spin } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import { Tabs } from "antd";
import { useGetProfileQuery } from "@/redux/features/user/usersApi";
import CustomAvatar from "@/components/custom/CustomAvatar";
import { useState } from "react";
import ChangeProfilePicModal from "./ChangeProfilePicModal";

export default function ProfileContainer() {
  const [showChangePicModal, setShowChangePicModal] = useState(false);

  const { data: myProfileRes, isLoading } = useGetProfileQuery();
  const myProfile = myProfileRes?.data;
  console.log({ myProfile });

  const tabItems = [
    {
      key: "editProfile",
      label: "Edit Profile",
      children: (
        <>{myProfile ? <EditProfileForm myProfile={myProfile} /> : <p></p>}</>
      ),
    },
    {
      key: "changePassword",
      label: "Change Password",
      children: <ChangePassForm />,
    },
  ];

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          height: "75dvh",
        }}
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <ConfigProvider>
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <CustomAvatar
              src={myProfile?.profile}
              name={myProfile?.name}
              size={150}
            />

            {/* Edit profile image button */}
            <button
              className="flex-center bg-primary absolute right-2 bottom-2 aspect-square rounded-full p-2 text-white/95"
              onClick={() => setShowChangePicModal(true)}
            >
              <ImagePlus size={18} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">{myProfile?.name}</h3>
            <p className="text-primary-blue text-primary mt-1 text-lg font-medium">
              Administrator
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered items={tabItems} />
        </section>
      </div>

      {showChangePicModal && myProfile && (
        <ChangeProfilePicModal
          open={showChangePicModal}
          setOpen={setShowChangePicModal}
          profile={myProfile}
        />
      )}
    </ConfigProvider>
  );
}
