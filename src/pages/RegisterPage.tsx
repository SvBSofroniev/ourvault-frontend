import {
  useState,
  type FormEvent,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../utils/apiError";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background auth-background-one" />
      <div className="auth-background auth-background-two" />

      <main className="auth-container">
        <section className="auth-brand-panel">
          <div className="auth-brand">
            <div className="auth-logo">
              V
            </div>

            <div>
              <h1>OurVault</h1>
              <p>
                AI-Powered Knowledge Base
              </p>
            </div>
          </div>

          <div className="auth-hero">
            <span className="auth-eyebrow">
              BUILD YOUR KNOWLEDGE BASE
            </span>

            <h2>
              Organize.
              <br />
              Collaborate.
              <br />
              <span>Discover.</span>
            </h2>

            <p>
              Create shared workspaces, upload
              documents and ask questions using
              AI-powered semantic search.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  01
                </div>

                <div>
                  <strong>
                    Shared workspaces
                  </strong>

                  <span>
                    Collaborate with other members
                    while keeping access controlled.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  02
                </div>

                <div>
                  <strong>
                    Smart document retrieval
                  </strong>

                  <span>
                    Find relevant knowledge using
                    semantic vector search.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  03
                </div>

                <div>
                  <strong>
                    Context-aware AI
                  </strong>

                  <span>
                    Ask follow-up questions while
                    keeping document sources visible.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-brand-footer">
            OurVault · Master&apos;s Project
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-mobile-brand">
              <div className="auth-logo auth-logo-small">
                V
              </div>

              <strong>OurVault</strong>
            </div>

            <div className="auth-form-heading">
              <span className="auth-form-label">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Create an OurVault account and start
                building your knowledge workspace.
              </p>
            </div>

            {error && (
              <div
                className="auth-error"
                role="alert"
              >
                <div className="auth-error-icon">
                  !
                </div>

                <span>{error}</span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value,
                    )
                  }
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                className="auth-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create account"}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <p>Already have an account?</p>
              <span />
            </div>

            <Link
              to="/login"
              className="auth-secondary-button"
            >
              Sign in
            </Link>

            <p className="auth-security-note">
              Your account gives you access only to
              workspaces you own or have been invited to.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}