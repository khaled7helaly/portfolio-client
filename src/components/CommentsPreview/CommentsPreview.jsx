import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { consumeReturn, scrollToComments } from "../../utils/scrollToComments";
import CommentComposer from "./CommentComposer";
import CommentList from "./CommentList";
import "./CommentsSection.css";

/** The full section (#comments): sign in + write on one side, every comment on the other. */
export default function CommentsSection() {
  const { user, ready, signIn, signOut } = useAuth();

  // Back from GitHub: the page reloads at the top, so bring the person to the comments again.
  useEffect(() => {
    if (ready && consumeReturn()) scrollToComments();
  }, [ready]);

  return (
    <section className="cmt-section" id="comments" aria-labelledby="cmt-section-title">
      <div className="cmt-section__inner">
        <h2 className="cmt-section__heading" id="cmt-section-title">
          <span className="cmt-section__script">Say hello,</span>
          <span className="cmt-section__title">leave a comment</span>
        </h2>

        <div className="cmt-section__grid">
          <CommentComposer user={user} ready={ready} onSignIn={signIn} onSignOut={signOut} />
          <CommentList userId={user?.id} />
        </div>
      </div>
    </section>
  );
}