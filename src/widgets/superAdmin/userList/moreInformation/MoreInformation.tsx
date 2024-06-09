import s from "./MoreInformation.module.scss";
import { useRouter } from "next/router";
import { Typography } from "@/shared/components";
import { useTranslation } from "@/shared/lib";
import { FC, useEffect, useState } from "react";
import { ArrowBack } from "@/shared/assets/icons/ArrowBack";
import { UserInfo } from "@/widgets/superAdmin/userList/moreInformation/userInfo/UserInfo";
import { useGetUserMutation } from "@/entities/users/api/usersApi"
import { UserOverview } from "@/widgets/superAdmin/userList/moreInformation/table-info/UserOverview"

const MoreInformation: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { userId } = router.query;

  const [user, setUser] = useState<User | null>(null);

  const [data] = useGetUserMutation();

  useEffect(() => {
    if (userId) {
      data(userId).unwrap().then(res => {
        setUser(res.data.getUser);
      });
    }
  }, [userId]);

  return (
    <div className={s.box}>
      <div className="flex gap-1 mb-6" onClick={() => router.push("/userList")}>
        <ArrowBack />
        <Typography variant="medium_text_14">{t.user_list.backToUserList}</Typography>
      </div>
      {user && <>
        <UserInfo
          avatar={user?.profile.avatars.url}
          name={{ first: user?.profile.firstName ?? "----", last: user?.profile.lastName ?? "----" }}
          email={user?.email}
          userId={user.id}
          date={user.createdAt}
        />
        <UserOverview userId={user.id}/>
      </>
      }
    </div>
  );
};

export default MoreInformation