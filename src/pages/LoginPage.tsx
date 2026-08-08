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

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
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
    setIsSubmitting(true);

    try {
      await login({
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
              <span>V</span>
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
              YOUR KNOWLEDGE. CONNECTED.
            </span>

            <h2>
              Ask questions.
              <br />
              Find answers.
              <br />
              <span>Know more.</span>
            </h2>

            <p>
              Bring your team&apos;s documents together
              and use AI to find grounded answers from
              the knowledge that matters.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  01
                </div>

                <div>
                  <strong>
                    Centralized knowledge
                  </strong>
                  <span>
                    Organize documents inside collaborative workspaces.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  02
                </div>

                <div>
                  <strong>
                    AI-powered search
                  </strong>
                  <span>
                    Retrieve relevant information using semantic search.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  03
                </div>

                <div>
                  <strong>
                    Grounded conversations
                  </strong>
                  <span>
                    Chat with your documents and keep the sources visible.
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
                WELCOME BACK
              </span>

              <h2>Sign in to OurVault</h2>

              <p>
                Enter your credentials to continue to your
                knowledge workspace.
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
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password">
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
                  ? "Signing in..."
                  : "Sign in"}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <p>New to OurVault?</p>
              <span />
            </div>

            <Link
              to="/register"
              className="auth-secondary-button"
            >
              Create an account
            </Link>

            <p className="auth-security-note">
              Your documents remain private to the
              workspaces you have access to.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}