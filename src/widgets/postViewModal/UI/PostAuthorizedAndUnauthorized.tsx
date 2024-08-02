import s from "@/widgets/postViewModal/UI/PostCommentsView.module.scss";
import Image from "next/image";
import PersonImg3 from "@/shared/assets/PersonImg3.png";
import Link from "next/link";
import {TimeAgo, Typography} from "@/shared/components";
import {HeartOutline, HeartRed} from "@/shared/assets";
import {useLikeCommentMutation} from "@/entities/posts/api/postsApi";
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useCreateAnswerMutation} from "@/entities/comments/api/commentsApi";

type Props ={
    el:CommentsDataType
    updatedAt:string
    t:any
    setIsAnswer?:any
}
export const PostAuthorizedAndUnauthorized = ({t,updatedAt,el,setIsAnswer}:Props) => {
    const [createLike, {isLoading: isPostLoading}] = useLikeCommentMutation()

    const {accessToken} = useAuth()
    const submitClickHandler = ()=>{
        createLike({
            commentId: el.id,
            likeStatus:"LIKE",
            postId: el.postId,
            accessToken,
        })
    }

    const clickHandlerAnswer = ()=>{
        setIsAnswer(true)
    }

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
                            <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                                Like: {el.likeCount}
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography onClick={clickHandlerAnswer} as="span" variant="bold_text_14" className={s.updatedAt}>
                                {t.post_view.answer}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={s.like}>
                    <div onClick={submitClickHandler}>{el.isLiked ? <HeartRed/> :<HeartOutline/> }</div>
                </div>
            </div>
        </>
    );
};

