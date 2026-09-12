import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Field from "../../../shared/ui/Field";
import Input from "../../../shared/ui/Input";

import { login } from "../api/authApi";
import Button from "../../../shared/ui/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      navigate("/careers");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-bg px-6 text-text-primary">

      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -top-40 left-1/2
          h-96 w-96
          -translate-x-1/2
          rounded-full
          bg-emerald-500/10
          blur-3xl
        "
      />

      <div
        className="
          relative z-10
          w-full max-w-md
        "
      >
        {/* Branding */}
        <div className="mb-10 text-center">

          <div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-emerald-500/30
              bg-emerald-500/10
              text-3xl
              shadow-lg shadow-emerald-950/30
            "
          >
            ⚽
          </div>

          <p className="text-xs font-bold tracking-[0.3em] text-accent">
            FOOTBALL
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary">
            Career Companion
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Your career. Your decisions.
            <br />
            Your story.
          </p>

        </div>

        {/* Login Card */}
        <div
          className="
            rounded-2xl
            border border-border
            bg-surface
            p-6
            shadow-2xl shadow-black/30
            sm:p-8
          "
        >

          <div className="mb-7">

            <p className="text-xs font-bold tracking-[0.2em] text-accent">
              WELCOME BACK
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Continue your journey
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Sign in to continue managing your football career.
            </p>

          </div>

          <div className="space-y-5">

            {/* Email */}
            <Field label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </Field>

            {/* Password */}
            <Field label="Password" required>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Field>

            {/* Submit */}
            <Button
              type="button"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              className="py-3 font-semibold"
            >
              {loading ? "Signing in..." : "Continue →"}
            </Button>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-text-secondary">
          Every career has a story.
        </p>

      </div>

    </div>
  );
}

export default LoginPage;