# Plan: Improve Login System (Security + UX)

## 1. Goals
- Increase account protection against brute force and credential attacks.
- Keep login flow simple, fast, and clear for legitimate users.
- Maintain shared validation logic between frontend and backend.

## 2. Current Baseline
- Frontend and backend already share login input validation.
- Password complexity checks are implemented.
- Error and success messages exist in the UI.

## 3. Security Improvements (Priority Order)

### 3.1 Hash Passwords Instead of Plain Text
- Replace plain password storage with secure hashing (`bcrypt`).
- Store only hash values in the user store.
- Compare input password with `bcrypt.compare`.

Acceptance criteria:
- No plain-text password appears in code or storage.
- Login still works with valid credentials.

### 3.2 Rate Limiting on Login Endpoint
- Add per-IP rate limiting for `/login` (for example 5 attempts per 15 min).
- Return a clear error when limit is reached.

Acceptance criteria:
- Excessive requests are blocked.
- Normal users are unaffected under normal usage.

### 3.3 Progressive Delay for Repeated Failures
- Add small response delay after failed attempts.
- Reset delay after successful login.

Acceptance criteria:
- Repeated failed attempts become slower.
- Successful login is not delayed.

### 3.4 Session Security
- If sessions/tokens are added, use `httpOnly`, `secure`, and `sameSite` protections.
- Set short expiration and refresh strategy.

Acceptance criteria:
- Session artifacts are protected from common client-side access vectors.

### 3.5 Audit Logging
- Log failed/successful login events with timestamp and source IP.
- Never log raw passwords.

Acceptance criteria:
- Logs are actionable for incident review.

## 4. UX Improvements (Priority Order)

### 4.1 Inline Password Rule Feedback
- Show each password rule as pass/fail while typing.
- Keep same rule set as backend.

Acceptance criteria:
- Users can see exactly why a password fails before submit.

### 4.2 Better Error States
- Map backend error codes/messages to friendly UI messages.
- Distinguish validation errors, invalid credentials, and server connectivity.

Acceptance criteria:
- Messages are clear and non-technical.

### 4.3 Loading and Disabled Submit State
- Disable submit button while request is in progress.
- Show loading text (for example: "Signing in...").

Acceptance criteria:
- No duplicate submissions during network requests.

### 4.4 Accessibility Improvements
- Add associated labels for inputs.
- Use `aria-live` for status/error message region.
- Ensure focus moves to first invalid field on submit errors.

Acceptance criteria:
- Form is keyboard- and screen-reader-friendly.

## 5. Implementation Phases

### Phase 1 (Quick Wins)
- Add loading/disabled submit state.
- Improve error message mapping.
- Add basic rate limiting.

### Phase 2 (Core Security)
- Introduce bcrypt password hashing.
- Add audit logs and failed-attempt tracking.

### Phase 3 (Polish)
- Add inline rule checklist and accessibility enhancements.
- Add tests and regression checks.

## 6. Test Plan
- Unit tests for shared validation module.
- Integration tests for `/login` success, invalid credentials, weak password, and rate-limit responses.
- Manual UX test on desktop and mobile.

## 7. Success Metrics
- Reduced failed-login abuse (rate-limited requests logged).
- No plain-text password handling.
- Faster resolution of user login errors (clearer UI feedback).

## 8. Next Action
- Start with Phase 1 in this order:
	1. loading/disabled submit UX
	2. error message mapping
	3. backend rate limiting
