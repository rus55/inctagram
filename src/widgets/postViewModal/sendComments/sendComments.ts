type Props = {
    isAnswer:boolean
    commentId:number | undefined
    postId:number | undefined
    accessToken:any
    createAnswer:any
    updateComments:any
    comment:string

}
export const sendComment = ({
                         isAnswer,
                         commentId,
                         postId,
                         accessToken,
                         createAnswer,
                         updateComments,
                         comment
                     }:Props) => {
    if (isAnswer) {
        createAnswer({
            content: comment,
            commentId: commentId,
            postId: postId,
            accessToken: accessToken,
        });
    } else {
        updateComments({
            content: comment,
            postId: postId,
            accessToken: accessToken,
        });
    }
};