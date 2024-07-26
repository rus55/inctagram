import s from "@/widgets/postViewModal/UI/PostCommentsView.module.scss";
import Image from "next/image";
import PersonImg3 from "@/shared/assets/PersonImg3.png";
import Link from "next/link";
import {TimeAgo, Typography} from "@/shared/components";
import {HeartOutline} from "@/shared/assets";
type Props ={
    el:any
    updatedAt:any
    t:any
}
export const PostAuthorizedAndUnauthorized = ({t,updatedAt,el}:Props) => {
    return (
        <>

            <div className={s.comment}>
                <div className={s.post}>
                    <Image
                        src={PersonImg3}
                        width={36}
                        height={36}
                        alt="Owner's avatar"
                        className={s.smallAvatarPost}
                    />
                    <div className={s.postContent}>
                        <Link href={'#'}>
                            <Typography as="span" variant="bold_text_14">
                                {el.from.username}
                            </Typography>
                        </Link>
                        &nbsp;&nbsp;
                        <Typography as="span" variant="medium_text_14">
                            {el.content}
                        </Typography>
                        <div>
                            <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                                <TimeAgo updatedAt={updatedAt} lg={t.lg}/>
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography as="span" variant="bold_text_14" className={s.updatedAt}>
                                {t.post_view.answer}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={s.like}>
                    <HeartOutline/>
                </div>
            </div>
        </>
    );
};

