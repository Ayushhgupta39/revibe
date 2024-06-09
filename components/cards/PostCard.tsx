import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateString, getInitials } from "@/lib/utils";
import { CommentIcon, ShareIcon, ThumbsUpIcon } from "../../utils/Icons";
import { Clock3, EllipsisVertical } from "lucide-react";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
function PostCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  console.log("comm: ", community)
  return (
    <article
      className={` text-white rounded-lg m-4 border border-zinc-800 ${
        isComment ? "px-0 xs:px-7" : "bg-zinc-900 p-2"
      }`}
    >
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-4">
          <div>
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Avatar>
                <AvatarImage src={author.image} />
                <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${author.id}`} className="w-fit">
              {" "}
              <h4 className="cursor-pointer inline text-base-semibold text-light-1">
                {author.name}{" "}
              </h4>{" "}
            </Link>
            <small className="text-gray-400 flex text-sm items-center">
              <Clock3 size={14} className="mr-1" />
              <span className="flex items-center mt-[3px]">
                {formatDateString(createdAt)}
                {!isComment && community && (
                  <Link href={`/communities/${community.id}`}>
                    <span className="mx-1 text-gray-200 cursor-pointer">
                      {" "}
                      in {community.name}
                    </span>
                  </Link>
                )}
              </span>
            </small>
          </div>
        </div>
        <div className="flex items-center text-gray-400 gap-4">
          <EllipsisVertical size={20} className="cursor-pointer" />
        </div>
      </div>

      <div className="p-2">
        <p className="text-sm">{content}</p>
      </div>

      <div className="p-1 flex justify-evenly text-sm border-t border-t-zinc-800">
        <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg w-full transition-all">
          <ThumbsUpIcon />
          <p>Like</p>
        </div>
        <Link className="w-full" href={`/post/${id}`}>
          {" "}
          <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg w-full transition-all">
            <CommentIcon />
            <p>Comment</p>{" "}
          </div>{" "}
        </Link>
        <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg w-full transition-all">
          <ShareIcon />
          <p>Share</p>
        </div>
      </div>

      {isComment && comments.length > 0 && (
        <Link href={`/post/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments.length}
          </p>
        </Link>
      )}
    </article>
  );
}

export default PostCard;
