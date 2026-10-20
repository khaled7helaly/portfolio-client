import { useEffect, useState } from "react";

import { getApprovedComments } from "../../services/commentsService";

import "./FeedbackMessage.css";

export default function FeedbackMessage() {
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* Fetch approved comments */
  useEffect(() => {
    let cancelled = false;

    const loadComments = async () => {
      try {
        const data = await getApprovedComments();

        if (!cancelled) {
          setComments(data);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadComments();

    /* Refresh after a new comment is submitted */
    window.addEventListener("comments:updated", loadComments);

    return () => {
      cancelled = true;

      window.removeEventListener(
        "comments:updated",
        loadComments
      );
    };
  }, []);

  /* Animate between comments */
  useEffect(() => {
    if (comments.length < 2) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % comments.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [comments]);

  /* Navigate to the comment form */
  const handleWriteComment = () => {
    document
      .getElementById("comments-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const activeComment =
    comments.length > 0
      ? comments[activeIndex % comments.length]
      : null;

  return (
    <aside
      className="comments-preview"
      aria-labelledby="comments-preview-title"
    >
      {/* Header */}
      <div className="comments-preview__header">
        <span className="comments-preview__eyebrow">
          COMMUNITY NOTES
        </span>

        <span className="comments-preview__indicator">
          <span aria-hidden="true" />
          GUESTBOOK
        </span>
      </div>

      {/* Heading */}
      <h2
        className="comments-preview__title"
        id="comments-preview-title"
      >
        A few words from the community.
      </h2>

      {/* Comment content */}
      <div className="comments-preview__content">
        {loading ? (
          <p className="comments-preview__status">
            Loading messages...
          </p>
        ) : error ? (
          <p className="comments-preview__status">
            Messages are temporarily unavailable.
          </p>
        ) : activeComment ? (
          <article
            className="comments-preview__card"
            key={activeComment.id || activeComment._id}
            aria-live="polite"
          >
            {/* Author */}
            <div className="comments-preview__author">
              <img
                className="comments-preview__avatar"
                src={activeComment.avatarUrl}
                alt=""
                loading="lazy"
              />

              <div className="comments-preview__identity">
                <a
                  className="comments-preview__name"
                  href={activeComment.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {activeComment.displayName ||
                    activeComment.username}
                </a>

                <span className="comments-preview__username">
                  @{activeComment.username}
                </span>
              </div>

              {/* GitHub identity indicator */}
              <span
                className="comments-preview__github"
                aria-label="GitHub profile"
              >
                GH
              </span>
            </div>

            {/* Message */}
            <p className="comments-preview__message">
              “{activeComment.message}”
            </p>

            {/* Date */}
            {activeComment.createdAt && (
              <time
                className="comments-preview__date"
                dateTime={activeComment.createdAt}
              >
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(activeComment.createdAt))}
              </time>
            )}

            {/* Comment navigation indicators */}
            {comments.length > 1 && (
              <div
                className="comments-preview__pagination"
                aria-label={`Comment ${activeIndex + 1} of ${comments.length}`}
              >
                {comments.map((comment, index) => (
                  <span
                    key={comment.id || comment._id}
                    className={
                      index === activeIndex
                        ? "is-active"
                        : ""
                    }
                  />
                ))}
              </div>
            )}
          </article>
        ) : (
          <div className="comments-preview__empty">
            <span className="comments-preview__quote">
              “
            </span>

            <p>
              Every great connection starts with a conversation.
            </p>

            <span className="comments-preview__empty-note">
              Be the first to leave a message.
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        className="comments-preview__button"
        type="button"
        onClick={handleWriteComment}
      >
        Leave a message

        <span aria-hidden="true">↗</span>
      </button>

      {/* Footer */}
      <div className="comments-preview__footer">
        <span>REAL PEOPLE. REAL WORDS.</span>

        <span>
          {comments.length.toString().padStart(2, "0")} NOTES
        </span>
      </div>
    </aside>
  );
}